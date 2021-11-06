<template>
    <div
        class="map"
        ref="component"
        @mousedown="onMouseDown"
        @mouseup="stopMoving"
        @mouseout="stopMoving"
        @mousemove="onMouseMove"
        @mousewheel="zoom"
    >
        <div class="mapContent" :style="mapPositionStyle">
            <Pin v-for="pin in pins" :key="pin.id" :pin="pin"></Pin>
            <img :src="`${mapImageSrc}`" alt="" class="image" ref="image" />
        </div>
    </div>
</template>

<script>
import Pin from "@/components/Pin";
import { mapGetters } from "vuex";

export default {
    name: "movableMap",
    components: {
        Pin,
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
        mapScale: 1,
    }),
    computed: {
        ...mapGetters(["pins"]),
        mapPositionStyle() {
            return {
                "margin-left": "200px",
                transform: `scale(${this.mapScale}) translate(${this.mapPosition.x}px, ${this.mapPosition.y}px`,
            };
        },
        mapImageSrc() {
            return this.$store.state.mapLocations[this.$store.state.mapLocationIndex].path;
        },
    },
    methods: {
        onMouseDown(event) {
            this.moving = true;
            this.mouseDownPosition.x = event.clientX;
            this.mouseDownPosition.y = event.clientY;
            this.prevMapPosition = {
                ...this.mapPosition,
            };
            event.preventDefault();
        },
        stopMoving() {
            this.moving = false;
            event.preventDefault();
        },
        onMouseMove(event) {
            if (this.moving) {
                this.moveMap(event);
            }
            event.preventDefault();
        },
        moveMap(event) {
            this.mapPosition.x = this.prevMapPosition.x + (event.clientX - this.mouseDownPosition.x) / this.mapScale;
            this.mapPosition.y = this.prevMapPosition.y + (event.clientY - this.mouseDownPosition.y) / this.mapScale;
        },
        zoom(event) {
            if (event.deltaY > 0) {
                // zoom out
                this.mapScale *= 0.9;
            } else {
                // zoom in
                this.mapScale *= 1.1;
                this.mapPosition;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.map {
    width: 100%;
    height: 100%;
    overflow: hidden;

    background-color: $paperColor;

    .mapContent {
        height: 100%;
    }
}

.image {
    position: absolute;
    pointer-events: none;
}
</style>
