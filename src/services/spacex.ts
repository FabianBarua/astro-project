import type { APISpaceXResponse, Doc } from '../types/api'

const API_URL = 'https://api.spacexdata.com/v5/launches'

export async function getLaunches(): Promise<Doc[]> {
  const res = await fetch(`${API_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          date_unix: 'asc',
        },
        limit: 12,
      },
    }),
  })
  const { docs: launches } = (await res.json()) as APISpaceXResponse
  return launches
}

export async function getLaunchById({ id }: { id: string }): Promise<Doc> {
  const res = await fetch(`${API_URL}/${id}`)
  const launch = await res.json() as Doc
  return launch
}
