import React from 'react'

import Header from '../header'

import TradingViewWidget from '../trading'
import TradingHeatmap from '../trading/trading-heatmap'

function HomePage() {
  return (
    <div>
      <Header/>
      <div className='flex flex-row justify-start pb-40 mx-8'>
      
      <div className='flex flex-col lg:flex-row lg:justify-between h-screen w-screen gap-6'>
        <TradingViewWidget/>
        <TradingHeatmap/>
      </div>
      </div>
      </div>
  )
}

export default HomePage