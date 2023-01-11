import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import React from 'react';

var data = [
  {category: 'subscriptions', amount: 200},
  {category: 'auto', amount: 200},
  {category: 'living costs', amount: 600},
  {category: 'savings', amount: 200},
  {category: 'investments', amount: 100}
];
const PieChart = (props) => {
  const [userData, setUserData] = React.useState({
    labels: data.map(data => data.category),
    datasets: [{
      label: '$',
      data: data.map(data => data.amount)
    }]
  })

  return (
    <div style={{width: 400}}>
      <Pie
        // options={...}
        data={userData}
        // {...props}
      />
    </div>
  )
}

export default PieChart