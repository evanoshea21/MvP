import React from 'react';
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
  return (
    <div>
      {/* PUT YOUR APP HERE*/}
      <Header />
      <UserHeader />
      <div id='expense-box'>
        <Expenses />
        <FinanceSidebar />
      </div>
      {/* <PieChart/> */}
    </div>
  )
};

export default APP;
