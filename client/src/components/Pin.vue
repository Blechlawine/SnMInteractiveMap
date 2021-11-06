<template>
    <div class="pin" :style="pinStyle">
        <span class="material-icons">place</span>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
    name: "pin",
    props: {
        pin: Object,
    },
    computed: {
        ...mapState({
            activeArea: state => state.mapLocations[state.mapLocationIndex],
        }),
        ...mapGetters([
            "getType"
        ]),
        visible() {
            return this.getType(this.pin.typeId).visible && this.activeArea.name == this.pin.area;
        },
        pinStyle() {
            return {
                "left": `${this.pin.x}px`,
                "top": `${this.pin.y}px`,
                "display": this.visible ? "" : "none",
            };
        },
    },
}
</script>

<style lang="scss" scoped>
.pin {
    position: absolute;
    z-index: 100;
}
</style>