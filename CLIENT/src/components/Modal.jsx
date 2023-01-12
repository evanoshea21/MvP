import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from "styled-components";

  //STYLED COMPONENTS
  const ModalHeader = styled.h2`
    font-family: 'Varela Round', sans-serif;
    text-align: center;
  `;

  const EvansForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * {
    font-family: 'Varela Round', sans-serif;
    width: 50%;
    padding: 10px;
    margin: 10px auto;
    }
    & > textarea {
      resize:none;
    }
`;
  //END of styled components

const Modal = ({formType, username, setUsername, style, setModal, getSetUserData, getSetExpenses, getSetAllUsers}) => { //formType add-user, add-expense, new-savings
  console.log('MODAL Type', formType);
  var type;
  if(formType === 'add-user') {type = 'user'}
  if(formType === 'add-expense' || formType === 'add-goal' ) {type = 'expense'}

  var inputFields = [];
  if(formType === 'add-user') {
    inputFields = [
      <input type='text' name='username' key={39} placeholder={`name`} required={true}></input>,
      <input type='text' name='monthly_income' key={35} placeholder={`monthly income`} required={true}></input>,
      <input type='text' name='pay_period' key={36} placeholder={`bi-weekly, monthly...`} required={true}></input>,
      <input type='text' name='pay_dates' key={37} placeholder={`11,24`} required={true}></input>,
      <input type='text' name='housing' key={43} placeholder={`Rent/Mortgage Amount in USD`} required={true}></input>,
      <input type='text' name='rent_due' key={38} placeholder={`Rent/Mortgage Due Date (15, 30, 1, etc)`} required={true}></input>
    ];
  } else if(formType === 'add-expense' || formType === 'add-goal') {
    inputFields = [
      <input type='text' name='title' key={39} placeholder={`rent, netflix, etc`} required={true}></input>,
      <input type='text' name='category' key={38} placeholder={`housing, subscription...`} required={true}></input>,
      <input type='text' name='type' key={37} placeholder={`essential, non-essential...`} required={true}></input>,
      <input type='text' name='due_date' key={36} placeholder={`date with "th"`} required={true}></input>,
      <input type='text' name='pay_period' key={35} placeholder={`bi-weekly, monthly...`} required={true}></input>,
      <input type='text' name='amount' key={34} placeholder={`Amount in USD`} required={true}></input>
    ];
  }
  if(formType === 'add-goal') {
    inputFields.push(<input type='text' name='add Financial Goal' key={50} placeholder={`additional for savings goal..`} required={true}></input>);
      // <input type='text' name='sample' key={39} placeholder={`sample0`} required={true}></input>,
      // <input type='text' name='sample' key={28} placeholder='sample'></input>
  }

  const updateTotalExpense = (difference) => {
    var difference = Number(difference);
    console.log('DIFFERENCE = ', difference);
    var url = `${process.env.URL}:${process.env.PORT}/user/${username}`
    axios({method: 'post', url, data: {deltaExpense: difference}})
    .then(res => {
      console.log('response delta', res);
      getSetUserData(username);
    })
    .catch(err => {
      console.error('error in delta', err);
    })
   }

  const sendData = () => {

    //GATHER FORM DATA
      var form = document.getElementById('myForm');
      const formData = new FormData(form);
      const dataObj = {};
      for (const [key, value] of formData) {
        Object.assign(dataObj, {[key]: value})
      }

      console.log('dataObj from Modal:\n', dataObj);
      //POST user, expense from dataObj

      //if add user
        //POST USER
          //(after posted setExpenses in username, then call setUserData)
        //then, POST rent to EXPENSES of "housing" from User
        //setUsername to user entered
        //create useEffect[username] -> get all expenses and set expense
      if(formType === 'add-user') {
        Object.assign(dataObj, {total_expenses: dataObj.housing})
        const url = `${process.env.URL}:${process.env.PORT}/insert/user`;
        axios({method: 'post', url: url, data: dataObj})
        .then((res) => {
          var addRentExpense = {
            username: dataObj.username,
            title: 'Rent/Mortgage',
            category: 'housing',
            type: 'essential',
            due_date: dataObj.rent_due,
            pay_period: "monthly",
            amount: dataObj.housing,
          };
          var addRentURL = `${process.env.URL}:${process.env.PORT}/insert/expense`;
          return new Promise((resolve, reject) => {
            axios({method: 'post', url: addRentURL, data: addRentExpense})
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            })
          })//end PROMISE
        })//end .THEN for insert rent
        .then(res => {
          //setusername to update expenses and user info
          setUsername(dataObj.username);
          getSetAllUsers();
        })
        .catch(err => {
          alert(`Error Posting ${type}\n\n` + err.response.data);
          console.error(err);
        })

      } else if (formType === 'add-expense') {
        Object.assign(dataObj, {username: username});
        console.log('DATA TO INSERT EXPENSE\n', dataObj);
        const url = `${process.env.URL}:${process.env.PORT}/insert/expense`;
        axios({method: 'post', url, data: dataObj})
        .then((res) => {
          updateTotalExpense(dataObj.amount);
          //now expense should be added.
          console.log('INSERTED EXPENSE?', res);
          //get and set expenses (username, 'none')
          getSetExpenses(username, 'dateNext');
        })//end .THEN for insert rent
        .catch(err => {
          console.error(err);
        })
      }

  }; //end SEND DATA



  return ReactDOM.createPortal(
    // style={style} below in div before
    <div style={style} className='modal modal-bg'>
      <span onClick={e => {e.preventDefault(); setModal({style: {display: 'none'}, type: 'add-user'})}} id='pop-up-exit'>X</span>
      <div className='modal-content'>
        <ModalHeader>Add {type}</ModalHeader>
        <EvansForm id='myForm' onSubmit={e => {e.preventDefault(); setModal({style: {display: 'none'}, type: 'new-user'}); sendData();}}>
          {inputFields}
          <button type='submit'>Submit {type}</button>
        </EvansForm>
      </div>

    </div>,
    document.getElementById('pop-up')

  )

};

export default Modal;