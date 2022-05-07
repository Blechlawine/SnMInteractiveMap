<template>
    <div :class="this.classes">
        <div class="select">
            <p class="value">{{ this.value || this.label }}</p>
            <div class="actions">
                <IconButton v-if="canCreateValue" @click="addNewValue" tiny>add</IconButton>
                <IconButton v-if="canEditValue" @click="editValue" tiny>edit</IconButton>
                <IconButton @click="toggle" tiny>{{ this.open ? "expand_less" : "expand_more" }}</IconButton>
            </div>
        </div>
        <div class="values" v-if="this.open">
            <div
                class="value"
                v-for="val in values"
                :key="makeString(val)"
                @click="selectValue"
                :data-value="makeString(val)"
            >
                <slot :value="val" name="value"> </slot>
            </div>
        </div>
    </div>
</template>

<script>
import IconButton from "@/components/button/IconButton";

export default {
    name: "dropdown",
    components: {
        IconButton,
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        label: String,
        value: String,
        values: Array,
        canCreateValue: {
            type: Boolean,
            default: true,
        },
        canEditValue: {
            type: Boolean,
            default: true,
        },
    },
    data: () => ({
        active: false,
        open: false,
        newValue: "",
    }),
    methods: {
        activate() {
            this.active = true;
        },
        deactivate() {
            this.active = false;
        },
        toggle() {
            this.open = !this.open;
        },
        selectValue(event) {
            this.$emit("change", event.currentTarget.dataset.value);
            this.open = false;
        },
        addNewValue(event) {
            this.$emit("addNewValue", event);
        },
        editValue(event) {
            this.$emit("editValue", event);
        },
        makeString(value) {
            if (typeof value === "string") {
                return value;
            }
            return JSON.stringify(value);
        },
    },
    computed: {
        labelStyles() {
            return {};
        },
        classes() {
            return {
                dropdown: true,
                open: this.open,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.dropdown {
    transition: all 200ms ease;
    display: flex;
    flex-direction: column;
    position: relative;

    &.open {
        .select {
            z-index: 30;
        }
        .values {
            z-index: 20;
        }
    }

    .select {
        background-color: $red;
        border: 4px solid $darkRed;
        border-radius: 6px;
        padding: 6px 8px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .actions {
            display: flex;
            flex-direction: row;
        }

        .value {
            height: 24px;
        }
    }

    .values {
        position: absolute;
        width: calc(100% - 12px);
        margin: 6px;
        margin-top: 36px;
        background-color: $red;
        border-radius: 6px;
        border: 4px solid $darkRed;

        .value {
            padding: 12px;
            cursor: pointer;
            p {
                height: 24px;
            }

            &:hover {
                background-color: $darkRed;
            }
        }

        .valueInput {
            cursor: pointer;
            color: white;

            ::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }

            input {
                font-size: 16px;
                line-height: 24px;
                padding: 12px;
                background-color: transparent;
                outline: none;
                border-radius: 4px;
                border: none;
            }
        }
    }
}
</style>
