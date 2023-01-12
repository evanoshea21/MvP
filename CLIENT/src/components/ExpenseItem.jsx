import React from 'react'
import axios from 'axios'
import $ from 'jquery'

const ExpenseItem = ({e, sort, getSetUserData, getSetExpenses}) => {
  const [editingOn, toggleEditing] = React.useState(false);
  const [editingStyle, setEditingStyle] = React.useState([{display: 'none'},{display: 'block'}]);

  const editExpense = () => {
    toggleEditing(!editingOn);
    setEditingStyle([editingStyle[1], editingStyle[0]]);

    if(editingOn) {
      console.log('SEND EDIT');
    }
    const url = `${process.env.URL}:${process.env.PORT}/expense/edit`
    var obj = {};
    obj.title = $('.title').val();
    obj.category = $('.category').val();
    obj.type = $('.type').val();
    obj.due_date = $('.due_date').val();
    obj.amount = $('.amount').val();
    console.log('PATCH OBJ', obj);

    //axios
    // first store previous AMOUNT
    // then patch
    // then updateTotalExpense with new AMOUNT minus OLD minus = difference, + positive = true
    // then setAndGet new Expenses

    axios({method: 'patch', url, data: {
      id: e._id
    }})
   };

  const updateTotalExpense = (difference, positive) => {
    if(positive) {
      var difference = Math.round((Number(difference)*100)) / 100; //get negative version
    } else {
      var difference = Math.round((Number(difference) - (2 * Number(difference)))*100) / 100; //get negative version
    }
    console.log('DIFFERENCE = ', difference);
    var url = `${process.env.URL}:${process.env.PORT}/user/${e.username}`
    axios({method: 'post', url, data: {deltaExpense: difference}})
    .then(res => {
      console.log('response delta', res);
      deleteById();
    })
    .catch(err => {
      console.error('error in delta', err);
    })
   }

  const deleteById = () => {
    var url = `${process.env.URL}:${process.env.PORT}/expense/${e._id}`
    axios({method: 'delete', url})
    .then(res => {
      console.log('delete?', res);
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
        <input key={15} className='title' type='text' name='title' value={e.title} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>{e.title}</span>
      </div>
      <div>
        {/* <span>CATEGORY</span> */}
        <input key={14} className='category' type='text' name='category' value={e.category} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>{e.category}</span>
      </div>
      <div>
        {/* <span>TYPE</span> */}
        <input key={13} className='type' type='text' name='type' value={e.type} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>{e.type}</span>
      </div>
      <div>
        {/* <span>DUE DATE</span> */}
        <input key={12} className='due_date' type='text' name='due_date' value={e.due_date} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>{e.due_date}</span>
      </div>
      <div>
        {/* <span>AMOUNT</span> */}
        <input key={11} className='amount' type='text' name='amount' value={e.amount} style={editingStyle[0]}/>
        <span style={editingStyle[1]}>$ {e.amount}</span>
      </div>
        {/* <button>Delete</button> */}
        <i onClick={ev => {ev.preventDefault(); updateTotalExpense(e.amount);}} className="fa-solid fa-x"></i>
        <i onClick={ev => {ev.preventDefault(); editExpense();}} className="fa-solid fa-pencil"></i>
    </div>
  )
}

export default ExpenseItem