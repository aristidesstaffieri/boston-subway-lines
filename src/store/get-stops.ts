import create from 'zustand'

import { ApiResponse, API_BASE, buildQuery, RequestState } from './utils'

// --

interface Stop {
  attributes: {
    address: string
    name: string
  }
}

interface StopsStore {
  state: RequestState
  stops: Stop[]
  getStops: (params: Record<string, string>) => Promise<ApiResponse<{ data: Stop[] }>>
}

export const useStopsStore = create<StopsStore>((set) => ({
  state: RequestState.IDLE,
  stops: [],
  getStops: async (params: Record<string, string>) => {
    set({ state: RequestState.LOADING })
    try {
      const queryParams = buildQuery(params)
      const response = await fetch(`${API_BASE}/stops?${queryParams.toString()}`)
      const { data: stops } = await response.json()

      set({ stops, state: RequestState.SUCCESS })
  
      return stops
    } catch (error) {
      console.error(error)
      set({ state: RequestState.ERROR, stops: [] })
      return []
    }
  }
}))