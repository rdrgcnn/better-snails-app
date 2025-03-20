<script setup lang="ts">
import Slider from '@vueform/slider'
import StarRating from 'vue-star-rating'

const emit = defineEmits(['updateFilters'])
const vehicleStore = useVehicleStore()
const vehicleTypes = vehicleStore.getVehiclesType
const priceRange = vehicleStore.getPriceRange
const { t } = useI18n()

const selectedType: Ref<string | null> = ref('')
const selectedPriceRange: Ref<number[]> = ref([priceRange.min, priceRange.max])
const selectedRating: Ref<number> = ref(0)

function handleVehicleTypeChange(event: Event) {
  selectedType.value = (event.target as HTMLSelectElement).value
  updateFilters()
}

function handleRangeChange(value: number[]) {
  selectedPriceRange.value = value
  updateFilters()
}

function handleRatingChange(value: number) {
  selectedRating.value = value
  updateFilters()
}

function updateFilters() {
  emit('updateFilters', {
    type: selectedType.value,
    priceRange: {
      min: selectedPriceRange.value[0],
      max: selectedPriceRange.value[1],
    },
    rating: selectedRating.value,
  })
}
</script>

<template>
  <div class="filters" border rounded px-4 py-6 shadow>
    <h2>{{ t('filters.title') }}</h2>
    <div mt-10 flex="~ gap-6" flex-col>
      <div class="type filter" flex="~ gap-2" flex-col>
        <label text-align-start for="type">{{ t('filters.vehicle_type') }}</label>
        <select id="type" v-model="selectedType" flex-grow @change="handleVehicleTypeChange">
          <option value="">
            All Vehicles
          </option>
          <option v-for="type in vehicleTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      <div class="price filter" flex="~ gap-2" flex-col>
        <label text-align-start for="price-range">{{ t('filters.price_range') }} {{ selectedPriceRange[0] }}€ - {{ selectedPriceRange[1] }}€</label>
        <Slider id="price-range" v-model="selectedPriceRange" px-2 :min="priceRange.min" :max="priceRange.max" :tooltips="false" @slide="handleRangeChange" />
      </div>
      <div class="rating filter" flex="~ gap-2" flex-col>
        <label text-align-start for="rating-range">{{ t('filters.minimum_rating') }}</label>
        <StarRating id="rating-range" v-model="selectedRating" :star-size="20" :animate="false" :show-rating="false" active-color="#10b981" @update:rating="handleRatingChange" />
      </div>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.filters {
  width: 300px;
}
</style>
