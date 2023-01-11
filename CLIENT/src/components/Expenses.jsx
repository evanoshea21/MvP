import React from 'react'
import ExpenseItem from './ExpenseItem.jsx'

const Expenses = ({setModal, expenses}) => {
  return (
    <div className='expenses'>
      <div className='expense-head'>
        <div className='expense-head'>
          <h1 className='h1'>Expenses</h1>
          <button onClick={e => {e.preventDefault(); setModal({style:{display: 'block'}, type:'add-expense'})}}>Add Expense</button>
        </div>
          {/* <div className='expense-buttons'> */}
            <select>
              <option>Sort By</option>
              <option>Date (upcoming)</option>
              <option>Date (from 1st)</option>
              <option>Amount (descending)</option>
              <option>Amount (ascending)</option>
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
        return <ExpenseItem key={e._id} e={e}/>
      })}

      </div>
    </div>
  )
}

export default Expenses