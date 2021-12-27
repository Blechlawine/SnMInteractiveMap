<template>
    <div class="alert">
        <p>{{this.alert.title}}</p>
        <p v-for="text in this.alert.text" :key="text">{{ text }}</p>
    </div>
</template>

<script>
export default {
    name: "alert",
    props: {
        alert: Object,
    },
};
</script>

<style lang="scss" scoped>
// TODO: style alert
.alert {
    width: 100%;
}
</style>
