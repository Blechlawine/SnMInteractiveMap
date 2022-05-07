<template>
    <Dialog :title="title" :open="open" @close="close" :zIndex="zIndex">
        <TextInput v-model="Category.title" label="Name"></TextInput>
        <TextInput v-model="Category.description" label="Description"></TextInput>
        <Button @click="save" primary label="Save"></Button>
    </Dialog>
</template>

<script>
import Dialog from "./Dialog";
import TextInput from "../inputs/TextInput.vue";
import Button from "@/components/button/Button";

export default {
    name: "CategoryDialog",
    components: {
        Dialog,
        Button,
        TextInput,
    },
    props: {
        open: {
            type: Boolean,
            required: true,
        },
        category: {
            type: Object,
            required: true,
        },
        zIndex: {
            type: Number,
            default: 200,
        },
        title: {
            type: String,
            default: "Edit Category",
        },
    },
    watch: {
        category() {
            this.Category = this.category;
        },
    },
    data: () => ({
        Category: {
            title: "",
            description: "",
        },
    }),
    methods: {
        close() {
            this.$emit("close");
        },
        async save() {
            // create the category, or update it, depending on whether it has an id
            if (this.Category.id === undefined) {
                this.Category = await this.$store.dispatch("addPrivateCategory", this.Category);
            } else {
                this.Category = await this.$store.dispatch("updatePrivateCategory", this.Category);
            }
            this.$emit("change", this.Category);
            this.$emit("save", this.Category);
            this.close();
        },
    },
};
</script>
