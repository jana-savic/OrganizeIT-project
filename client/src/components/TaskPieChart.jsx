import React from 'react';
import { RadialChart } from 'react-vis';

const TaskPieChart = ({ tasks }) => {
  // Count tasks in different progress categories
  const countDone = tasks.filter(task => task.progress === 100).length;
  const countInProgress = tasks.filter(task => task.progress >= 20 && task.progress < 100).length;
  const countStart = tasks.filter(task => task.progress >= 0 && task.progress < 20).length;

  // Data for the pie chart
  const data = [
    { angle: countDone, label: `Done: ${countDone}`, color:'rgb(255,115,148)'},
    { angle: countInProgress, label: `In Progress: ${countInProgress}`, color:'rgb(255,175,163)'},
    { angle: countStart, label:`Start: ${countStart}`, color:'rgb(255,214,161)'},
  ];

  const labelStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  // Center the chart
  const chartStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px', // Set an appropriate height for your design
  };

  return (
    <div style={chartStyle}>
      <RadialChart
        data={data}
        width={200}
        height={200}
        showLabels
        labelsStyle={labelStyle}
        labelsRadiusMultiplier={1.2} // Adjust this multiplier for label position
        colorType="literal"
      />
    </div>
  );
};

export default TaskPieChart;