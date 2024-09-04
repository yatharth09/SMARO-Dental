import React, { useState } from "react";
import Layout from "../shared/Layout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import Overview from "../components/Wallet/Overview";
import CreditUsage from "../components/Wallet/CreditUsage";
import LastActivity from "../components/Wallet/LastActivity";

import AddCreditsModal from "../components/Wallet/AddCreditsModal";

import arrowUpTiltedIcon from "../assets/svg/arrow-down-circle.svg";
import arrowDownTiltedIcon from "../assets/svg/arrow-down-circles.svg";

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,BarElement,Title);

const Wallet:React.FC = () => {
  const [show,setShow] = useState(false)
  return (
    <Layout>
      <div className="px-10 py-5 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#54595E]">Wallet Overview</h1>
          <button onClick={()=>setShow(true)}
                className="text-base font-semibold leading-[18px] w-min h-min px-[1.5rem] py-4 min-w-max text-white rounded-[6px] bg-[#0D6EFD]">
                Add Credits
            </button>
        </div>
        <div className="mt-10 flex flex-wrap justify-between">
              <CurrentCredit/>
              <div className="flex flex-col gap-y-2">
                <Box icon={arrowUpTiltedIcon} label="Locked"  price="4,250"/>
                <Box icon={arrowDownTiltedIcon} label="Spend"  price="2,175"/>
              </div>
              <CreditUsage />
        </div>
        <div className="mt-10 flex flex-wrap justify-between">
        <Overview/>
        <LastActivity/>
        </div>
      </div>
    {
      show && <AddCreditsModal show={show} setShow={setShow}/>
    }
    </Layout>
  )
}

export default Wallet




const CurrentCredit:React.FC = () => {
  return (
    <div className="w-[38.938rem] h-[15.938rem] bg-[#0D6EFD] rounded-[14px] flex flex-col justify-center pl-20">
        <p className="text-[28px] font-bold text-white">Current Credit</p>
        <h1 className="text-5xl font-normal text-white">₹ 1,50,000,00</h1>
    </div>
  )
}

interface BoxProps {
    icon:string;
    label:string;
    price:string;
}

const Box:React.FC<BoxProps> = ({icon,label,price}) => {
  return (
    <div style={{boxShadow: "0px 1px 4px 0px #0000001A"}} className="w-[20.188rem] bg-white pl-5 gap-x-4 rounded-[14px] flex items-center h-[7.75rem] ">
        <img src={icon} alt="" />
        <div>
          <p className="text-[18px] font-normal">{label}</p>
          <h1 className="text-[24px] font-semibold">₹{price}</h1>
        </div>
    </div>
  )
}



