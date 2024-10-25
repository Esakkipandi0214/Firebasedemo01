import React from 'react'
import FoodDetails from '@/Components/cards/foodDetails'
// import HeaderDemo from '@/Components/DemoSubComponents/DemoHeader'
import Layout from '../../Components/Layouts/defaultLayout'

const index = () => {
  return (
    <div className=' p-1 h-screen'>
      <Layout>
      <FoodDetails/>
      </Layout>
    </div>
  )
}

export default index