<template>
    <div class="sidebar">
        <div class="locations">
            <Button
                v-for="(mapLocation, index) in mapLocations"
                :key="mapLocation.name"
                :data-index="index"
                @click="changeMapLocation"
                :primary="true"
            >
                {{ mapLocation.name }}
            </Button>
        </div>
    </div>
</template>

<script>
import Button from "@/components/button/Button";
import { mapState } from "vuex";

export default {
    name: "sidebar",
    components: {
        Button,
    },
    computed: {
        ...mapState({
            mapLocations: (state) => state.mapLocations,
        }),
    },
    methods: {
        changeMapLocation(event) {
            this.$store.commit("setMapLocationIndex", parseInt(event.target.dataset.index));
        },
    },
};
</script>

<style lang="scss" scoped>
.sidebar {
    background-color: white;
    width: 100%;
    height: 100%;
    z-index: 200;

    .locations {
        display: flex;
        flex-direction: row;
        grid-gap: 8px;
    }
}
</style>
