import React, { useState } from "react"
import Layout from "../shared/Layout"
import DateRangePicker from "../components/Common/DateRangePicker";
import Select from "../components/Common/Select"
import TableContainer from "../components/Table/TableContainer";
import TasksTable from "../components/Orders/TableView";
import NewTasksModal from "../components/Orders/NewTasksModal";

const Tasks : React.FC = () => {
    const [newTaskModal,setNewTaskModal] = useState(false)
  return (
      <Layout>
          <div className="flex flex-col items-center pt-[1.125rem]">
              <div className="flex w-full justify-between  items-center px-[31px] gap-6">
                  <div style={{boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}}
                       className="px-2 h-full py-4 w-full flex items-start pl-[20px] gap-6 flex-wrap bg-white rounded-[12px] ">
                      <DateRangePicker width="15" value={{startDate:"",endDate:""}} setValue={()=>{}}/>
                      <Select label="Assignee" width="15" onChange={()=>{}} options={[]} />
                      <Select label="Status" width="15" onChange={()=>{}} options={[]}/>
                      <Select label="Priority" width="15" onChange={()=>{}} options={[]} />
                  </div>
                  <button
                  onClick={()=>setNewTaskModal(true)}
                      className="text-base font-semibold leading-[18px] w-min h-min px-[1.5rem] py-4 min-w-max text-white rounded-[6px] bg-[#0D6EFD]">
                      Create new task
                  </button>
              </div>
            <div className="px-[1.938rem] mt-3 w-full">
                <TableContainer>
                    <TasksTable list={[]} onActionBtnPress={()=>{}}/>
                </TableContainer>
            </div>
          </div>
          {
            <NewTasksModal show={newTaskModal} setShow={setNewTaskModal} />
          }
      </Layout>
  )
}

export default Tasks
