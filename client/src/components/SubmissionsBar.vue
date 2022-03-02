<template>
    <div class="submissionsBar">
        <div class="submittedPin" v-for="pin in submittedPins" :key="pin.id">
            <p>
                {{ pin.title }}
            </p>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";

export default {
    name: "SubmissionsBar",
    computed: {
        ...mapState({
            submittedPins: (state) => state.pins.pins,
        }),
    },
};
</script>
<style lang="sass" scoped>
.submissionsBar
    display: flex
    flex-direction: column
    gap: 4px

    .submittedPin
        padding: 8px 12px
        cursor: pointer
</style>
