<template>
    <div class="pin" :style="pinStyle">
        <div class="clicky" @click="toggleDetails">
            <span class="material-icons pinIcon">place</span>
        </div>
        <div class="details" v-if="detailsOpen">
            <div class="detailsHeader">
                <p class="pinTitle">
                    {{ this.editing ? "Edit pin" : this.pin.title || "Untitled Pin" }}
                </p>
                <div class="headerBtns">
                    <span class="material-icons editBtn headerBtn" v-if="pin.private" @click="editPin">edit</span>
                    <span class="material-icons closeBtn headerBtn" @click="toggleDetails">close</span>
                </div>
            </div>
            <div class="detailsContent" v-if="!this.editing">
                <div class="placeholder" v-if="!this.pin.description && !this.pin.imageUrl">
                    <p>This pin does not have a description</p>
                </div>
                <div class="imageContainer" v-if="this.pin.imageUrl">
                    <img :src="this.pin.imageUrl" alt="" />
                </div>
                <p class="description" v-if="this.pin.description">
                    {{ this.pin.description }}
                </p>
            </div>
            <div class="detailsContent" v-if="this.editing">
                <TextInput v-model="editedPin.title" label="Title"></TextInput>
                <TextInput v-model="editedPin.imageUrl" label="Image-url"></TextInput>
                <TextInput v-model="editedPin.description" label="Description"></TextInput>
                <Dropdown
                    :value="this.editedPin.category.title"
                    :values="categories"
                    label="Category"
                    @change="this.setCategory"
                    @createValue="createNewCategory"
                >
                    <template v-slot:value="{ value }">
                        <p>{{ `${value.title} ${value.private ? " (private)" : ""}` }}</p>
                    </template>
                </Dropdown>
                <Dropdown
                    :value="this.editedPin.type.title"
                    :values="types"
                    label="Type"
                    @change="this.setType"
                    @createValue="createNewType"
                >
                    <template v-slot:value="{ value }">
                        <p>{{ `${value.title} ${value.private ? " (private)" : ""}` }}</p>
                    </template>
                </Dropdown>
                <div class="horizontalFlex right">
                    <Button @click="cancelEditing">Cancel</Button>
                    <Button @click="saveChanges">Save</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "@/components/button/Button";
import TextInput from "@/components/inputs/TextInput";
import Dropdown from "@/components/inputs/Dropdown";
import { mapGetters, mapState } from "vuex";
import { genRandHex } from "@/utils/utils";

export default {
    name: "pin",
    components: {
        Button,
        TextInput,
        Dropdown,
    },
    props: {
        pin: Object,
    },
    data: () => ({
        detailsOpen: false,
        editing: false,
        editedPin: {
            title: "",
            description: "",
            category: {},
            type: {},
        },
    }),
    computed: {
        ...mapState({
            activeArea: (state) => state.mapLocations[state.mapLocationIndex],
            categories: (state) => state.pins.categories,
            types: (state) => state.pins.types,
        }),
        ...mapGetters(["getType"]),
        visible() {
            return this.getType(this.pin.typeId).visible && this.activeArea.name == this.pin.area;
        },
        pinStyle() {
            return {
                "margin-left": `${this.pin.x}px`,
                "margin-top": `${this.pin.y}px`,
                display: this.visible ? "initial" : "none",
            };
        },
    },
    mounted() {
    },
    methods: {
        toggleDetails() {
            this.detailsOpen = !this.detailsOpen;
            if (!this.detailsOpen) this.cancelEditing();
        },
        editPin() {
            this.editedPin = {
                ...this.pin,
                category: this.categories.find(cat => cat.id == this.pin.categoryId),
                type: this.types.find(type => type.id == this.pin.typeId),
                edited: true,
            }
            this.editing = true;
        },
        saveChanges() {
            this.$store.dispatch("updatePrivatePin", this.editedPin);
            this.editing = false;
        },
        cancelEditing() {
            this.editing = false;
        },
        createNewType(value) {
            const id = genRandHex(20);
            this.editedPin.type = {
                title: value,
                id: `private_${id}`,
                visible: true,
            };
        },
        createNewCategory(value) {
            const id = genRandHex(20);
            this.editedPin.category = {
                title: value,
                id: `private_${id}`,
                visible: true,
            };
        },
        setCategory(value) {
            const category = JSON.parse(value);
            this.editedPin.categoryId = category.id;
            this.category = category;
        },
        setType(value) {
            const type = JSON.parse(value);
            this.editedPin.typeId = type.id;
            this.type = type;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.pin {
    position: absolute;
    height: 36px;
    width: 36px;

    .clicky {
        position: absolute;
        cursor: pointer;
        width: 36px;
        height: 36px;
    }

    .details {
        position: absolute;
        z-index: 120;
        background-color: $backgroundColor;
        border-radius: 6px;
        transform: translate(calc(-50% + 18px), -100%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);

        .detailsHeader {
            display: flex;
            grid-gap: 10px;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            border-bottom: 2px solid black;
            > * {
                height: 24px;
            }
        }

        .detailsContent {
            display: flex;
            flex-direction: column;
            grid-gap: 10px;
            padding: 12px;
            max-width: 400px;
            width: max-content;

            .imageContainer {
                width: 100%;
                height: 100%;

                img {
                    border-radius: 6px;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .headerBtns {
        display: flex;
        grid-gap: 10px;
        flex-direction: row;
    }

    .headerBtn {
        cursor: pointer;
    }

    .pinIcon {
        font-size: 36px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);
    }
}
</style>
