<template>
    <div class="sidebar">
        <div class="locations">
            <Tabs
                :values="mapLocations.map((l) => l.name)"
                :index="this.$store.state.mapLocationIndex"
                @change="changeMapLocation"
            ></Tabs>
        </div>
        <p>Announcement</p>
        <p class="announcement">
            <em>NEW VERSION AVAILABLE <a href="https://snminteractivemap.zmarc.de">HERE</a></em>

            The Heroku URL will stop working in November, because Heroku is phasing out their free tier and I'm going to
            move the hosting to a different provider. This means your current private pins won't migrate over. But you
            can copy the data of your private pins out from localstorage in your browser and paste them into
            localstorage on the new URL when I launch the new hosting. Please search Google (or your search engine of
            choice) on how to do so.
        </p>
        <p>Categories</p>
        <FoldableSection class="category" v-for="category in categories" :key="category.id">
            <template v-slot:header="slotProps" class="sectionHeader">
                <p class="title">{{ `${category.title} ${category.private ? "(private)" : ""}` }}</p>
                <div class="headerBtns">
                    <span
                        class="material-icons editBtn toggleBtn"
                        @click.stop="editCategory(category)"
                        v-if="category.private"
                    >
                        edit
                    </span>
                    <span class="material-icons">{{ slotProps.open ? "expand_less" : "expand_more" }}</span>
                </div>
            </template>
            <template v-slot:content>
                <div class="toggleWrapper" v-for="type in getCategoryTypes(category.id)" :key="type.id">
                    <ToggleSwitch
                        @change="
                            () => {
                                toggleType(type);
                            }
                        "
                        :on="type.visible"
                        :label="`${type.title} ${type.private ? '(private)' : ''} (${getTypePins(type.id).length})`"
                    ></ToggleSwitch>
                    <span class="material-icons editBtn toggleBtn" @click="editType(type)" v-if="type.private">
                        edit
                    </span>
                </div>
            </template>
        </FoldableSection>
        <Dialog
            :open="editTypeDialogOpen"
            class="editTypeDialog editDialog"
            title="Edit type"
            @close="closeEditTypeDialog"
        >
            <TextInput v-model="editableType.title" label="Title"></TextInput>
            <TextInput v-model="editableType.description" label="Description"></TextInput>
            <Dropdown
                :value="this.editableType.category.title"
                :values="categories"
                label="Category"
                @change="this.setTypeCategory"
                @createValue="createNewCategory"
            >
                <template v-slot:value="{ value }">
                    <p>{{ `${value.title} ${value.private ? " (private)" : ""}` }}</p>
                </template>
            </Dropdown>
            <div class="horizontalFlex gap10 right">
                <Button @click="deleteEditableType" :label="deleteTypeBtnLabel"></Button>
                <Button @click="saveEditableType" primary label="Save"></Button>
            </div>
        </Dialog>
        <Dialog
            :open="editCategoryDialogOpen"
            class="editCategoryDialog editDialog"
            title="Edit type"
            @close="closeEditCategoryDialog"
        >
            <TextInput v-model="editableCategory.title" label="Title"></TextInput>
            <TextInput v-model="editableCategory.description" label="Description"></TextInput>
            <div class="horizontalFlex gap10 right">
                <Button @click="deleteEditableCategory" :label="deleteCategoryBtnLabel"></Button>
                <Button @click="saveEditableCategory" primary label="Save"></Button>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Button from "@/components/button/Button";
import FoldableSection from "@/components/FoldableSection";
import { mapState, mapGetters } from "vuex";
import ToggleSwitch from "./ToggleSwitch";
import Tabs from "./Tabs";
import Dropdown from "@/components/inputs/Dropdown";
import Dialog from "@/components/Dialog";
import TextInput from "@/components/inputs/TextInput";
import { genRandHex } from "@/utils/utils";

export default {
    name: "sidebar",
    components: {
        Button,
        Tabs,
        FoldableSection,
        ToggleSwitch,
        Dialog,
        Dropdown,
        TextInput,
    },
    data: () => ({
        editTypeDialogOpen: false,
        editableType: {
            id: "",
            title: "",
            description: "",
            category: {},
            categoryId: "",
        },
        confirmTypeDelete: false,
        editCategoryDialogOpen: false,
        editableCategory: {
            id: "",
            title: "",
            description: "",
        },
        confirmCategoryDelete: false,
    }),
    computed: {
        ...mapGetters(["getCategoryTypes", "getTypePins"]),
        ...mapState({
            mapLocations: (state) => state.mapLocations,
            categories: (state) => state.pins.categories,
            types: (state) => state.pins.types,
        }),
        deleteTypeBtnLabel() {
            return this.confirmTypeDelete ? "Confirm deletion" : "Delete type";
        },
        deleteCategoryBtnLabel() {
            return this.confirmCategoryDelete ? "Confirm deletion" : "Delete Category";
        },
    },
    methods: {
        changeMapLocation(index) {
            this.$store.commit("setMapLocationIndex", index);
        },
        toggleType(type) {
            type.visible = !type.visible;
            this.$store.commit("updateType", type);
        },
        editType(type) {
            this.editableType = { ...type, category: this.categories.find((cat) => cat.id === type.categoryId) };
            this.editTypeDialogOpen = true;
        },
        deleteEditableType() {
            if (this.confirmTypeDelete) {
                this.$store.dispatch("deletePrivateType", this.editableType);
                this.confirmTypeDelete = false;
                this.closeEditTypeDialog();
            } else {
                this.confirmTypeDelete = true;
            }
        },
        closeEditTypeDialog() {
            this.editTypeDialogOpen = false;
        },
        saveEditableType() {
            this.closeEditTypeDialog();
            this.$store.dispatch("updatePrivateType", { ...this.editableType });
        },
        createNewCategory(title) {
            const id = genRandHex(20);
            this.editableType.category = {
                title,
                id: `private_${id}`,
                visible: true,
            };
        },
        setTypeCategory(json) {
            const category = JSON.parse(json);
            this.editableType.categoryId = category.id;
            this.editableType.category = category;
        },
        editCategory(category) {
            this.editableCategory = { ...category };
            this.editCategoryDialogOpen = true;
        },
        closeEditCategoryDialog() {
            this.editCategoryDialogOpen = false;
        },
        deleteEditableCategory() {
            if (this.confirmCategoryDelete) {
                this.$store.dispatch("deletePrivateCategory", this.editableCategory);
                this.confirmCategoryDelete = false;
                this.closeEditCategoryDialog();
            } else {
                this.confirmCategoryDelete = true;
            }
        },
        saveEditableCategory() {
            this.$store.dispatch("updatePrivateCategory", { ...this.editableCategory });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.sidebar {
    background-color: $backgroundColor;
    width: 100%;
    height: 100%;
    z-index: 1000;
    padding: 12px;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    .announcement {
        line-height: 110%;

        br {
            line-height: initial;
        }
    }

    .locations {
        display: flex;
        flex-direction: row;
        grid-gap: 8px;
    }

    .toggleWrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .toggleBtn {
            color: white;
            display: none;
            cursor: pointer;
        }

        &:hover > .toggleBtn {
            display: initial;
        }
    }

    .sectionHeader {
        > * > .editBtn {
            display: none;
        }

        &:hover {
            > * > .editBtn {
                display: initial;
            }
        }
    }
}
</style>
