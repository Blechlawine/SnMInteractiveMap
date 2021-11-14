<template>
    <div class="sidebar">
        <div class="locations">
            <Tabs
                :values="mapLocations.map((l) => l.name)"
                :index="this.$store.state.mapLocationIndex"
                @change="changeMapLocation"
            ></Tabs>
        </div>
        <p>Categories</p>
        <div class="categories public">
            <FoldableSection
                class="category"
                v-for="category in categories"
                :key="category.id"
                :title="`${category.title} ${category.private ? '(private)' : ''}`"
            >
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
                    <span class="material-icons editBtn toggleBtn" @click="editType(type)" v-if="type.private"
                        >edit</span
                    >
                </div>
            </FoldableSection>
        </div>
        <Dialog :open="editTypeDialogOpen" class="editTypeDialog" title="Edit type" @close="closeEditTypeDialog">
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
}
</style>
