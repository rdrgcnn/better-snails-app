import { acceptHMRUpdate, defineStore } from 'pinia'

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicles: null as Vehicle[] | null,
  }),
  getters: {
    getVehiclesType(state: VehicleState) {
      if (!state || !state.vehicles)
        return []
      // Get all vehicles types and remove duplicates
      const types = state.vehicles.map(vehicle => vehicle.vehicleType)
      return Array.from(new Set(types))
    },
    getPriceRange(state: VehicleState) {
      if (!state.vehicles)
        return { min: 0, max: 0 }
      const prices = state.vehicles.map(vehicle => vehicle.startingPrice)
      return {
        min: Math.min(...prices),
        max: Math.max(...prices),
      }
    },
    getById: (state: VehicleState) => {
      return (id: string) =>
        state.vehicles?.find(vehicle => vehicle.id === id) ?? null
    },
    getByType: (state: VehicleState) => {
      return (type: string) =>
        state.vehicles?.filter(vehicle => vehicle.vehicleType === type)
        ?? null
    },
    filterVehicles: (state: VehicleState) => {
      return (filters: Filter) => {
        if (!state.vehicles)
          return []
        // Return filtered vehicles, if type is '' return all type vehicles, if priceRange is not set return all vehicles
        return state.vehicles.filter((vehicle) => {
          if (filters.type !== '' && filters.type !== vehicle.vehicleType)
            return false
          if (
            filters.priceRange
            && (vehicle.startingPrice < filters.priceRange.min
              || vehicle.startingPrice > filters.priceRange.max)
          ) {
            return false
          }
          if (vehicle.reviewAverage < filters.rating)
            return false
          return true
        })
      }
    },
  },
  actions: {
    addVehicleFromJSON(json: any) {
      const newVehicle = {
        id: `${json.id}`,
        title: json.title,
        startingPrice: json.starting_price,
        currency: json.currency_used,
        reviewAverage: json.review_average,
        reviewCount: json.review_count,
        vehicleType: json.vehicle_type,
        beds: json.vehicle_beds,
        seats: json.vehicle_seats,
        city: json.vehicle_location_city,
        postcode: json.vehicle_location_postcode,
        owner: {
          firstName: json.vehicle_owner_first_name,
          profilePicture: json.vehicle_owner_picture_url,
          language: json.vehicle_owner_language,
        },
        url: json.url,
        pictures: json.pictures,
      }
      if (
        this.vehicles
        && this.vehicles.some(vehicle => vehicle.id === newVehicle.id)
      ) {
        return
      }
      this.vehicles = this.vehicles
        ? [...this.vehicles, newVehicle]
        : [newVehicle]
    },
    fromJSON(json: any[]) {
      json.forEach(vehicle => this.addVehicleFromJSON(vehicle))
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useVehicleStore as any, import.meta.hot),
  )
}
export interface VehicleState {
  vehicles: Vehicle[] | null
}

export interface Filter {
  type: string
  priceRange?: { min: number, max: number }
  rating: number
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
  pictures: { id: number, url: string }[]
}

export interface Owner {
  firstName: string
  profilePicture: string
  language: string
}
