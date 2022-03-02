<template>
    <div class="submissions">
        <AdminBar class="adminBar"></AdminBar>
        <SubmissionsBar class="sidebar"></SubmissionsBar>
        <Map class="map"></Map>
    </div>
</template>
<script>
import Map from "@/components/Map";
import AdminBar from "@/components/AdminBar";
import SubmissionsBar from "@/components/SubmissionsBar";

export default {
    name: "Submissions",
    components: {
        Map,
        AdminBar,
        SubmissionsBar,
    },
    mounted() {
        this.$nextTick(() => {
            this.$store.dispatch("fetchSubmitted").catch((err) => {
                this.$router.replace("/login");
            });
        });
    },
};
</script>
<style lang="sass" scoped>
.submissions
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
