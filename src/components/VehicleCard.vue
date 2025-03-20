<script setup lang="ts">
import StarRating from 'vue-star-rating'

interface Props {
  vehicle: Vehicle
};

const props = defineProps<Props>()
const coverIndex = ref<number>(0)
const router = useRouter()
const { t } = useI18n()

function handleImageError(event: Event) {
  // Safe guard for image loading error
  const img = event.target as HTMLImageElement
  if (coverIndex.value === props.vehicle.pictures.length - 1) {
    coverIndex.value = 0
    img.src = '/vehicle-placeholder.png'
    return
  }
  coverIndex.value += 1
}

function handleNavigation() {
  router.push(`/vehicles/${props.vehicle.id}`)
}
</script>

<template>
  <div class="vehicle-card" flex="col" rounded @click="handleNavigation">
    <div class="cover" flex="col" items="center">
      <img :src="vehicle.pictures[coverIndex].url" placeholder="/vehicle-placeholder.png" alt="vehicle.title" @error="handleImageError">
    </div>
    <div p-4>
      <div flex="~" flex-justify-between>
        <span class="overflowing">{{ vehicle.title }}</span>
        <span>{{ vehicle.startingPrice }}{{ vehicle.currency }}/{{ t('vehicle.day') }}</span>
      </div>
      <div text-align-start>
        <span>{{ vehicle.city.trim() }}</span>
      </div>
      <div flex flex-justify-between>
        <span class="overflowing">{{ vehicle.seats }} {{ t('vehicle.seats') }} - {{ vehicle.beds }} {{ t('vehicle.beds') }}</span>
        <span>
          <StarRating id="rating-range" :read-only="true" :rating="vehicle.reviewAverage" :increment="0.1" :star-size="15" :animate="false" :show-rating="false" active-color="#10b981" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vehicle-card {
  &:hover {
    cursor: pointer;
  }
  .cover {
    height: 200px;
    img {
      border-radius: 20px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .overflowing {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    padding-right: 0.5rem;
  }
}
</style>
