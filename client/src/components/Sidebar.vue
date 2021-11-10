<template>
    <div class="sidebar">
        <div class="locations">
            <Tabs
                :values="mapLocations.map((l) => l.name)"
                :index="this.$store.state.mapLocationIndex"
                @change="changeMapLocation"
            ></Tabs>
        </div>
        <p>Categories</p>
        <div class="categories public">
            <FoldableSection
                class="category"
                v-for="category in publicCategories"
                :key="category.id"
                :title="`${category.title} ${category.private ? '(private)' : ''}`"
            >
                <ToggleSwitch
                    v-for="type in getCategoryTypes(category.id)"
                    :key="type.id"
                    @change="
                        () => {
                            toggleType(type);
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
import ToggleSwitch from "./ToggleSwitch";
import Tabs from "./Tabs";

export default {
    name: "sidebar",
    components: {
        Button,
        Tabs,
        FoldableSection,
        ToggleSwitch,
    },
    computed: {
        ...mapGetters(["getCategoryTypes"]),
        ...mapState({
            mapLocations: (state) => state.mapLocations,
            publicCategories: (state) => state.pins.categories,
            publicTypes: (state) => state.pins.types,
        }),
    },
    methods: {
        changeMapLocation(index) {
            this.$store.commit("setMapLocationIndex", index);
        },
        toggleType(type) {
            type.visible = !type.visible;
            this.$store.commit("updateType", { type });
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
    z-index: 1000;
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
