<template>
    <div class="home">
        <Map class="map"></Map>
    </div>
</template>

<script>
import Map from "@/components/Map";

export default {
    name: "Home",
    components: {
        Map,
    },
};
</script>

<style lang="scss" scoped>
.home {
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
        "sidebar map";

    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .map {
        grid-area: map;
    }
}
</style>
