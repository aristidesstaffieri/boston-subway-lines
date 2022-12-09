import React from 'react'
import { Link } from 'react-router-dom'

import { DotLoader } from '../../components'
import { useRoutesStore, RequestState } from '../../store'

import './routes.css'

//  --

interface RoutesPageProps { }

function RoutesPage(props: RoutesPageProps) {
  const { getRoutes, routes, state } = useRoutesStore()

  React.useEffect(() => {
    async function _getRoutes() {
      const subwayTypeFilter = '0,1'
      await getRoutes({ 'filter[type]': subwayTypeFilter })
    }

    _getRoutes()
  }, [getRoutes])

  return (
    <div className='routes-list'>
      {(() => {
        switch (state) {
          case RequestState.LOADING:
            return (
              <div className='loader'>
                <DotLoader />
              </div>
            )
          case RequestState.SUCCESS:
            return routes.map(route => {
              return (
                <Link to={`/${route.id}`} className='route-link' key={route.id}>
                  <h5>{route.attributes.long_name}</h5>
                  <p>ID: {route.id}</p>
                </Link>
              )
            })
          default:
            return null
        }
      })()}
    </div>
  )
}

export {
  RoutesPage
}