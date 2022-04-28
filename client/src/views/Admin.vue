<template>
    <div class="admin">
        <AdminBar class="adminBar"></AdminBar>
        <AdminSideBar class="sidebar"></AdminSideBar>
        <Map class="map"></Map>
    </div>
</template>
<script>
import Map from "@/components/Map";
import AdminBar from "@/components/AdminBar";
import AdminSideBar from "@/components/AdminSideBar";

export default {
    name: "AdminUI",
    components: {
        Map,
        AdminBar,
        AdminSideBar,
    },
    created() {
        this.$store.dispatch("fetchAdminData");
    },
};
</script>
<style lang="sass" scoped>
.admin
    display: grid
    grid-template-columns: 400px 1fr
    grid-template-rows: 56px 1fr
    grid-template-areas: "adminBar map" "sidebar map"

    height: 100vh
    width: 100vw
    overflow: hidden

    .map
        grid-area: map

    .sidebar
        grid-area: sidebar

    .adminBar
        grid-area: adminBar
</style>
