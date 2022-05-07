<template>
    <div :class="classes">
        <AdminBar class="adminBar" v-if="authenticated"></AdminBar>
        <Sidebar class="sidebar"></Sidebar>
        <Map class="map"></Map>
    </div>
</template>

<script>
import Map from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import AdminBar from "@/components/AdminBar";

export default {
    name: "Home",
    components: {
        Map,
        Sidebar,
        AdminBar,
    },
    created() {
        this.$store.dispatch("startup");
    },
    async mounted() {
        await this.$store.dispatch("fetchAll");
    },
    computed: {
        authenticated() {
            return this.$store.state.user.user != undefined;
        },
        classes() {
            return {
                home: true,
                authenticated: this.authenticated,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.home {
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "sidebar map";

    &.authenticated {
        grid-template-rows: 56px 1fr;
        grid-template-areas:
            "adminBar map"
            "sidebar map";
    }

    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .map {
        grid-area: map;
    }

    .sidebar {
        grid-area: sidebar;
    }

    .adminBar {
        grid-area: adminBar;
    }
}
</style>
