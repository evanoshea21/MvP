import React, {useState} from 'react';
import axios from 'axios';
//import $ from 'jquery';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import PieChart from './components/PieChart.jsx';
import Header from './components/Header.jsx';
import UserHeader from './components/UserHeader.jsx';
import Expenses from './components/Expenses.jsx';
import FinanceSidebar from './components/FinanceSidebar.jsx';
import Modal from './components/Modal.jsx';

const APP = () => {
  const [username, setUsername] = useState('Sample User');
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [sort, setSort] = useState('dateNext');
  const [modal, setModal] = useState({style: {display: 'none'}, type: 'add-user'});
  const [categoryTotal, setCategoryTotal] = useState({
    Subscription: 0,
    Housing: 0,
    Auto: 0,
    "Living Costs": 0,
    'Savings/Investments': 0,
    'Debt Payment': 0,
    Other: 0
  });
  const [typeTotal, setTypeTotal] = useState({
    Essential: 0,
    'Non-Essential': 0,
    Liability: 0,
    Asset: 0,
    Other: 0
  });

  React.useEffect(() => {
    calcTotals();
  }, [expenses]);


  React.useEffect(() => { //get and set expenses
    if(username && sort) {
      getSetUserData(username);
      getSetExpenses(username, sort);
      getSetAllUsers();
    }
  }, []);
  React.useEffect(() => {
    getSetUserData(username);
    getSetExpenses(username, sort);
  }, [username]);


  const calcTotals = () => {
    var objCategory = {};
    var objType = {};
    Object.assign(objCategory, categoryTotal);
    Object.assign(objType, typeTotal);
    for(var key in objCategory) {
      objCategory[key] = 0;
    } //resets it
    for(var key in objType) {
      objType[key] = 0;
    } //resets it
    expenses.forEach(exp => {
      objCategory[exp.category] += exp.amount;
      objType[exp.type] += exp.amount;
    })
    // console.log('category Totals..', objCategory);
    // console.log('type Totals..', objType);
    setCategoryTotal(objCategory);
    setTypeTotal(objType);
    //go through ALL expenses
  };

  const getSetExpenses = (username, sort) => {
    // console.log('GET SET EXPENSES', username, sort);//getting it?//

    axios({
      method: 'post',
      url: `${process.env.URL}:${process.env.PORT}/expenses`,
      headers: {'content-type': 'application/json'},
      data: {username, sort: sort}
    })
    .then(response => {
      // console.log('RESPONSE UPDATE EXPENSES\n', response.data);
      setExpenses(response.data);
    })
    .catch(err => {
      console.error('AXIOS get error in App.jsx', err);
    })
  }
  const getSetUserData = (username) => {
    axios({
      method: 'post',
      url: `${process.env.URL}:${process.env.PORT}/user`,
      headers: {'content-type': 'application/json'},
      data: {username}
    })
    .then(response => {
      // console.log('response USER', response.data);
      setUserData(response.data[0]);
    })
    .catch(err => {
      console.error('AXIOS get error in App.jsx', err);
    })
  }
  const getSetAllUsers = () => {
    //set current user to username
    axios({
      method: 'post',
      url: `${process.env.URL}:${process.env.PORT}/user`,
      headers: {'content-type': 'application/json'},
      data: {username:'all'}
    })
    .then(response => {
      setAllUsers(response.data);
    })
    .catch(err => {
      console.error('AXIOS get error AllUsers in App.jsx', err);
    })
  }

  return (
    <div>
      {/* PUT YOUR APP HERE*/}
      <Header />
      <UserHeader typeTotal={typeTotal} categoryTotal={categoryTotal} setModal={setModal} userData={userData} allUsers={allUsers} setUser={setUsername}/>
      <div id='expense-box'>
        <Expenses sort={sort} setSort={setSort} username={username} setExpenses={setExpenses} getSetUserData={getSetUserData} getSetExpenses={getSetExpenses} expenses={expenses} setModal={setModal}/>
        <FinanceSidebar setModal={setModal}/>
      </div >
      <Modal allUsers={allUsers} getSetUserData={getSetUserData} getSetExpenses={getSetExpenses} getSetAllUsers={getSetAllUsers} username={username} setUsername={setUsername} style={modal.style} setModal={setModal} formType={modal.type}/>
      {/* new-user, add-expense, new-savings */}
    </div>
  )
};

export default APP;
