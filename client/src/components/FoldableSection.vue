<template>
    <div class="foldableSection">
        <div class="sectionHeader" @click="toggle">
            <p class="title">{{ title }}</p>
            <span class="material-icons">{{ this.open ? "expand_less" : "expand_more" }}</span>
        </div>
        <div class="content" v-if="this.open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "foldableSection",
    props: {
        title: String,
    },
    data: () => ({
        open: true,
    }),
    methods: {
        toggle() {
            this.open = !this.open;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.foldableSection {
    display: flex;
    flex-direction: column;

    .sectionHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        cursor: pointer;
        height: 48px;
        background-color: $red;
        border: 4px solid $darkRed;
        border-radius: 6px;
        z-index: 30;

        .title {
            line-height: 24px;
        }
    }
    
    .content {
        z-index: 20;
        padding: 12px;
        margin: 6px;
        margin-top: -6px;
        background-color: $paperColor;
        border-radius: 6px;
        border: 4px solid $paperBorderColor;
        * {
            color: $backgroundColor;
        }
    }
}
</style>
