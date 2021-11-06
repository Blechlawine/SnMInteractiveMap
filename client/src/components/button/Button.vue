<template>
    <div :class="this.classes" v-on:click="this.click">
        {{ this.text }}
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
    },
    computed: {
        classes() {
            return {
                "buttonPrimary": this.primary,
                "buttonSecondary": !this.primary,
            };
        },
        text() {
            return this.$slots.default[0].text;
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

.button {
    transition: all 200ms ease;

    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;

    width: max-content;
    height: min-content;

    user-select: none;

    &Primary {
        @extend .button;
        background-color: coral;

        &:hover {
            background-color: lightcoral;
        }
    }

    &Secondary {
        @extend .button;

        &:hover {
            background-color: lightcoral;
        }
    }
}
</style>
