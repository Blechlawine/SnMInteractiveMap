<template>
    <div id="app">
        <router-view />
        <div class="alerts">
            <Alert v-for="alert in alerts" :key="alert.id" :alert="alert"></Alert>
        </div>
    </div>
</template>

<script>
import Alert from "@/components/Alert";
import { mapState } from "vuex";

export default {
    name: "App",
    components: {
        Alert,
    },
    computed: {
        ...mapState({
            alerts: (state) => state.alerts.alerts,
        }),
    },
    mounted() {
        this.$store.dispatch("startup").catch(err => {
            this.$router.push("/login");
        });
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500;700&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import "@/assets/_variables.scss";

.material-icons {
    user-select: none;
    width: 24px;
    height: 24px;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Baloo Tamma 2";
    font-weight: 500;
    color: $textColor;
}

body {
    overflow: hidden;
    background-color: $backgroundColor;
}

.horizontalFlex {
    display: flex;
    flex-direction: row;
    align-items: center;

    &.right {
        justify-content: flex-end;
    }

    &.left {
        justify-content: flex-start;
    }

    &.gap10 {
        grid-gap: 10px;
    }
}

.alerts {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 10px;
    padding: 10px;
}
</style>
