<template>
    <div :class="this.classes" v-on:click="this.click">
        <span class="material-icons"><slot></slot></span>
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
        small: {
            type: Boolean,
            default: false,
        },
        tiny: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return {
                buttonPrimary: this.primary,
                buttonSecondary: !this.primary,
                small: this.small,
                tiny: this.tiny,
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

    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    padding: 2px 10px;
    cursor: pointer;

    width: max-content;
    height: min-content;
    display: flex;
    align-items: center;
    height: 48px;
    width: 48px;
    justify-content: center;

    user-select: none;

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

    &.small {
        height: 36px;
        width: 36px;
    }

    &.tiny {
        height: 24px;
        width: 24px;
    }
}
</style>
