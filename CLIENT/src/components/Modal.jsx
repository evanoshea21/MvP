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

const Modal = ({formType, username, style, setModal}) => { //formType add-user, add-expense, new-savings
  console.log('MODAL Type', formType);
  var type;
  if(formType === 'add-user') {type = 'user'}
  if(formType === 'add-expense' || formType === 'add-goal' ) {type = 'expense'}

  var inputFields = [];
  if(formType === 'add-user') {
    inputFields = [
      <input type='text' name='username' key={39} placeholder={`name`} required={true}></input>,
      <input type='text' name='monthly_income' key={35} placeholder={`monthly income`} required={true}></input>,
      <input type='text' name='pay-period' key={36} placeholder={`bi-weekly, monthly...`} required={true}></input>,
      <input type='text' name='pay_dates' key={37} placeholder={`11,24`} required={true}></input>,
      <input type='text' name='housing' key={38} placeholder={`Rent/Mortgage Amount in USD`} required={true}></input>
    ];
  } else if(formType === 'add-expense' || formType === 'add-goal') {
    inputFields = [
      <input type='text' name='title' key={39} placeholder={`rent, netflix, etc`} required={true}></input>,
      <input type='text' name='category' key={38} placeholder={`housing, subscription...`} required={true}></input>,
      <input type='text' name='type' key={37} placeholder={`essential, non-essential...`} required={true}></input>,
      <input type='text' name='due-date' key={36} placeholder={`date with "th"`} required={true}></input>,
      <input type='text' name='pay-period' key={35} placeholder={`bi-weekly, monthly...`} required={true}></input>,
      <input type='text' name='amount' key={34} placeholder={`Amount in USD`} required={true}></input>
    ];
  } else if(formType === 'add-goal') {
    inputFields.push(<input type='text' name='sample' key={50} placeholder={`additional for savings goal..`} required={true}></input>);
      // <input type='text' name='sample' key={39} placeholder={`sample0`} required={true}></input>,
      // <input type='text' name='sample' key={28} placeholder='sample'></input>
  } else {
    inputFields = [
      <input type='text' name='body' key={39} placeholder={`${type} body`} required={true}></input>,
      <input type='text' name='name' key={28} placeholder='name for username'></input>,
      <input type='email' name='email' key={10} placeholder='myemail@email.com'></input>
    ];
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
      const url = `${process.env.URL}:${process.env.PORT}/insert/${type}`;
      axios({method: 'post', url: url, data: dataObj})
      .then((res) => {
        console.log('res Modal POST response for', type, res);
      })
      .catch(err => {
        alert(`Error Posting ${type}\n\n` + err.response.data);
        console.error(err);
      })

  }; //end SEND DATA



  return ReactDOM.createPortal(
    // style={style} below in div before
    <div style={style} className='modal modal-bg'>
      <span onClick={e => {e.preventDefault(); setModal({style: {display: 'none'}, type: 'add-user'})}} id='pop-up-exit'>X</span>
      <div className='modal-content'>
        <ModalHeader>Add {type}</ModalHeader>
        <EvansForm id='myForm' onSubmit={e => {e.preventDefault(); setModalStyle({display: 'none'});}}>
          {inputFields}
          <button type='submit'>Submit {type}</button>
        </EvansForm>
      </div>

    </div>,
    document.getElementById('pop-up')

  )

};

export default Modal;