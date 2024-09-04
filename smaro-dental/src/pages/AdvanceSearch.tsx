import Layout from "../shared/Layout"
import DateRangePicker from "../components/Common/DateRangePicker"
import Select from "../components/Common/Select"
import TableContainer from "../components/Table/TableContainer"
import TableView from "../components/AdvanceSearch/TableView"


const AdvanceSearch = () => {

  return (
    <Layout>
          <div className="flex flex-col items-center pt-[1.125rem]">
        <div className="flex w-full justify-between  items-center px-[31px] gap-6">
            <div style={{boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}}
                 className="px-2 h-full py-4 w-full flex items-start pl-[20px] gap-6 flex-wrap bg-white rounded-[12px] ">
                <DateRangePicker width="15" value={{startDate:"",endDate:""}} setValue={()=>{}}/>
                <Select label="Report Type" width="15"   onChange={()=>{}} options={[]}/>
                <Select label="Status" width="15" onChange={()=>{}} options={[]}/>
                <Select label="Diagnostics Types" width="15" onChange={()=>{}} options={[]}/>
                <Select label="Diagnostics Types " width="15"  onChange={()=>{}} options={[]}/>
                <Select label="Referring Physicians" width="15"  onChange={()=>{}} options={[]}/>
                <Select label="Medical Conditions" width="15"  onChange={()=>{}} options={[]}/>
                <input type="text" className="w-full h-[38px] px-4 border border-[#DEE2E6] rounded-[6px] outline-none " placeholder="Keyword" />

            </div>
            <button
                className="text-base font-semibold leading-[18px] w-min h-min px-[1.5rem] py-4 min-w-max text-white rounded-[6px] bg-[#0D6EFD]">
                Search
            </button>
        </div>
      <div className="px-[1.938rem] mt-3 w-full">
          <TableContainer>
            <TableView/>
          </TableContainer>
      </div>
    </div>

    </Layout>
  )
}

export default AdvanceSearch
