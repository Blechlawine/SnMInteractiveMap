<template>
    <div :class="this.classes" v-on:click="this.click">
        <p class="label">{{ this.label }}</p>
    </div>
</template>

<script>
export default {
    name: "CustomButton",
    props: {
        primary: {
            type: Boolean,
            default: false,
        },
        label: String,
    },
    computed: {
        classes() {
            return {
                buttonPrimary: this.primary,
                buttonSecondary: !this.primary,
            };
        },
    },
    methods: {
        click(event) {
            this.$emit("click", event);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.button {
    transition: all 200ms ease;

    border-radius: 6px;
    padding: 2px 10px;
    cursor: pointer;

    width: max-content;
    height: min-content;

    user-select: none;

    display: flex;
    align-items: center;
    flex-direction: row;

    .label {
        font-weight: 500;
        font-size: 16px;
        height: 24px;
        pointer-events: none;
    }

    &Primary {
        @extend .button;
        background-color: $red;
        border: 4px solid $darkRed;

        &:hover {
            background-color: $darkRed;
        }
    }

    &Secondary {
        @extend .button;

        &:hover {
            background-color: $hoverColor;
        }
    }
}
</style>
