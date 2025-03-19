import { acceptHMRUpdate, defineStore } from 'pinia'

export const useVehicleStore = defineStore('vehicle', () => {
  const vehicles = ref<Vehicle[] | null>(null)

  function setNewVehicle(newVehicle: Vehicle) {
    if (!vehicles.value)
      return
    vehicles.value = [...vehicles.value].map((vehicle) => {
      return vehicle.id === newVehicle.id ? newVehicle : vehicle
    })
  }

  function fromJSON(json: any[]) {
    json.forEach((vehicleJSON) => {
      const newVehicle = {
        id: vehicleJSON.id,
        title: vehicleJSON.title,
        startingPrice: vehicleJSON.starting_price,
        currency: vehicleJSON.currency_used,
        reviewAverage: vehicleJSON.review_average,
        reviewCount: vehicleJSON.review_count,
        vehicleType: vehicleJSON.vehicle_type,
        beds: vehicleJSON.vehicle_beds,
        seats: vehicleJSON.vehicle_seats,
        city: vehicleJSON.vehicle_location_city,
        postcode: vehicleJSON.vehicle_location_postcode,
        owner: {
          firstName: vehicleJSON.vehicle_owner_first_name,
          profilePicture: vehicleJSON.vehicle_owner_picture_url,
          language: vehicleJSON.vehicle_owner_language,
        },
        url: vehicleJSON.url,
        pictures: vehicleJSON.pictures,
      }
      vehicles.value = vehicles.value
        ? [...vehicles.value, newVehicle]
        : [newVehicle]
    })
  }

  function getVehiclesType() {
    if (!vehicles.value)
      return []
    // Get all vehicles types and remove duplicates
    const types = vehicles.value.map(vehicle => vehicle.vehicleType)
    return Array.from(new Set(types))
  }

  function getPriceRange() {
    if (!vehicles.value)
      return { min: 0, max: 0 }
    const prices = vehicles.value.map(vehicle => vehicle.startingPrice)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  }

  return {
    setNewVehicle,
    getVehiclesType,
    getPriceRange,
    fromJSON,
    vehicles,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useVehicleStore as any, import.meta.hot),
  )
}

export interface Vehicle {
  id: string
  title: string
  startingPrice: number
  currency: string
  reviewAverage: number
  reviewCount: number
  vehicleType: string
  beds: number
  seats: number
  city: string
  postcode: string
  owner: Owner
  url: string
  pictures: string[]
}

export interface Owner {
  firstName: string
  profilePicture: string
  language: string
}
