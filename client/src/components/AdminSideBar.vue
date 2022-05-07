<template>
    <div class="adminSideBar">
        <CollapsableListItem
            v-for="category in categories"
            :key="category.id"
            :title="category.title"
            :subTitle="category.status"
            :isOpen="category.open"
            @toggleOpen="() => categoryToggleOpen(category.id)"
            @edit="() => categoryEdit(category.id)"
        >
            <CollapsableListItem
                v-for="pinType in types.filter((t) => t.categoryId == category.id)"
                :key="pinType.id"
                :title="pinType.title"
                :subTitle="pinType.status"
                :isOpen="pinType.open"
                @toggleOpen="() => typeToggleOpen(pinType.id)"
                @edit="() => typeEdit(pinType.id)"
            >
                <CollapsableListItem
                    v-for="pin in pins.filter((p) => p.typeId == pinType.id)"
                    :key="pin.id"
                    :title="pin.title"
                    :subTitle="pin.status"
                    :canOpen="false"
                    @edit="() => pinEdit(pin.id)"
                >
                </CollapsableListItem>
            </CollapsableListItem>
        </CollapsableListItem>
    </div>
</template>
<script>
import Button from "@/components/button/Button";
import TextInput from "@/components/inputs/TextInput";
import Dropdown from "@/components/inputs/Dropdown";
import CollapsableListItem from "@/components/collapsableList/CollapsableListItem";
import { mapState } from "vuex";

export default {
    name: "AdminSideBar",
    components: {
        Button,
        TextInput,
        Dropdown,
        CollapsableListItem,
    },
    computed: {
        ...mapState({
            pins: (state) => state.pins.pins,
            categories: (state) => state.pins.categories,
            types: (state) => state.pins.types,
        }),
    },
    methods: {
        categoryToggleOpen(id) {
            this.$store.dispatch("toggleCategoryOpen", id);
        },
        typeToggleOpen(id) {
            this.$store.dispatch("toggleTypeOpen", id);
        },
        categoryEdit(id) {

        },
        typeEdit(id) {

        },
        pinEdit(id) {
            
        },
    },
};
</script>
<style lang="sass" scoped>
.adminSideBar
    display: flex
    flex-direction: column
    gap: 4px

    .submittedPin
        padding: 8px 12px
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        border-bottom: 2px solid rgba(0, 0, 0, 0.3)
</style>
