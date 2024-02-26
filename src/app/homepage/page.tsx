import React from 'react'

import Header from '../header'

import TradingViewWidget from '../trading/'

function HomePage() {
  return (
    <div>
      <Header/>
      <div className='flex flex-row justify-center items-end h-80 mx-8'>

      <TradingViewWidget/>
      </div>
      </div>
  )
}

export default HomePage