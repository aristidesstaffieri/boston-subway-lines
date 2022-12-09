import React from 'react'
import { Outlet } from 'react-router-dom'

// --

interface LayoutProps { }

function Layout(props: LayoutProps) {

  return (
    <>
      <header>
        <h1>Boston Subway Lines</h1>
      </header>
      <Outlet />
    </>
  )
}

export {
  Layout
}