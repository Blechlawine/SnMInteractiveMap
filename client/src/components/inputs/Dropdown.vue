<template>
    <div :class="this.classes">
        <div class="select" @click="toggle">
            <p class="value">{{ this.value || this.label }}</p>
            <span class="material-icons">{{ this.open ? "expand_less" : "expand_more" }}</span>
        </div>
        <div class="values" v-if="this.open">
            <!-- <div class="value" v-for="val in values" :key="val" @click="selectValue" :data-value="val">
                <p>{{ val }}</p>
            </div> -->
            <div
                class="value"
                v-for="val in values"
                :key="JSON.stringify(val)"
                @click="selectValue"
                :data-value="JSON.stringify(val)"
            >
                <slot :value="val" name="value"> </slot>
            </div>
            <div class="valueInput" v-if="canCreateValue">
                <input type="text" v-model="newValue" @keypress="onNewValueKeypress" :placeholder="newValuePlaceHolder" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "dropdown",
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
        newValuePlaceHolder: {
            type: String,
            default: "New Value",
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
        onNewValueKeypress(event) {
            if (event.code == "Enter") {
                this.$emit("createValue", this.newValue);
            }
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
        cursor: pointer;

        .value {
            height: 24px;
        }
    }

    .values {
        position: absolute;
        width: calc(100% - 12px);
        margin: 6px;
        margin-top: 38px;
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
