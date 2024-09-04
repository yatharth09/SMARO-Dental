import { Doughnut } from "react-chartjs-2";


const CreditUsage = () => {
    const options = {
      cutout: "65%", 
      plugins: {
        legend: {
          display: false,
        },
      },
    };
    const data = {
      datasets: [
        {
          label: "Credit usage",
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            "#FFC107",
            "#0D6EFD",
            "#FC5A5A",
            "#343A40",
            "#17A2B8",
          ],
          borderColor: [
            "#FFC107",
            "#0D6EFD",
            "#FC5A5A",
            "#343A40",
            "#17A2B8",
          ],
        },
      ],
    };
    return (
      <div style={{boxShadow: "0px 1px 4px 0px #0000001A"}} className="w-[35.188rem] bg-white p-5 rounded-[14px] h-[16.688rem] ">
          <h1 className="text-2xl text-[#54595E] font-semibold">Credit Usage</h1>
          <div className="flex items-center gap-x-20">
            <div className="grid grid-cols-2  gap-2">
              <SmallBox color="#FFC107" text="MRI"/>
              <SmallBox color="#0D6EFD" text="Scan"/>
              <SmallBox color="#FC5A5A" text="CT"/>
              <SmallBox color="#343A40" text="Other"/>
              <SmallBox color="#17A2B8" text="X-ray"/>
            </div>
            <div className="w-[10.438rem] h-[10.438rem]">
            <Doughnut data={data} options={options} />
            </div>
          </div>
      </div>
    )
  }

  export default CreditUsage

  const SmallBox = ({color,text}:{color:string,text:string}) => {
    return (
      <div className="flex items-center gap-x-3">
        <div style={{backgroundColor:color}} className="w-4 h-4 rounded-[4px] "/>
        <p className="text-[18px] font-normal">{text}</p>
      </div>
    )
  }
