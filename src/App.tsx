import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './components'
import { RoutesPage, StopsPage } from './pages'

import './app.css'

// --

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<RoutesPage />} />
            <Route path='/:id' element={<StopsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
