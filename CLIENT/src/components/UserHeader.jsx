import React from 'react'
import PieChart from './PieChart.jsx';

const UserHeader = ({users, currentUser, setUser, addUser}) => {


  return (
    <div className='user-header'>
      <div className='user-info'>
        <div className='info-buttons'>
          <span>User Info</span>
          <div>
            <button>New User</button>
            <select>
              <option>Select User</option>
              <option>Evan</option>
              <option>User2</option>
            </select>
          </div>
        </div>
        <div className='info-box'>
          <div className='info-left' style={{width: '50%'}}>
            <span>User</span>
            <span>Income (monthly)</span>
            <span>Expenses (monthly)</span>
            <span>Rent</span>
          </div>
          <div className='info-right' style={{width: '50%'}}>
            <span>Evan</span>
            <span>$ 3450</span>
            <span>$ 2160</span>
            <span>$ 1200</span>
          </div>
        </div>
      </div>
      <div className='surplus'>
        <span>Weekly Surplus:</span>
        <span>$200</span>
      </div>
      <div className='user-visual'>
        <PieChart/>
      </div>
    </div>
  )
}

export default UserHeader