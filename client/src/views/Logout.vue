<template>
    <div class="logout">
        <h1>You are now logged out</h1>
    </div>
</template>
<script>
export default {
    name: "Logout",
    mounted() {
        this.$nextTick(() => {
            this.$store.dispatch("logout").then((res) => {
                this.$router.push("/");
            });
        });
    },
};
</script>

<style lang="sass">
.logout
    display: flex
    flex-direction: column
    align-items: center
    height: 100vh
</style>
