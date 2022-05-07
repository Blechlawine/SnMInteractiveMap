<template>
    <div>
        <div
            class="map"
            ref="component"
            @mousedown="onMouseDown"
            @mouseup="stopMoving"
            @mousemove="onMouseMove"
            @wheel="zoom"
            @click="useTool"
            :style="mapStyle"
        >
            <div class="mapContent" :style="mapPositionStyle" ref="map">
                <img :src="`${mapImageSrc}`" alt="" class="image" ref="image" />
                <Pin v-for="pin in pins" :key="pin.id" :pin="pin" :style="pinStyle"></Pin>
            </div>
        </div>
        <IconButton class="addBtn" @click="selectAddTool" :primary="true">add</IconButton>
        <PinDialog
            :open="pinDialogOpen"
            :pin="this.newPin"
            @close="closePinDialog"
            @change="setPin"
            title="Add new pin"
        ></PinDialog>
    </div>
</template>

<script>
import Pin from "@/components/Pin";
import IconButton from "@/components/button/IconButton";
import Button from "@/components/button/Button";
import Dropdown from "@/components/inputs/Dropdown";
import PinDialog from "@/components/dialogs/PinDialog.vue";
import TextInput from "@/components/inputs/TextInput";
import { mapGetters, mapState } from "vuex";

export default {
    name: "movableMap",
    components: {
        Pin,
        Dropdown,
        Button,
        TextInput,
        IconButton,
        PinDialog,
    },
    data: () => ({
        moving: false,
        mapPosition: {
            x: 0,
            y: 0,
        },
        mouseDownPosition: {
            x: 0,
            y: 0,
        },
        prevMapPosition: {
            x: 0,
            y: 0,
        },
        canMove: true,
        mapScale: 1,
        pinDialogOpen: false,
        newPin: {
            title: "",
            description: "",
            imageUrl: "",
            type: {
                title: "",
                description: "",
                category: {
                    title: "",
                    description: "",
                },
            },
            x: 0,
            y: 0,
        },
    }),
    computed: {
        ...mapState({
            activeArea: (state) => state.mapLocations[state.mapLocationIndex],
            categories: (state) => state.pins.categories,
            types: (state) => state.pins.types,
            pins: (state) => state.pins.pins,
        }),
        ...mapGetters(["privateCategories", "privateTypes", "privatePins", "getCategoryTypes"]),
        types() {
            return (this.newPin?.type?.category?.id && this.getCategoryTypes(this.newPin.type.category.id)) || [];
        },
        mapPositionStyle() {
            return {
                transform: `scale(${this.mapScale}) translate(${this.mapPosition.x}px, ${this.mapPosition.y}px)`,
            };
        },
        mapImageSrc() {
            return this.$store.state.mapLocations[this.$store.state.mapLocationIndex].path;
        },
        mapStyle() {
            return {
                cursor: this.canMove
                    ? this.moving
                        ? "grabbing"
                        : "grab"
                    : this.pinDialogOpen
                    ? "default"
                    : "crosshair",
            };
        },
        pinStyle() {
            return {
                transform: `scale(${1 / this.mapScale}) translate(-${18 * this.mapScale}px, -${18 * this.mapScale}px)`,
            };
        },
    },
    methods: {
        onMouseDown(event) {
            if (this.canMove) {
                this.moving = true;
                this.mouseDownPosition.x = event.clientX;
                this.mouseDownPosition.y = event.clientY;
                this.prevMapPosition = {
                    ...this.mapPosition,
                };
            }
        },
        stopMoving() {
            this.moving = false;
        },
        onMouseMove(event) {
            if (this.moving && this.canMove) {
                this.moveMap(event);
            }
            event.preventDefault();
        },
        moveMap(event) {
            this.mapPosition.x = this.prevMapPosition.x + (event.clientX - this.mouseDownPosition.x) / this.mapScale;
            this.mapPosition.y = this.prevMapPosition.y + (event.clientY - this.mouseDownPosition.y) / this.mapScale;
        },
        zoom(event) {
            if (this.canMove) {
                if (event.deltaY > 0) {
                    // zoom out
                    this.mapScale *= 0.9;
                } else {
                    // zoom in
                    this.mapScale *= 1.1;
                    this.mapPosition;
                }
            }
        },
        selectAddTool() {
            setTimeout(() => {
                this.canMove = false;
            }, 100);
            window.addEventListener("keydown", this.cancelTool);
        },
        useTool(event) {
            if (!this.canMove && !this.pinDialogOpen) {
                this.mouseDownPosition.x = event.clientX;
                this.mouseDownPosition.y = event.clientY;
                const visualMapPosition = this.$refs.map.getBoundingClientRect();
                this.newPin.x = (event.clientX - visualMapPosition.x) / this.mapScale;
                this.newPin.y = (event.clientY - visualMapPosition.y) / this.mapScale;
                this.openPinDialog();
            }
        },
        cancelTool(event) {
            if (event.code == "Escape") {
                this.canMove = true;
                window.removeEventListener("keydown", this.cancelTool);
            }
        },
        openPinDialog() {
            // TODO: Das hier wird ausgeführt, wenn es nicht soll
            this.newPin = {
                x: this.newPin.x,
                y: this.newPin.y,
                title: "",
                description: "",
                area: this.activeArea.name,
                imageUrl: "",
                type: {
                    title: "",
                    description: "",
                    category: {
                        title: "",
                        description: "",
                    },
                },
            };
            this.pinDialogOpen = true;
        },
        closePinDialog() {
            this.canMove = true;
            this.pinDialogOpen = false;
        },
        setPin(pin) {
            this.newPin = {
                ...pin,
                area: this.activeArea.name,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.addPinDialog {
    cursor: initial;
    z-index: 100;
}

.map {
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select: none;

    background-color: $paperColor;

    .mapContent {
        height: 100%;
        width: 100%;
    }
}

.image {
    position: absolute;
    pointer-events: none;
    width: 4096px;
}

.addBtn {
    position: fixed;
    bottom: 12px;
    right: 12px;
}
</style>
