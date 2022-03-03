<template>
    <div class="login">
        <h1>Login</h1>
        <TextInput label="E-mail" v-model="email"></TextInput>
        <TextInput label="Password" password v-model="password"></TextInput>
        <Button primary @click="login" label="Login"></Button>
    </div>
</template>

<script>
import TextInput from "@/components/inputs/TextInput";
import Button from "@/components/button/Button";

export default {
    name: "login",
    components: {
        Button,
        TextInput,
    },
    data: () => ({
        password: "",
        email: "",
    }),
    methods: {
        login() {
            this.$store.dispatch("login", {
                password: this.password,
                email: this.email,
            }).then(res => {
                this.$router.push(this.$route.query?.redirect ?? "/");
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    grid-gap: 20px;
}
</style>
