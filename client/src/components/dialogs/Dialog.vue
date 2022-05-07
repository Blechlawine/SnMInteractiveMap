<template>
    <div class="dialogWrapper" v-if="open">
        <div class="clickAwayListener" @click="close" :style="blackOutStyle"></div>
        <div class="dialog" :style="dialogStyle">
            <div class="titleBar">
                <p class="title">{{ title }}</p>
                <span class="material-icons closeBtn" @click="close">close</span>
            </div>
            <div class="dialogContent">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CustomDialog",
    props: {
        title: String,
        open: Boolean,
        zIndex: {
            type: Number,
            default: 200,
        },
    },
    computed: {
        blackOutStyle() {
            return {
                zIndex: this.zIndex - 1,
            };
        },
        dialogStyle() {
            return {
                "z-index": this.zIndex,
            };
        },
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.dialogWrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .clickAwayListener {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100vw;
        height: 100vh;
        z-index: 100;
    }
}

.dialog {
    min-width: 300px;
    display: flex;
    flex-direction: column;

    .titleBar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        height: 48px;
        background-color: $red;
        border: 4px solid $darkRed;
        border-radius: 6px;
        z-index: 220;

        * {
            height: 24px;
        }

        .closeBtn {
            cursor: pointer;
        }
    }

    .dialogContent {
        background-color: $paperColor;
        border: 4px solid $paperBorderColor;
        border-radius: 6px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        grid-gap: 12px;
        margin: 6px;
        margin-top: -6px;
        z-index: 210;
    }
}
</style>
