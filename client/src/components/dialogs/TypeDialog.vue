<template>
    <div>
        <Dialog class="addTypeDialog" :title="title" :open="open" @close="close" :zIndex="zIndex">
            <TextInput v-model="PinType.title" label="Name"></TextInput>
            <TextInput v-model="PinType.description" label="Description"></TextInput>
            <Dropdown
                :value="categoryTitle"
                :values="categories"
                label="Category"
                @change="setCategory"
                :canCreateValue="true"
                :canEditValue="true"
                @addNewValue="createNewCategory"
                @editValue="openCategoryDialog"
            >
                <template v-slot:value="{ value }">
                    <p>{{ `${value.title} ${value.private ? " (private)" : ""}` }}</p>
                </template>
            </Dropdown>
            <p class="error" v-if="PinType.category.id === undefined">Please select or create a category.</p>
            <Button @click="save" primary label="Save"></Button>
        </Dialog>
        <CategoryDialog
            :open="categoryDialogOpen"
            :category="PinType.category"
            @close="closeCategoryDialog"
            @change="setCategory"
            :zIndex="zIndex + 100"
            title="Add new category"
        ></CategoryDialog>
    </div>
</template>

<script>
import Dialog from "./Dialog.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import Button from "@/components/button/Button.vue";
import Dropdown from "@/components/inputs/Dropdown.vue";
import CategoryDialog from "./CategoryDialog.vue";
import { mapState } from "vuex";

export default {
    name: "TypeDialog",
    components: {
        Dialog,
        TextInput,
        Button,
        Dropdown,
        CategoryDialog,
    },
    props: {
        open: {
            type: Boolean,
            required: true,
        },
        pinType: {
            type: Object,
            required: true,
        },
        zIndex: {
            type: Number,
            default: 200,
        },
        title: {
            type: String,
            default: "Edit type",
        },
    },
    watch: {
        pinType() {
            this.PinType = this.pinType;
        },
    },
    data: () => ({
        categoryDialogOpen: false,
        categoryDialogTitle: "Add new category",
        PinType: {
            title: "",
            description: "",
            category: {
                title: "",
                description: "",
            },
        },
    }),
    computed: {
        ...mapState({
            categories: (state) => state.pins.categories,
        }),
        categoryTitle() {
            return this.PinType.category?.title;
        },
    },
    methods: {
        close() {
            this.$emit("close");
        },
        async save() {
            // create the type, or update it, depending on whether it has an id
            if (this.PinType.id === undefined) {
                this.PinType = await this.$store.dispatch("addPrivateType", this.PinType);
            } else {
                this.PinType = await this.$store.dispatch("updatePrivateType", this.PinType);
            }
            this.PinType.category = this.categories.find((category) => category.id === this.PinType.categoryId);
            this.$emit("change", this.PinType);
            this.$emit("save", this.PinType);
            this.close();
        },
        createNewCategory() {
            this.categoryDialogTitle = "Add new category";
            this.PinType.category = {
                title: "",
                description: "",
            };
            this.openCategoryDialog();
        },
        editCategory() {
            this.categoryDialogTitle = "Edit category";
            this.openCategoryDialog();
        },
        closeCategoryDialog() {
            this.categoryDialogOpen = false;
        },
        openCategoryDialog() {
            this.categoryDialogOpen = true;
        },
        async setCategory(category) {
            if (typeof category === "string") {
                this.PinType.category = JSON.parse(category);
            } else {
                this.PinType.category = Object.assign({}, await category);
            }
        },
    },
};
</script>
