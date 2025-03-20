<script setup lang="ts">
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import StarRating from 'vue-star-rating'
import 'vue3-carousel/carousel.css'

const router = useRouter()
const route = useRoute('/vehicles/[id]')
const vehicleStore = useVehicleStore()
const vehicle = ref<Vehicle | null>(null)
const { t } = useI18n()

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true,
  clamp: true,
}
watchEffect(() => {
  const vehicleId = route.params.id
  vehicle.value = vehicleStore.getById(vehicleId)
})

function handleImageError(event: Event) {
  // Safe guard for image loading error
  const img = event.target as HTMLImageElement
  img.src = '/vehicle-placeholder.png'
}
</script>

<template>
  <div v-if="!vehicle">
    The vehicle your looking for does not exist
    <button
      m="3 t6" text-sm btn
      @click="router.back()"
    >
      Back
    </button>
  </div>
  <div p-8 flex="~ gap-8">
    <div flex-grow flex="~ col gap-8">
      <div border class="carousel">
        <Carousel v-bind="carouselConfig">
          <Slide v-for="picture in vehicle?.pictures" :key="picture.id">
            <div class="carousel__item">
              <img :src="picture.url" alt="vehicle.title" @error="handleImageError">
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <div class="desc" flex="~ gap-8">
        <div class="owner" border>
          <img class="owner-image" :src="vehicle?.owner.profilePicture" alt="vehicle.owner.name">
        </div>
        <div class="infos" flex="~ gap-4" flex-grow flex-col flex-items-start>
          <span font-size-7>{{ vehicle?.title }}</span>
          <span font-size-5>{{ vehicle?.city }}</span>
          <span>{{ t('vehicle.from_price') }} {{ vehicle?.startingPrice }}{{ vehicle?.currency }}/{{ t('vehicle.day') }}</span>
          <div class="rating" flex-justify-self-end flex="~ gap-4">
            <StarRating id="rating-range" :read-only="true" :rating="vehicle?.reviewAverage" :increment="0.1" :star-size="15" :animate="false" :show-rating="false" active-color="#10b981" /> - {{ vehicle?.reviewCount }} reviews
          </div>
        </div>
      </div>

      <div class="features" flex="~ gap-4">
        <div class="feature" flex="~ gap-4" flex-col flex-items-center border p-4>
          <div i-carbon-user-avatar-filled-alt text-7 />
          <div>{{ vehicle?.seats }} seats</div>
        </div>
        <div class="feature" flex="~ gap-4" flex-col flex-items-center border p-4>
          <div
            i-carbon-hospital-bed text-7
          />
          <div>{{ vehicle?.beds }} beds</div>
        </div>
      </div>
    </div>
    <div class="right" flex="~ col gap-8">
      <div class="price" border p-4 text-start>
        <span>Espace réservé à la réservation</span>
      </div>
      <div class="others" p-4 flex="~ col gap-4">
        <div>{{ t('vehicle.you_may_also_like') }}</div>
        <div flex="~ col gap-4">
          <VehicleCard v-for="otherVehicle in vehicleStore.getByType(vehicle!.vehicleType)?.filter((v) => v.id !== vehicle!.id)" :key="otherVehicle.id" :vehicle="otherVehicle" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.desc {
  height: 200px;
}
.carousel {
  width: 100%;
}
.right {
  width: 300px;
  min-width: 300px;
}
.owner-image {
  height: 200px;
}
.rating {
  margin-top: auto;
}
</style>

<route lang="yaml">
  meta:
    layout: default
  </route>
