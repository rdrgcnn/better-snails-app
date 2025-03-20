import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import data from '../public/data.json'

describe('tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should create store', () => {
    const store = useVehicleStore()
    expect(store).toBeDefined()
  })
  // Test all store.
  it('should add vehicles', () => {
    const store = useVehicleStore()
    store.fromJSON(data.results)
    expect(store.vehicles).toHaveLength(data.results.length)
  })
  it('should add vehicle', () => {
    const store = useVehicleStore()
    store.addVehicleFromJSON(data.results[0])
    expect(store.vehicles).toHaveLength(1)
  })
  it('should get vehicles type', () => {
    const store = useVehicleStore()
    store.fromJSON(data.results)
    expect(store.getVehiclesType).toEqual(
      Array.from(new Set(data.results.map(v => v.vehicle_type))),
    )
  })
  it('should get price range', () => {
    const store = useVehicleStore()
    store.fromJSON(data.results)
    expect(store.getPriceRange).toEqual({
      min: Math.min(...data.results.map(v => v.starting_price)),
      max: Math.max(...data.results.map(v => v.starting_price)),
    })
  })
  it('should get by id', () => {
    const store = useVehicleStore()
    store.fromJSON(data.results)
    expect(store.getById(data.results[0].id.toString())?.title).toEqual(
      data.results[0].title,
    )
  })
  it('should get by type', () => {
    const store = useVehicleStore()
    store.fromJSON(data.results)
    expect(store.getByType(data.results[0].vehicle_type)).toHaveLength(5)
  })
})
