<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useVehicleStore } from '~/stores/vehicle'
import Filters from './Filters.vue'
import VehicleCard from './VehicleCard.vue'

const isLoading = ref(false)
const error = ref(null)
const vehicles = useVehicleStore()

onMounted(async () => {
  isLoading.value = true
  // loading mock data from /public/data.json
  try {
    const response = await fetch('/data.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const dataValue = await response.json()
    vehicles.fromJSON(dataValue.results)
  }
  catch (e: any) {
    error.value = e.message
  }
  finally {
    isLoading.value = false
  }

  // try {
  //   const targetUrl = 'https://gitlab.com/api/v4/snippets/2095016/raw'

  //   const response = await fetch(targetUrl, {
  //     method: 'GET',
  //     headers: {
  //       'PRIVATE-TOKEN': 'glpat-RmNeMekvWhwMFQC5yrFC',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   ('Response', response)
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok')
  //   }
  //   // data.value = await response.text()
  //   data.value = await response.json()
  //   ('Data', data.value)
  // }
  // catch (e) {
  //   error.value = e.message
  // }
  // finally {
  //   isLoading.value = false
  // }
})

function handleFilterChange(_type: string) {
}
</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <div v-else flex="~ gap-4">
    <div>
      <Filters :vehicle-types="vehicles.getVehiclesType()" :price-range="vehicles.getPriceRange()" @update-filters="handleFilterChange" />
    </div>
    <div flex-grow>
      <VehicleCard v-for="vehicle in vehicles.vehicles" :key="vehicle.id" :vehicle="vehicle" />
    </div>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: default
  </route>
