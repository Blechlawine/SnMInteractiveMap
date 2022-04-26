<template>
    <div class="collapsableListItem">
        <div class="item">
            <span class="left">
                <IconButton v-if="canOpen" tiny @click="toggleOpen">{{
                    isOpen ? "expand_more" : "chevron_right"
                }}</IconButton>
                <span class="title">{{ title }}</span>
                <span class="subTitle">{{ subTitle }}</span>
            </span>
            <span class="actions">
                <IconButton v-if="canEdit" tiny @click="edit">edit</IconButton>
            </span>
        </div>
        <div class="children" v-show="isOpen">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import IconButton from "@/components/button/IconButton";

export default {
    name: "CollapsableListItem",
    components: {
        IconButton,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        subTitle: {
            type: String,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
        canOpen: {
            type: Boolean,
            default: true,
        },
        canEdit: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        toggleOpen() {
            this.$emit("toggleOpen");
        },
        edit() {
            this.$emit("edit");
        },
    },
};
</script>

<style lang="sass">
.item
    display: flex
    align-items: center
    justify-content: space-between
    flex-direction: row
    padding: 8px 12px
    border-bottom: 2px solid rgba(0, 0, 0, 0.3)
    &:hover > .actions
        display: flex

    .left
        display: flex
        flex-direction: row
        align-items: center
        justify-content: flex-start
        gap: 8px

        .subTitle
            opacity: 0.5
            font-size: 12px
            font-weight: 300

    .actions
        display: none
        flex-direction: row
        align-items: center
        justify-content: flex-end
        gap: 8px


.children
    display: flex
    flex-direction: column
    padding-left: 24px
</style>
