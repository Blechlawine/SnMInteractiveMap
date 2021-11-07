<template>
    <div class="sidebar">
        <div class="locations">
            <Button
                v-for="(mapLocation, index) in mapLocations"
                :key="mapLocation.name"
                :data-index="index"
                @click="changeMapLocation"
                :primary="true"
            >
                {{ mapLocation.name }}
            </Button>
        </div>
        <p>Categories</p>
        <div class="categories public">
            <FoldableSection
                class="category"
                v-for="(category, categoryIndex) in publicCategories"
                :key="category.id"
                :title="`${category.title} ${category.private ? '(private)' : ''}`"
            >
                <ToggleSwitch
                    v-for="(type, typeIndex) in getCategoryTypes(category.id)"
                    :key="type.id"
                    @change="
                        () => {
                            toggleType(type, typeIndex, categoryIndex);
                        }
                    "
                    :on="type.visible"
                    :label="`${type.title} ${type.private ? '(private)' : ''}`"
                ></ToggleSwitch>
            </FoldableSection>
        </div>
    </div>
</template>

<script>
import Button from "@/components/button/Button";
import FoldableSection from "@/components/FoldableSection";
import { mapState, mapGetters } from "vuex";
import ToggleSwitch from "./ToggleSwitch.vue";

export default {
    name: "sidebar",
    components: {
        Button,
        FoldableSection,
        ToggleSwitch,
    },
    computed: {
        ...mapGetters([
            "getCategoryTypes",
        ]),
        ...mapState({
            mapLocations: (state) => state.mapLocations,
            publicCategories: state => state.pins.categories,
            publicTypes: state => state.pins.types,
        }),
    },
    methods: {
        changeMapLocation(event) {
            this.$store.commit("setMapLocationIndex", parseInt(event.target.dataset.index));
        },
        toggleType(type, typeIndex, categoryIndex) {
            type.visible = !type.visible;
            this.$store.commit("updateType", { type, typeIndex, categoryIndex });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.sidebar {
    background-color: $backgroundColor;
    width: 100%;
    height: 100%;
    z-index: 10;
    padding: 12px;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    .locations {
        display: flex;
        flex-direction: row;
        grid-gap: 8px;
    }
}
</style>
