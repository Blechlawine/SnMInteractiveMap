<template>
    <div class="tabs">
        <div :class="classes(item)" v-for="(item, i) in values" :key="item" @click="select" :data-index="i">
            {{ item }}
        </div>
    </div>
</template>

<script>
export default {
    name: "tabs",
    props: {
        values: Array,
        index: Number,
    },
    methods: {
        select(event) {
            this.$emit("change", parseInt(event.target.dataset.index));
        },
        classes(value) {
            return {
                tab: true,
                active: value === this.values[this.index],
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.tabs {
    background-color: $paperColor;
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 6px;

    .tab {
        border-radius: 6px;
        padding: 2px 10px;
        cursor: pointer;

        width: max-content;
        height: min-content;

        user-select: none;

        display: flex;
        align-items: center;
        flex-direction: row;
        border: 4px solid transparent;

        &.active {
            background-color: $red;
            border: 4px solid $darkRed;
            border-radius: 6px;
        }
    }
}
</style>
