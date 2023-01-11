import React from 'react'
import PieChart from './PieChart.jsx';

const UserHeader = ({userData, allUsers, setUser}) => {

  const changeUser = (e) => {
    console.log('e in changeUser', e.target.value); //works
    setUser(e.target.value);
  };


  return (
    <div className='user-header'>
      <div className='user-info'>
        <div className='user-head'>
          <h1 className='h1'>User Info</h1>
          <div className='user-buttons'>
            <button>New User</button>
            <select onChange={e=> {e.preventDefault(); changeUser(e);}}>
              <option>Select User</option>
              {allUsers.map(user => {
                return <option key={user._id}>{user.username}</option>
              })}
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
            <span>{userData.username}</span>
            <span>$ {userData.monthly_income}</span>
            <span>$ {userData.total_expenses}</span>
            <span>$ {userData.housing}</span>
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