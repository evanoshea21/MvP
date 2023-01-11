// import React from 'react'

// const Modal = () => {
//   return (
//     <div className='modal'>Modal</div>
//   )
// }

// export default Modal

//////////////////////
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

const Modal = ({type, style, setModalStyle}) => {
  // var type = formType === 'addUser' ? 'Question' : 'Answer';
  var addOnKey = ['4','5','6','9'];
  var inputFields = [
    <input type='text' name='body' key={39 + addOnKey[0]} placeholder={`${type} body`} required={true}></input>,
    <input type='text' name='name' key={28 + addOnKey[1]} placeholder='name for username'></input>,
    <input type='email' name='email' key={10 + addOnKey[2]} placeholder='myemail@email.com'></input>
  ];
  // if(formType === 'addA') {
  //   inputFields.push(<div key={5768} className='label1'>Separate images by Comma-space</div>);
  //   inputFields.push(<textarea rows={4} name='photos' key={productID + addOnKey[3]} placeholder='url of photos, new line per photo'></textarea>)
  // }


  const sendData = () => {

      var form = document.getElementById('myForm');
      const formData = new FormData(form);
      const dataObj = {};
      for (const [key, value] of formData) {
        Object.assign(dataObj, {[key]: value})
      }

      console.log('dataObj SEND Modal DATA', dataObj);
      //post Question from form
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
      <span onClick={e => {e.preventDefault(); setModalStyle({display:'none'})}} id='pop-up-exit'>X</span>
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