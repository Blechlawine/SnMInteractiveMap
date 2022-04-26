<template>
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
        <IconButton class="addBtn" @click="selectAddTool" :primary="true">add</IconButton>
        <Dialog class="addPinDialog" title="Create new pin" :open="addPinDialogOpen" @close="closeAddPinDialog">
            <TextInput v-model="newPin.title" label="Name"></TextInput>
            <TextInput v-model="newPin.imageUrl" label="Image-url"></TextInput>
            <TextInput v-model="newPin.description" label="Description"></TextInput>
            <Dropdown
                :value="this.newPin.category.title"
                :values="categories"
                label="Category"
                @change="this.setNewPinCategory"
                @createValue="createNewCategory"
            >
                <template v-slot:value="{ value }">
                    <p>{{ `${value.title} ${value.private ? " (private)" : ""}` }}</p>
                </template>
            </Dropdown>
            <Dropdown
                :value="this.newPin.type.title"
                :values="types"
                label="Type"
                @change="this.setNewPinType"
                @createValue="createNewType"
            >
                <template v-slot:value="{ value }">
                    <p>{{ `${value.title} ${value.private ? " (private)" : ""}` }}</p>
                </template>
            </Dropdown>
            <p class="error" v-if="noCategory">Please select or create a category.</p>
            <p class="error" v-if="noType">Please select or create a type.</p>
            <Button @click="addPin" primary label="Add"></Button>
        </Dialog>
    </div>
</template>

<script>
import Pin from "@/components/Pin";
import IconButton from "@/components/button/IconButton";
import Button from "@/components/button/Button";
import Dropdown from "@/components/inputs/Dropdown";
import Dialog from "@/components/Dialog";
import TextInput from "@/components/inputs/TextInput";
import { mapGetters, mapState } from "vuex";
import { genRandHex } from "@/utils/utils";

export default {
    name: "movableMap",
    components: {
        Pin,
        Dropdown,
        Button,
        TextInput,
        IconButton,
        Dialog,
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
        addPinDialogOpen: false,
        newPin: {
            title: "",
            description: "",
            imageUrl: "",
            category: {},
            type: {},
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
        ...mapGetters(["privateCategories", "privateTypes", "privatePins"]),
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
                cursor: this.canMove ? (this.moving ? "grabbing" : "grab") : "crosshair",
            };
        },
        pinStyle() {
            return {
                transform: `scale(${1 / this.mapScale}) translate(-${18 * this.mapScale}px, -${18 * this.mapScale}px)`,
            };
        },
        noCategory() {
            return this.newPin.category.id == undefined;
        },
        noType() {
            return this.newPin.type.id == undefined;
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
            if (!this.canMove && !this.addPinDialogOpen) {
                this.mouseDownPosition.x = event.clientX;
                this.mouseDownPosition.y = event.clientY;
                const visualMapPosition = this.$refs.map.getBoundingClientRect();
                this.newPin.x = (event.clientX - visualMapPosition.x) / this.mapScale;
                this.newPin.y = (event.clientY - visualMapPosition.y) / this.mapScale;
                this.openAddPinDialog();
            }
        },
        cancelTool(event) {
            if (event.code == "Escape") {
                this.canMove = true;
                window.removeEventListener("keydown", this.cancelTool);
            }
        },
        openAddPinDialog() {
            this.addPinDialogOpen = true;
        },
        closeAddPinDialog() {
            this.canMove = true;
            this.addPinDialogOpen = false;
        },
        addPin() {
            // TODO: if in admin route, send pin to server without id
            if (!this.noCategory && !this.noType) {
                const id = genRandHex(20);
                const pin = {
                    ...this.newPin,
                    id: `private_${id}`,
                    area: this.activeArea.name,
                };
                this.$store.dispatch("addPrivatePin", pin);
                this.closeAddPinDialog();
            }
        },
        createNewType(value) {
            const id = genRandHex(20);
            this.newPin.type = {
                title: value,
                id: `private_${id}`,
                visible: true,
            };
        },
        createNewCategory(value) {
            const id = genRandHex(20);
            this.newPin.category = {
                title: value,
                id: `private_${id}`,
                visible: true,
            };
        },
        setNewPinCategory(value) {
            const category = JSON.parse(value);
            this.newPin.categoryId = category.id;
            this.newPin.category = category;
        },
        setNewPinType(value) {
            const type = JSON.parse(value);
            this.newPin.typeId = type.id;
            this.newPin.type = type;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.addPinDialog {
    cursor: initial;
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
