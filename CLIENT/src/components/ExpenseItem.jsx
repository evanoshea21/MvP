import React from 'react'

const ExpenseItem = (props) => {
  return (
    <div className='expense-item'>
      <div>
        {/* <span>TITLE</span> */}
        <span>Netflix</span>
      </div>
      <div>
        {/* <span>CATEGORY</span> */}
        <span>Subscription</span>
      </div>
      <div>
        {/* <span>TYPE</span> */}
        <span>Discretionary</span>
      </div>
      <div>
        {/* <span>DUE DATE</span> */}
        <span>18th</span>
      </div>
      <div>
        {/* <span>AMOUNT</span> */}
        <span>$ 12</span>
      </div>
        {/* <button>Delete</button> */}
        <i class="fa-solid fa-x"></i>
        <i class="fa-solid fa-pencil"></i>
    </div>
  )
}

export default ExpenseItem