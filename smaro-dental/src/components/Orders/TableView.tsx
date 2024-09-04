import React, {useEffect, useState} from "react";
import "./TableView.css";
import eyeIcon from "@/assets/svg/eye.svg"
import downloadIcon from "@/assets/svg/download.svg"
import messageIcon from "@/assets/svg/messagingIcon.svg"
import TableContainer from "../Branch/TableContainer";
import DateRangePicker from "../Common/DateRangePicker";
import useSearch from "@/hooks/useSearch";
import {PatientTypes} from "@/types";
import StatusLabel from "./StatusLabel";
import {
    ColumnDef,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    useReactTable
} from "@tanstack/react-table";
import {rankItem} from "@tanstack/match-sorter-utils";


import TablePagination from "../Table/TablePagination";
import { isValidString} from "@/utils/utils";
//import CustomSelectBox from "../Common/CustomSelectBox";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({itemRank,})
  // Return if the item should be filtered in/out
  return itemRank.passed
}
const exactMatchFilter = (row:any, id:any, filterValue:any) => {
  return row.original[id] === filterValue;
};

const  dateRangeFilter = (row:any, id:any, filterValue:any) =>{

    const {startDate,endDate} = filterValue;
    const date = new Date(row.original[id]).getTime();
    const start_date = new Date(startDate).getTime();
    const end_date = new Date(endDate).getTime();
    return start_date <= date && date <= end_date;
}

interface Props {
    list: PatientTypes[];
    onActionBtnPress:(action:string,item?:PatientTypes)=>void;
}

// const status_options = [
//     {label:'Select Status',value:'',color:'black'},
//     {label:'Active',value:1,color:'black'},
//     {label:'In-Active',value:0,color:'black'},
// ]

const TableView: React.FC<Props> = ({list,onActionBtnPress}) => {

      const {query,onSetSearch} = useSearch();


       const [options,setOptions] = useState({
        status: "",
        date: {
          startDate: "",
           endDate: ""
        }
      });

      const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

        const columns:any = React.useMemo<ColumnDef<PatientTypes>[]>(()=>[
         {
            accessorKey:"id",
            header: "#",
            cell: info=>info.getValue()
        },
        {
            accessorKey:"inserted_time",
            header: "Test Date",
            filterFn: dateRangeFilter,
           cell: info=><>
                        <p>{new Date(info.row.original.inserted_time)?.toLocaleDateString()}</p>
                        <p className="text-sm text-[#54595E]">{new Date(info.row.original.inserted_time).toLocaleTimeString()}</p>
                     </>
        },
         {
            accessorKey:"test_type",
            header: "Test Type",
            cell: info=>info.getValue()
        },
        {
            accessorKey:"estatus",
            header: "Status",
            cell:info=><StatusLabel status={info.row.original.estatus}/>
        },
          {
            accessorKey:"patient_name",
            header: "Patient Name",
            cell:info=>info.getValue()
        },
        {
            accessorKey:"doctor_name",
            header: "Referred By",
            cell:info=>  info.getValue()
        },
        {
            accessorKey:"results_type",
            header: "Result",
            cell:info=>  info.getValue()
        },
        {
            accessorKey:"comments",
            header: "Comments",
            cell:info=>  info.getValue()
        },
        {
            accessorKey:"id",
            header: "Actions",
            cell:info=><>
                 <div className="flex text-center items-center justify-center gap-x-2">
                    <img onClick={()=>onActionBtnPress("view",info.row.original)} className="cursor-pointer" src={eyeIcon} alt="action button"/>
                    <img onClick={()=>onActionBtnPress("message",info.row.original)} className="cursor-pointer" src={messageIcon} alt="action button"/>
                    <img onClick={()=>onActionBtnPress("delete",info.row.original)} className="cursor-pointer" src={downloadIcon} alt="action button"/>
                </div>
            </>
        }
              // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[]);

//    const  onChangeOption = (key:string,text:any)=>{
//         setOptions({...options,...{[key]:text}});
//     }
     const  onChangeDateRange = (value:any)=>{
        setOptions({...options,...{date:value}});
    }


     const table = useReactTable({
        data: list,
        columns: columns,
        getCoreRowModel:getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination:pagination,
            globalFilter:query,
        },
         filterFns: {
          fuzzy: fuzzyFilter,
          exactMatchFilter:exactMatchFilter,
          dateRangeFilter:dateRangeFilter
      },
    onGlobalFilterChange: onSetSearch,
    globalFilterFn: fuzzyFilter,
    });

     useEffect(() => {
    table.getHeaderGroups().map(headerGroup=>{
        headerGroup.headers.map(row=>{

             row.column.setFilterValue("");
             if(row.column.id==="estatus")
            {
                 if(options.status!==undefined && options.status!==null && options.status!=="")
                    {
                        row.column.setFilterValue(options.status);
                    }
            }
              if(row.column.id==="inserted_time")
            {
                 if(isValidString(options.date.startDate) && isValidString(options.date.endDate))
                    {
                        row.column.setFilterValue(options.date);
                    }
            }
        })
    });
}, [options, table]);


    return (
        <>
         <div className="flex w-full justify-between  items-center px-[31px] gap-6">
                  <div style={{boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}}
                       className="px-2 h-full py-4 w-full flex items-start pl-[10px] gap-1 flex-wrap bg-white rounded-[12px] ">
                      <DateRangePicker
                          value={options.date}
                          setValue={onChangeDateRange}
                          width="15"
                      />
                      {/* <CustomSelectBox
                          label="Status"
                          width={200}
                          //options={status_options}
                          setValue={option=>onChangeOption('status',option.value)}
                          value={options.status}
                      /> */}
                  </div>
                  <button onClick={()=>onActionBtnPress("add",undefined)}
                      className="text-base font-semibold leading-[18px] w-min h-min px-[1.5rem] py-4 min-w-max text-white rounded-[6px] bg-[#0D6EFD]">
                      Add New Patient
                  </button>
              </div>
            <div className="px-[1.938rem] mt-3 w-full">
                <TableContainer>
                     <table className="table-auto border-collapse">
                        <thead className="text-xs border">
                        {
                            table.getHeaderGroups().map(headerGroup=><tr key={Math.random()+headerGroup.id} className="h-[68.7px]">
                                {
                                    headerGroup.headers.map((header)=> {
                                        return ( <th key={Math.random()+header.id} {...{
                            className: header.column.getCanSort()
                              ? "px-2 bg-white cursor-pointer select-none"
                              : "px-2 bg-white cursor-pointer",
                            onClick: header.column.getToggleSortingHandler(),
                          }}>{flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}</th>)
                                    })
                                }
                            </tr>)
                        }
                        </thead>
                        <tbody className="border">
                        {
                            table.getRowModel().rows.map(row=>{
                                return (<tr key={Math.random()+row.id} className="h-[1.5rem] relative">
                                    {
                                        row.getVisibleCells().map(cell=>{
                                            return (<td key={Math.random()+cell.id} className="px-1 text-sm">
                                                {
                                                    flexRender(cell.column.columnDef.cell,cell.getContext())
                                                }
                                            </td>)
                                        })
                                    }
                                </tr>)
                            })
                        }
                        </tbody>
                  </table>
                       <TablePagination table={table}/>
                    </TableContainer>
            </div>
</>
    );
};
export default TableView;



