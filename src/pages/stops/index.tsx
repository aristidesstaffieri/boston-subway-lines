import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { DotLoader } from '../../components'
import { useStopsStore, RequestState } from '../../store'

import './stops.css'

// --

interface StopsPageProps { }

function StopsPage(props: StopsPageProps) {
  const { id } = useParams()
  const nav = useNavigate()
  const { getStops, stops, state } = useStopsStore()

  React.useEffect(() => {
    async function _getStops() {
      if (id) {
        await getStops({ 'filter[route]': id })
      }
    }

    _getStops()
  }, [getStops, id])

  return (
    <div className='stops'>
      {(() => {
        switch (state) {
          case RequestState.LOADING:
            return (
              <div className='loader'>
                <DotLoader />
              </div>
            )
          case RequestState.SUCCESS:
            return (
              <>
                <div className='route-label'>
                  <p>Stops for Subway Line ID: <b>{id}</b></p>
                  <button onClick={() => nav(-1)}>Back</button>
                </div>
                <div className='stops-list'>
                  {stops.map(stop => {
                    return (
                      <div className='stop' key={stop.attributes.name}>
                        <h5>{stop.attributes.name}</h5>
                        <p>{stop.attributes.address}</p>
                      </div>
                    )
                  })}
                </div>
              </>
            )
          default:
            return null
        }
      })()}
    </div>
  )
}

export {
  StopsPage
}