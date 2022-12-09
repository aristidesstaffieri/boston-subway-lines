
// get from env
export const API_BASE = 'https://api-v3.mbta.com'

export enum RequestState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export function buildOptions(
  method: string = 'GET',
  headers: Record<string, string>,
  body?: RequestInit['body']
) {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include',
    body,
    method,
  }

  return options
}

export function buildQuery(filters: Record<string, string | number>) {
  const query = new URLSearchParams()
  for (const key of Object.keys(filters)) {
    if (filters[key]) {
      query.append(key, filters[key].toString())
    }
  }

  return query
}

export type ApiResponse<T> = { data: T }

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const opts = options || buildOptions('GET', {})
  return fetch(endpoint, opts)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText)
      }

      return res.json()
    })
    .then((data) => {
      if (data.error || data.errors) {
        const err = data.error || data.errors
        throw new Error(err)
      }

      return data
    })
    .catch((err) => {
      throw new Error(err)
    })
}