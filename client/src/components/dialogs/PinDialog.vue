<template>
    <div>
        <Dialog class="pinDialog" :title="title" :open="open" @close="close" :zIndex="zIndex">
            <p>x: {{ Pin.x }} y: {{ Pin.y }}</p>
            <TextInput v-model="Pin.title" label="Name"></TextInput>
            <TextInput v-model="Pin.imageUrl" label="Image-url"></TextInput>
            <TextInput v-model="Pin.description" label="Description"></TextInput>
            <Dropdown
                :value="Pin.type.title"
                :values="types"
                label="Type"
                @change="setType"
                :canCreateValue="true"
                :canEditValue="Pin.type.status === 'private'"
                @addNewValue="createNewType"
                @editValue="openTypeDialog"
            >
                <template v-slot:value="{ value }">
                    <p>{{ `${value.title} ${value.private ? " (private)" : ""}` }}</p>
                </template>
            </Dropdown>
            <p class="error" v-if="Pin.type.id === undefined">Please select or create a type.</p>
            <Button @click="save" primary label="Save"></Button>
        </Dialog>
        <TypeDialog
            :open="typeDialogOpen"
            :pinType="Pin.type"
            @close="closeTypeDialog"
            @change="setType"
            :zIndex="zIndex + 100"
            title="Add new type"
        ></TypeDialog>
    </div>
</template>
<script>
import Dialog from "./Dialog.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import Button from "@/components/button/Button.vue";
import Dropdown from "@/components/inputs/Dropdown.vue";
import TypeDialog from "./TypeDialog.vue";
import { mapState } from "vuex";

export default {
    name: "PinDialog",
    components: {
        Dialog,
        TextInput,
        Button,
        Dropdown,
        TypeDialog,
    },
    props: {
        open: {
            type: Boolean,
            required: true,
        },
        pin: {
            type: Object,
            required: true,
        },
        zIndex: {
            type: Number,
            default: 200,
        },
        title: {
            type: String,
            default: "Edit Pin",
        },
    },
    watch: {
        pin(value) {
            this.Pin = value;
        },
    },
    data: () => ({
        typeDialogOpen: false,
        typeDialogTitle: "Add new type",
        Pin: {
            title: "",
            imageUrl: "",
            description: "",
            area: "",
            type: {
                title: "",
                description: "",
                category: {
                    title: "",
                    description: "",
                },
            },
            x: 0,
            y: 0,
        },
    }),
    computed: {
        ...mapState({
            types: (state) => state.pins.types,
            categories: (state) => state.pins.categories,
        }),
    },
    methods: {
        close() {
            this.$emit("close");
        },
        async save() {
            // create the pin, or update it, depending on whether it has an id
            if (this.Pin.id === undefined) {
                this.Pin = await this.$store.dispatch("addPrivatePin", this.Pin);
            } else {
                this.Pin = await this.$store.dispatch("updatePrivatePin", this.Pin);
            }
            this.Pin.type = this.types.find((type) => type.id === this.Pin.typeId);
            // console.log("In save: ", this.Pin.type, this.types, this.Pin);
            this.Pin.type.category = this.categories.find((category) => category.id === this.Pin.type.categoryId);
            this.$emit("change", this.Pin);
            this.$emit("save", this.Pin);
            this.close();
        },
        setType(type) {
            // type is a string, when a type is selected from the dropdown
            // type is an object, when a new type is created
            if (typeof type === "string") {
                // since this type doesn't have a category field, we need to retrive it from the store
                this.Pin.type = JSON.parse(type);
                this.Pin.type.category = this.categories.find((category) => category.id === this.Pin.type.categoryId);
            } else {
                this.Pin.type = Object.assign({}, type);
            }
        },
        createNewType() {
            this.typeDialogTitle = "Add new type";
            this.Pin.type = {
                title: "",
                description: "",
                category: {
                    title: "",
                    description: "",
                },
            };
            this.openTypeDialog();
        },
        editType() {
            this.typeDialogTitle = "Edit type";
            this.openTypeDialog();
        },
        openTypeDialog() {
            this.typeDialogOpen = true;
        },
        closeTypeDialog() {
            this.typeDialogOpen = false;
        },
    },
};
</script>
