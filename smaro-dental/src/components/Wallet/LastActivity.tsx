
const LastActivity = () => {
  return (
    <div style={{boxShadow:"0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}} className="w-[35.188rem] p-4 h-[36.313rem] rounded-[14px] bg-white">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#54595E]">Last Activity</h1>
            <h1 className="text-blue-400 text-[18px] font-normal">See All</h1>
        </div>
        <div className="mt-16">
            <Users/>
        </div>
    </div>
  )
}

export default LastActivity

const Users = () => {
    return (
        <div className="flex items-center gap-x-4">
            <div className="!min-w-[3.875rem]  !h-[3.625rem] bg-[#CFE2FF] text-[32px] flex justify-center items-center rounded-[10px] text-[#0A58CA] text-center">
                    R
            </div>
            <div className="flex items-center border-b-2 pr-4 border-gray-200 pb-3 justify-between w-full">
                <div className="text-[#54595E]">
                    <h1 className="text-[18px] font-normal">Rajashekar</h1>
                    <div className="flex items-center gap-x-1 text-[14px]">
                        <p className="text-green-400">Sent</p>
                        <p>on 3 Dec 2023 @ 4:28 pm</p>
                    </div>
                </div>
                <p className="text-[20px] font-semibold">₹495</p>
            </div>
        </div>
    )
}
