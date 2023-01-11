import React from 'react'

const FinanceSidebar = ({setModal}) => {
  return (
    <div className='finance-sidebar'>
      <div className='finance-tips'>
        <h3>Financial Tip</h3>
        "Clean your room, save some money..."
      </div>
      <div className='finance-utils'>
        <h2>Utilities</h2>
        <button onClick={e => {e.preventDefault(); setModal({style:{display:'block'}, type:'add-goal'})}}>Add Finance Goal</button>
      </div>
    </div>
  )
}

export default FinanceSidebar