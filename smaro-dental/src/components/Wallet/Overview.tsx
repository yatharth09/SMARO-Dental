import { Bar } from "react-chartjs-2";
import cloudIcon from "@/assets/svg/cloud-download-fill.svg"
import faker from "faker"


const Overview = () => {
    const options = {
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom" as const,
          labels:{
            boxWidth:12,
            borderRadius:6,
            padding:50
          }
        },
      },
      indexAxis:"x" as const,
      elements: {
        bar: {
          borderRadius: {
            topLeft: 10,
            topRight: 10,
            bottomLeft: 0,
            bottomRight: 0,
          },
          barThickness: 0.1,
        },
      },

    };
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
    const data = {
      labels,
      datasets: [
        {
          label: "Expense",
          data: labels.map(() => faker.datatype.number({ min: 0, max: 400 })),
          backgroundColor: "#0C6AF0",
        },
        {
          label:"Income",
          data: labels.map(() => faker.datatype.number({ min: 0, max: 400 })),
          backgroundColor: "#06C5F9",
        },
      ],
    };
    return (
      <div style={{boxShadow:"0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}} className="w-[60.813rem] py-4 bg-white rounded-[14px]">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-2xl font-semibold text-[#54595E]">Overview</h1>
            <div className="flex items-center gap-x-2 py-2 px-3 cursor-pointer bg-gray-100 w-fit rounded-[8px]">
              <img src={cloudIcon} alt="" />
              <p className="text-base font-normal">Download report</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 mt-12 pb-4 border-b border-gray-200">
            <h1 className="text-[20px] font-normal">Show overview - 2024</h1>
            <div className="flex items-center gap-x-3 text-[20px] font-normal">
              <p>Week</p>
              <p className="text-blue-400">Month</p>
              <p>Year</p>
            </div>
          </div>
          <div className="px-3 mt-5">
          <Bar options={options}  data={data} />
          </div>
      </div>
    )
  }

  export default Overview
