<template>
    <div class="pin" :style="pinStyle">
        <div class="clicky" @click="toggleDetails">
            <span class="material-icons pinIcon">place</span>
        </div>
        <div class="details" v-if="detailsOpen">
            <div class="detailsHeader">
                <p class="pinTitle">
                    {{ this.pin.title || "Untitled Pin" }}
                </p>
                <span class="material-icons closeBtn" @click="toggleDetails">close</span>
            </div>
            <div class="detailsContent">
                <div class="placeholder" v-if="!this.pin.description && !this.pin.imageUrl">
                    <p>This pin does not have a description</p>
                </div>
                <div class="imageContainer" v-if="this.pin.imageUrl">
                    <img :src="this.pin.imageUrl" alt="" />
                </div>
                <p class="description" v-if="this.pin.description">
                    {{ this.pin.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "pin",
    props: {
        pin: Object,
    },
    data: () => ({
        detailsOpen: false,
    }),
    computed: {
        ...mapState({
            activeArea: (state) => state.mapLocations[state.mapLocationIndex],
        }),
        ...mapGetters(["getType"]),
        visible() {
            return this.getType(this.pin.typeId).visible && this.activeArea.name == this.pin.area;
        },
        pinStyle() {
            return {
                "margin-left": `${this.pin.x}px`,
                "margin-top": `${this.pin.y}px`,
                display: this.visible ? "initial" : "none",
            };
        },
    },
    methods: {
        toggleDetails() {
            this.detailsOpen = !this.detailsOpen;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.pin {
    position: absolute;
    height: 36px;
    width: 36px;

    .clicky {
        position: absolute;
        cursor: pointer;
        width: 36px;
        height: 36px;
    }

    .details {
        position: absolute;
        z-index: 120;
        background-color: $backgroundColor;
        border-radius: 6px;
        transform: translate(calc(-50% + 18px), -100%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);

        .detailsHeader {
            display: grid;
            grid-template-columns: max-content 24px;
            grid-gap: 10px;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            border-bottom: 2px solid black;
            p {
                height: 24px;
            }
        }

        .detailsContent {
            padding: 12px;
            max-width: 400px;
            width: max-content;

            .imageContainer {
                width: 100%;
                height: 100%;

                img {
                    border-radius: 6px;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .closeBtn {
        cursor: pointer;
    }

    .pinIcon {
        font-size: 36px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);
    }
}
</style>
