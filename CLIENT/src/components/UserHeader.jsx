import React from 'react'
import PieChart from './PieChart.jsx';

const UserHeader = () => {
  return (
    <div className='user-header'>
      <div className='user-info'></div>
      <div className='surplus'></div>
      <div className='user-visual'>
        <PieChart/>
      </div>
    </div>
  )
}

export default UserHeader