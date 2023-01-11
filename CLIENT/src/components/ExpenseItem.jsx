import React from 'react'

const ExpenseItem = ({e}) => {

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
        <i className="fa-solid fa-x"></i>
        <i className="fa-solid fa-pencil"></i>
    </div>
  )
}

export default ExpenseItem