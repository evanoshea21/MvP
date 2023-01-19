import React from 'react'
import PieChart from './PieChart.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const UserHeader = ({typeTotal, categoryTotal, userData, allUsers, setUser, setModal}) => {
  const [pieDataType, setPieDataType] = React.useState('category');
  console.log('userData', userData);

  const changeUser = (e) => {
    var username = e.target.value === "Select User" ? 'Sample User' : e.target.value;
    // console.log('e in changeUser', username); //works
    setUser(username);
  };

  const handleChange = (e) => {
    console.log('TOGGLE VALUE', e.target.value);
    setPieDataType(e.target.value);
  };

  return (
    <div className='user-header'>
      <div className='user-info'>
        <div className='user-head'>
          <h1 className='h1'>User Info</h1>
          <div className='user-buttons'>
            <button onClick={e => {e.preventDefault(); setModal({style: {display: 'block'}, type: 'add-user'})}}>New User</button>
            <select id='user-dropdown' onChange={e=> {e.preventDefault(); changeUser(e);}}>
              <option>Select User</option>
              {allUsers.map(user => {
                if(user.username !== 'Sample User') {
                  return <option value={user.username} key={user._id}>{user.username}</option>
                }
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
        <span>$ {Math.round((userData.monthly_income - userData.total_expenses) / 4 * 100) / 100}</span>
      </div>
      <div className='user-visual'>
        <PieChart pieDataType={pieDataType} typeTotal={typeTotal} categoryTotal={categoryTotal}/>
        <div style={{
          // border: '1px solid red',
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}>

        <ToggleButtonGroup
          sx={{fontColor: 'blue'}}
          color='success'
          // value='category'
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          >
      <ToggleButton value="category">Category</ToggleButton>
      <ToggleButton value="type">Type</ToggleButton>
    </ToggleButtonGroup>
          </div>
      </div>
    </div>
  )
}

export default UserHeader