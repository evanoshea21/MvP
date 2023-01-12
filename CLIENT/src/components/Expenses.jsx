import React from 'react'
import axios from 'axios'
import ExpenseItem from './ExpenseItem.jsx'

const Expenses = ({getSetUserData, username, setExpenses, getSetExpenses, setModal, expenses}) => {

  const sortExpenses = (sortTerm) => {
    var sortValue;
    if(sortTerm === 'Date (upcoming)') {sortValue = 'dateNext'}
    if(sortTerm === 'Date (from 1st)') {sortValue = 'dateA'}
    if(sortTerm === 'Amount (descending)') {sortValue = 'amountD'}
    if(sortTerm === 'Amount (ascending)') {sortValue = 'amountA'}
    const url = `${process.env.URL}:${process.env.PORT}/expenses`;
    axios({method: 'post', url, data: {username, sort: sortValue}})
    .then(res => {
      console.log('ORDERED EXPENSES\n', res.data);
      setExpenses(res.data);
    })
    .catch(err => {
      console.error(err);
    })
   }




  return (
    <div className='expenses'>
      <div className='expense-head'>
        <div className='expense-head'>
          <h1 className='h1'>Expenses</h1>
          <button onClick={e => {e.preventDefault(); setModal({style:{display: 'block'}, type:'add-expense'})}}>Add Expense</button>
        </div>
          {/* <div className='expense-buttons'> */}
            <select onChange={e => {e.preventDefault(); sortExpenses(e.target.value)}}>
              <option name='none'>Sort By</option>
              <option name='dateNext'>Date (upcoming)</option>
              <option name='dateA'>Date (from 1st)</option>
              <option name='amountD'>Amount (descending)</option>
              <option name='amountA'>Amount (ascending)</option>
            </select>

        </div>
      <div className='expense-title'>
          <div>TITLE</div>
          <div>CATEGORY</div>
          <div>TYPE</div>
          <div>DUE DATE</div>
          <div>AMOUNT</div>
      </div>
      <div className='expense-grid'>
      {expenses.map((e, i) => {
        return <ExpenseItem getSetUserData={getSetUserData} getSetExpenses={getSetExpenses} key={e._id} e={e}/>
      })}

      </div>
    </div>
  )
}

export default Expenses