import React from 'react'
import FoodDetails from '@/Components/cards/foodDetails'
import HeaderDemo from '@/Components/DemoSubComponents/DemoHeader'

const index = () => {
  return (
    <div className=' p-1 h-screen'>
      <HeaderDemo/>
      <FoodDetails/>
    </div>
  )
}

export default index