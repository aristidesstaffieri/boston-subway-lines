import create from 'zustand'

import { ApiResponse, API_BASE, buildQuery, RequestState } from './utils'

// --

interface Route {
  id: string
  attributes: {
    long_name: string
  }
}

interface RoutesStore {
  state: RequestState
  routes: Route[]
  getRoutes: (params: Record<string, string>) => Promise<ApiResponse<{ data: Route[] }>>
}

export const useRoutesStore = create<RoutesStore>((set) => ({
  state: RequestState.IDLE,
  routes: [],
  getRoutes: async (params: Record<string, string>) => {
    set({ state: RequestState.LOADING })
    try {
      const queryParams = buildQuery(params)
      const response = await fetch(`${API_BASE}/routes?${queryParams.toString()}`)
      const { data: routes } = await response.json()

      set({ routes, state: RequestState.SUCCESS })
  
      return routes
    } catch (error) {
      console.error(error)
      set({ state: RequestState.ERROR, routes: [] })
      return []
    }
  }
}))