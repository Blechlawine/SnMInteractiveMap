<template>
    <div class="login">
        <h1>Register</h1>
        <TextInput label="E-mail" v-model="email"></TextInput>
        <TextInput label="Username" v-model="username"></TextInput>
        <TextInput label="Password" password v-model="password"></TextInput>
        <TextInput label="Repeat password" password v-model="passwordRepeat"></TextInput>
        <TextInput label="Register code" password v-model="code"></TextInput>
        <Button primary @click="register" label="Register"></Button>
    </div>
</template>

<script>
import TextInput from "@/components/inputs/TextInput";
import Button from "@/components/button/Button";

export default {
    name: "register",
    components: {
        Button,
        TextInput,
    },
    data: () => ({
        password: "",
        passwordRepeat: "",
        username: "",
        email: "",
        code: '',
    }),
    methods: {
        register() {
            this.$store.dispatch("register", {
                email: this.email,
                username: this.username,
                password: this.password,
                passwordRepeat: this.passwordRepeat,
                referenceCode: this.code,
            }).then(res => {
                this.$router.push("/");
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
