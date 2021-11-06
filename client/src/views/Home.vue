<template>
    <div class="home">
        <Sidebar class="sidebar"></Sidebar>
        <Map class="map"></Map>
    </div>
</template>

<script>
import Map from "@/components/Map";
import Sidebar from "@/components/Sidebar";

export default {
    name: "Home",
    components: {
        Map,
        Sidebar,
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

    .sidebar {
        grid-area: sidebar;
    }
}
</style>
