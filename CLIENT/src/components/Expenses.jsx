import React from 'react'
import ExpenseItem from './ExpenseItem.jsx'

const Expenses = (props) => {
  return (
    <div className='expenses'>
      <h1>Expenses</h1>
      <div className='expense-title'>
          <div>TITLE</div>
          <div>CATEGORY</div>
          <div>TYPE</div>
          <div>DUE DATE</div>
          <div>AMOUNT</div>
      </div>
      <ExpenseItem />
      <ExpenseItem />
      <ExpenseItem />
    </div>
  )
}

export default Expenses