import React from 'react'

import './dot-loader.css'

// --

interface DotLoaderProps {}

const DotLoader = (props: DotLoaderProps) => {
  return (
    <div className='dot-loader'>
      <div className='dot' />
      <div className='dot' />
      <div className='dot' />
    </div>
  )
}

export { DotLoader }
