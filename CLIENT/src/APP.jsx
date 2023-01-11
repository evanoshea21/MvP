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
  const [username, setUsername] = useState('evan');
  const [expenses, setExpenses] = useState([]);
  const [sort, setSort] = useState('dateNext');
  const [modalStyle, setModalStyle] = useState({display: 'none'});

  React.useEffect(() => { //get and set expenses
    if(username && sort) {
      getAndSetExpenses(username, sort);
    }
  }, [username, sort])
  React.useEffect(() => { //get and set expenses
    console.log('new modal style', modalStyle);
  }, [modalStyle])

  const getAndSetExpenses = (username, sort) => {
    console.log('username sort before call1', username, sort);//getting it?

    const url = `${process.env.URL}:${process.env.PORT}/expenses`;
    console.log('url is ', url);
    //axios({method: 'post', url: url, headers: auth, data: dataObj})
    var dataObj = {username, sort};
    axios({
      method: 'post',
      url: url,
      headers: {'content-type': 'application/json'},
      data: dataObj
    })
    .then(response => {
      console.log('response expenses', response.data);
    })
    .catch(err => {
      console.error('AXIOS get error in App.jsx', err);
    })
  }



  return (
    <div>
      {/* PUT YOUR APP HERE*/}
      <Header />
      <UserHeader />
      <div id='expense-box'>
        <Expenses />
        <FinanceSidebar />
      </div >
      <Modal style={modalStyle} setModalStyle={setModalStyle} type={'new-user'}/>
      {/* new-user, add-expense, new-savings */}
    </div>
  )
};

export default APP;
