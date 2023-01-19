import React from 'react'
import axios from 'axios'
import $ from 'jquery'

const ExpenseItem = ({e, sort, getSetUserData, getSetExpenses}) => {
  const [editingOn, toggleEditing] = React.useState(false);
  const [editingStyle, setEditingStyle] = React.useState([{display: 'none'},{display: 'block'}]);
  const [postFixDate, setPostFixDate] = React.useState('th');

  const iconStyle = e.username === 'Sample User' ? {display: 'none'} : {};
  const idTail = e._id.slice(-7) + e._id.slice(0,3);
  // console.log('idTail', idTail);

  React.useEffect(() => {
    var dateNum =  String(e.due_date);
    if(dateNum.slice(-1) === '1') {
      setPostFixDate('st');
    } else if (dateNum.slice(-1) === '2' && dateNum !== '12') {
      setPostFixDate('nd');
    } else if (dateNum.slice(-1) === '3' && dateNum !== '12') {
      setPostFixDate('rd');
    } else {
      setPostFixDate('th');
    }
  }, []);

  const editExpense = () => {
    toggleEditing(!editingOn);
    setEditingStyle([editingStyle[1], editingStyle[0]]);

    const url = `${process.env.URL}:${process.env.PORT}/expense/${e._id}`
    var obj = {};
    obj.title = $(`.title${idTail}`).val();
    obj.category = $(`.category${idTail}`).val();
    obj.type = $(`.type${idTail}`).val();
    obj.due_date = $(`.due_date${idTail}`).val();
    obj.amount = $(`.amount${idTail}`).val();
    // console.log('PATCH OBJ', obj);

    //axios
    // first store previous AMOUNT
    // then patch
    // then updateTotalExpense with new AMOUNT minus OLD minus = difference, + positive = true
    // then setAndGet new Expenses

    if(editingOn) {
      // console.log('SEND EDIT');
      var oldAmount = e.amount;
      axios({method: 'post', url, data: obj})
      .then(res => {
        updateTotalExpense(Number(obj.amount) - Number(oldAmount), true);
      })
      .catch(err => {
        console.error(`error updating`);
      })
    }
   };

  const updateTotalExpense = (difference, positive) => {
    if(positive) {
      var difference = Math.round((Number(difference)*100)) / 100; //get negative version
    } else {
      var difference = Math.round((Number(difference) - (2 * Number(difference)))*100) / 100; //get negative version
    }
    // console.log('DIFFERENCE = ', difference);
    var url = `${process.env.URL}:${process.env.PORT}/user/${e.username}`
    axios({method: 'post', url, data: {deltaExpense: difference}})
    .then(res => {
      // console.log('response delta', res);
      if(!positive) {
        deleteById();
      } else {
        getSetExpenses(e.username, sort);
        getSetUserData(e.username);
      }
    })
    .catch(err => {
      console.error('error in delta', err);
    })
   }

  const deleteById = () => {
    var url = `${process.env.URL}:${process.env.PORT}/expense/${e._id}`
    axios({method: 'delete', url})
    .then(res => {
      // console.log('delete?', res);
      //update list
      getSetExpenses(e.username, sort);
      getSetUserData(e.username);
    })
    .catch(err => {
      console.log('delete expense error', err);
    })
  }
  // style={thisStyle}
  return (

    <div className='expense-item'>
      <div>

        {/* <span>TITLE</span> */}
        <input key={15} className={`title${idTail}`} type='text' name='title' defaultValue={e.title} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>{e.title}</span>
      </div>
      <div className='expense-field'>
        {/* <span>CATEGORY</span> */}
        <input key={14} className={`category${idTail}`} type='text' name='category' defaultValue={e.category} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>{e.category}</span>
      </div>
      <div className='expense-type expense-field'>
        {/* <span>TYPE</span> */}
        <input key={13} className={`type${idTail}`} type='text' name='type' defaultValue={e.type} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>{e.type}</span>
      </div>
      <div className='expense-field'>
        {/* <span>DUE DATE</span> */}
        <input key={12} className={`due_date${idTail}`} type='text' name='due_date' defaultValue={e.due_date} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>{e.due_date}{postFixDate}</span>
      </div>
      <div className='expense-field'>
        {/* <span>AMOUNT</span> */}
        <input key={11} className={`amount${idTail}`} type='text' name='amount' defaultValue={e.amount} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>$ {e.amount}</span>
      </div>
        {/* <button>Delete</button> */}
        <i style={iconStyle} onClick={ev => {ev.preventDefault(); updateTotalExpense(e.amount);}} className="fa-solid fa-x"></i>
        <i style={iconStyle} onClick={ev => {ev.preventDefault(); editExpense();}} className="fa-solid fa-pencil"></i>
    </div>
  )
}

export default ExpenseItem