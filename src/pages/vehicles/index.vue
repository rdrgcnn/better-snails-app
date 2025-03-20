<script setup lang="ts">
import type { Filter } from '~/stores/vehicle'
import { createToaster } from '@meforma/vue-toaster'
import { onMounted, ref } from 'vue'
import Filters from '~/components/Filters.vue'
import VehicleCard from '~/components/VehicleCard.vue'
import { useVehicleStore } from '~/stores/vehicle'

const isLoading = ref(false)
const vehicleStore = useVehicleStore()
const selectedFilters = ref<Filter>({
  type: '',
  rating: 0,
})
const toaster = createToaster()
const { t } = useI18n()

onMounted(async () => {
  isLoading.value = true
  if (vehicleStore.vehicles?.length) {
    isLoading.value = false
  }
  try {
    const targetUrl = 'https://gitlab.com/api/v4/snippets/2095016/raw'

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(t('error.data'))
    }
    const dataValue = await response.json()
    vehicleStore.fromJSON(dataValue.results)
  }
  catch (e) {
    toaster.error(e.message)
  }
  finally {
    isLoading.value = false
  }
})

function handleFilterChange(filters: Filter) {
  selectedFilters.value = filters
}
</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <div v-else flex="~ gap-4">
    <div>
      <Filters @update-filters="handleFilterChange" />
    </div>
    <div flex="~ gap-8" flex-wrap>
      <div v-if="vehicleStore.filterVehicles(selectedFilters).length === 0">
        No vehicles found
      </div>
      <VehicleCard v-for="vehicle in vehicleStore.filterVehicles(selectedFilters)" :key="vehicle.id" class="card" :vehicle="vehicle" />
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 400px;
}
</style>

<route lang="yaml">
  meta:
    layout: default
  </route>
