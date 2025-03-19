<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VehicleCard',
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
})
</script>

<template>
  <div border rounded p-4 shadow>
    <h2>{{ vehicle.title }}</h2>
  </div>
</template>
