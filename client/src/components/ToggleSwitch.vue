<template>
    <div class="toggleSwitch" @click="toggle">
        <span class="material-icons">{{ this.on ? "check_box" : "check_box_outline_blank" }}</span>
        <p>{{ this.label }}</p>
    </div>
</template>

<script>
export default {
    name: "ToggleSwitch",
    model: {
        event: "change",
        prop: "on",
    },
    props: {
        on: Boolean,
        label: String,
    },
    methods: {
        toggle() {
            this.$emit("change", !this.on);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.toggleSwitch {
    display: flex;
    flex-direction: row;
    grid-gap: 6px;
    cursor: pointer;
    user-select: none;

    .material-icons {
        color: $red;
    }

    label {
        color: inherit;
    }
}
</style>
