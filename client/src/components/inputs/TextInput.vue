<template>
    <div :class="this.inputClasses">
        <label :style="this.labelStyles">{{ this.label }}</label>
        <input
            :type="this.type"
            @input="this.onInput"
            :value="this.value"
            @focus="this.activate"
            @blur="this.deactivate"
            @keypress="this.keypress"
            ref="input"
        />
    </div>
</template>

<script>
export default {
    name: "textinput",
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        label: String,
        value: String,
        password: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        active: false,
    }),
    methods: {
        onInput(event) {
            this.$emit("change", event.target.value);
            this.$emit("input", event);
        },
        activate() {
            this.active = true;
        },
        deactivate() {
            this.active = false;
        },
        focus() {
            this.$refs.input.focus();
        },
        keypress(event) {
            this.$emit("keypress", event);
        },
    },
    computed: {
        type() {
            return this.password ? "password" : "text";
        },
        empty() {
            return this.value == "" && !this.active;
        },
        labelStyles() {
            return {
                "font-size": !this.empty ? "11px" : "16px",
                "transform": !this.empty ? "translate(3px, -16px)" : "",
            };
        },
        inputClasses() {
            return {
                "textinput": true,
                "active": this.active,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.textinput {
    background-color: $red;
    transition: all 200ms ease;
    border: 4px solid $red;
    border-radius: 6px;
    display: flex;
    align-items: center;

    input {
        outline: none;
        color: $textColor;
        width: 100%;
        font-size: 16px;
        line-height: 24px;
        border: none;
        padding: 6px 8px;
        background-color: $red;
    }

    &.active {
        border: 4px solid $darkRed;
    }

    label {
        transition: all 200ms ease;
        position: absolute;
        margin-left: 4px;
        padding: 0 6px;
        border-radius: 6px;
        pointer-events: none;
        user-select: none;
        background-color: inherit;
    }
}
</style>
