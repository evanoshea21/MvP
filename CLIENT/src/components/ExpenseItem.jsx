import React from 'react'
import axios from 'axios'

const ExpenseItem = ({e, getSetExpenses}) => {

  const updateTotalExpense = (difference) => {
    var difference = Number(difference) - (2 * Number(difference)); //get negative version
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
      getSetExpenses();
    })
    .catch(err => {
      console.log('delete expense error', err);
    })
  }

  return (
    <div className='expense-item'>
      <div>
        {/* <span>TITLE</span> */}
        <span>{e.title}</span>
      </div>
      <div>
        {/* <span>CATEGORY</span> */}
        <span>{e.category}</span>
      </div>
      <div>
        {/* <span>TYPE</span> */}
        <span>{e.type}</span>
      </div>
      <div>
        {/* <span>DUE DATE</span> */}
        <span>{e.due_date}</span>
      </div>
      <div>
        {/* <span>AMOUNT</span> */}
        <span>$ {e.amount}</span>
      </div>
        {/* <button>Delete</button> */}
        <i onClick={ev => {ev.preventDefault(); updateTotalExpense(e.amount);}}className="fa-solid fa-x"></i>
        <i className="fa-solid fa-pencil"></i>
    </div>
  )
}

export default ExpenseItem