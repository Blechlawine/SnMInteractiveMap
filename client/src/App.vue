<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    mounted() {
        this.$store.dispatch("fetchCategories");
    },
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500;700&display=swap');
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
</style>
