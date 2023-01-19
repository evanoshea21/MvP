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

const bgColorsType = [
    '#1f8e13', //essential (ACCENT) DONE
    '#f73939', //non-essential DONE
    '#d70c0c', //libaility DONE
    '#179409', //asset
    'rgb(255, 205, 86)', //other
];
const bgColorsCategory = [
    'rgb(255, 205, 86)', //subscription [blue]
    '#FF6E31', //Housing (ACCENT color) [orange] DONE
    '#31a9ff', //Auto DONE
    '#1f8e13', //Living Costs DONE
    '#179409', //Savings/investments DONE
    '#f90101', //Debt payment DONE
    'rgb(255, 205, 86)', //other
];
const PieChart = ({pieDataType, typeTotal, categoryTotal}) => {
  const [userData, setUserData] = React.useState({
    labels: data.map(data => data.category),
    datasets: [{
      label: '$',
      data: data.map(data => data.amount),
      backgroundColor: [...bgColorsType]
    }]
  })

  React.useEffect(() => {
    // console.log('CAT TOTAL change in PIE', categoryTotal);
    var categKeys = Object.keys(categoryTotal);
    var categVals = Object.values(categoryTotal);
    var typeKeys = Object.keys(typeTotal);
    var typeVals = Object.values(typeTotal);

    console.log('KEYS type/category\n', typeKeys, '\n', categKeys);

    var dataSet = pieDataType === 'type' ? [typeKeys, typeVals] : [categKeys, categVals];
    var dataColors = pieDataType === 'type' ? bgColorsType : bgColorsCategory;
    setUserData({
      labels: dataSet[0],
      datasets: [{
        label: '$',
        data: dataSet[1],
        backgroundColor: dataColors
      }]
    })
  }, [pieDataType, typeTotal]);


  return (
    <div style={{width: 400, border: '0px solid red'}}>
      <Pie
        // options={...}
        data={userData}
        // {...props}
      />
    </div>
  )
}

export default PieChart