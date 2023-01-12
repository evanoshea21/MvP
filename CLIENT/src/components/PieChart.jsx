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

var bgColors = [
    '#FF6E31',
    '#FF6E31', //HOUSING (biggest accent color)
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(255, 205, 86)',
    'rgb(255, 205, 86)',
    'rgb(255, 205, 86)',
];
const PieChart = ({categoryTotal}) => {
  const [userData, setUserData] = React.useState({
    labels: data.map(data => data.category),
    datasets: [{
      label: '$',
      data: data.map(data => data.amount),
      backgroundColor: [...bgColors]
    }]
  })

  React.useEffect(() => {
    // console.log('CAT TOTAL change in PIE', categoryTotal);
    var catKeys = Object.keys(categoryTotal);
    var catVals = Object.values(categoryTotal);
    // console.log('Cat Keys', catKeys);
    // console.log('Cat Vals', catVals);
    setUserData({
      labels: catKeys,
      datasets: [{
        label: '$',
        data: catVals
      }]
    })
  }, [categoryTotal])


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