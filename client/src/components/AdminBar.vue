<template>
    <div class="adminBar">
        <div class="tools">
            <Button @click="normalView" :primary="isNormalView" label="App"></Button>
            <Button @click="submissionsView" :primary="isSubmissionsView" label="Submissions"></Button>
        </div>
        <div class="logout">
            <Button @click="logout" label="Logout"></Button>
        </div>
    </div>
</template>
<script>
import Button from "@/components/button/Button";

export default {
    name: "AdminBar",
    components: {
        Button,
    },
    computed: {
        isNormalView() {
            return this.$route.path == "/";
        },
        isSubmissionsView() {
            return this.$route.path == "/submissions";
        },
    },
    methods: {
        logout() {
            this.$router.push("/logout");
        },
        normalView() {
            this.$router.push("/");
        },
        submissionsView() {
            this.$router.push("/submissions");
        },
    },
};
</script>
<style lang="sass" scoped>
@import "@/assets/_variables.scss"

.adminBar
    height: 100%
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    padding: 12px
    background-color: $backgroundColor
    border-bottom: 4px solid rgba(0, 0, 0, 0.3)

    .tools
        display: flex
        flex-direction: row
        align-items: center
        justify-content: flex-start
</style>
