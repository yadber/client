import React from "react";

import ReactApexChart from "react-apexcharts";

export default function StackedColumn({ allEmployee, allMuummee }) {
  const allMuummeeArray = allMuummee.map((val) => val.muummee);

  

  var series = [
    {
      name: "Employee",
      data: [44, 55, 41, 67, 22, 143],
    },
  ];

  const options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: allMuummeeArray ? allMuummeeArray : [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <div className="text-red-500">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}
