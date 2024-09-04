import React, {useEffect, useState} from "react";
import "./TableView.css";
import threeDots from "@/../src/assets/svg/three-dots.svg"

import {
    FilterFn,
    flexRender,
    ColumnDef,
    useReactTable,
    PaginationState,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import {FormikValues} from "formik";
import {rankItem} from "@tanstack/match-sorter-utils"



import ActionModal from "./ActionModal";
import TableContainer from "./TableContainer";
import StatusOption from "./Options/StatusOption";
import CustomDateRangePicker from "./Options/CustomDateRangePicker";

import {DiagnosticCenter} from "@/types";
import useSearch from "@/hooks/useSearch";
import {isValidString, strcmp} from "@/utils/utils";
import classNames from "classnames";
import {CaretDownIcon,CaretUpIcon,TablePagination} from "../Table";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({itemRank,})
  // Return if the item should be filtered in/out
  return itemRank.passed
}

interface Props {
    branch:DiagnosticCenter | FormikValues;
    setBranch:(args:DiagnosticCenter|FormikValues)=>void;
    list: DiagnosticCenter[];
    onPressActionBtn:(type:"create"|"edit"|"delete")=>void;
}
const StatusLabel = ({label, color}: { label: string, color: string }) => {
    return (
        <p style={{backgroundColor: color}}
           className="min-w-[80px] max-w-[90px] h-[26px] text-[14px] font-semibold p-2 flex items-center justify-center rounded-[12px]">
            {label}
        </p>
    )
}

const statusFilter = (row:any, id:any, filterValue:any) => {
  return strcmp(row.original[id]) === strcmp(filterValue);
};

const  dateRangeFilter = (row:any, id:any, filterValue:any) =>{
    const {startDate,endDate} = filterValue;
    const date = new Date(row.original[id]).getTime();
    const start_date = new Date(startDate).getTime();
    const end_date = new Date(endDate).getTime();
    return start_date <= date && date <= end_date;
}

const TableView: React.FC<Props> = ({list,branch,setBranch,onPressActionBtn}) => {

    const {query,onSetSearch} = useSearch();

  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const [showActionModal,setShowActionModal]  = useState(false);
   const [options,setOptions] = useState({
        status:"",
        reportType:"",
        diagnosticType:"",
       date:{
            startDate:"",
            endDate:"",
        }
    });

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const  onChangeStatus = (text:string)=>{
        setOptions({...options,...{status:text}});
    }

   const  onChangeDateRange = (value:any)=>{
        setOptions({...options,...{date:value}});
    }


      const handleActionBtnClick = (event: React.MouseEvent<HTMLButtonElement>,item:DiagnosticCenter) => {
        const buttonRect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ x: buttonRect.left-180, y: buttonRect.bottom });
        setShowActionModal(true);
        setBranch(item);
    };


    const columns:any = React.useMemo<ColumnDef<DiagnosticCenter>[]>(()=>[
         {
            accessorKey:"id",
            header: "#",
            cell: info=>info.getValue()
        },
        {
            accessorKey:"branch_name",
            header: "Diagnostic Name",
            cell: info=>info.getValue()
        },
         {
            accessorKey:"contact_no",
            header: "Contact",
            cell:info=><>
                                       <p>{info.row.original.contact_no}</p>
                                        <p className="text-xs text-[#54595E]">{info.row.original.email}</p>
                                      </>
        },
         {
            accessorKey:"branch_address",
            header: "Address",
            cell:info=><>{info.getValue()}</>
        },
          {
            accessorKey:"estatus",
            header: "Status",
            filterFn: statusFilter,
            cell:info=><>{info.getValue()===1 ?
                <StatusLabel color="#D1E7DD" label="Active"/> :
                <StatusLabel color="#F8D7DA" label="In Active"/>}</>
        },
         {
            accessorKey:"inserted_time",
            header: "Created on",
             filterFn:dateRangeFilter,
            cell:info=>{
                const dateTime:any = info.getValue();
                return (<>
                <p>{new Date(dateTime).toLocaleDateString()}</p>
                <p className="text-xs text-[#54595E]">{new Date(dateTime).toLocaleTimeString()}</p>
            </>)
            }
        },
         {
            accessorKey:"id",
            header: "Actions",
             cell:(info)=><button onClick={(e)=>handleActionBtnClick(e,info.row.original)}>
                        <img  className="cursor-pointer" src={threeDots} alt="alt"/>
                    </button>
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[]);

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
      statusFilter: statusFilter,
      dateRangeFilter: dateRangeFilter,
      },
    onGlobalFilterChange: onSetSearch,
    globalFilterFn: fuzzyFilter,
    });

    useEffect(() => {
    table.getHeaderGroups().map(headerGroup=>{
        headerGroup.headers.map(row=>{

             row.column.setFilterValue("");
            if(row.column.id==="available_equipment_types")
            {
                 if(isValidString(options.reportType))
                    {
                        row.column.setFilterValue(options.reportType);
                    }
            }

             if(row.column.id==="status")
            {
                 if(isValidString(options.status))
                    {
                        row.column.setFilterValue(options.status);
                    }
            }
              if(row.column.id==="created_at")
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
                         className="px-2 h-full py-4 w-full flex items-start pl-[20px] gap-6 flex-wrap bg-white rounded-[12px] ">
                        <CustomDateRangePicker value={options.date} setValue={onChangeDateRange} width="15"/>
                        <StatusOption
                            width="15"
                            onChange={onChangeStatus}
                            value={options.status}
                        />
                        <button
                        onClick={()=>onPressActionBtn("create")}
                        className="text-base font-semibold leading-[18px] w-min h-min px-[24px] py-2 min-w-max text-white rounded-[6px] bg-[#0D6EFD]">
                      + Add

                    </button>
                    </div>

                </div>

            <div className="flex flex-col w-full items-center pt-[10px] rounded-[12px]">
                    <TableContainer>
                     <table className="table-auto border-collapse">
                        <thead className="text-xs border">
                          {
                            table.getHeaderGroups().map(headerGroup=><tr key={Math.random()+headerGroup.id} className="h-[68.7px]">
                                {
                                    headerGroup.headers.map((header)=> {
                                        return ( <th scope="col" key={Math.random()+header.id} {...{className:classNames("px-2 bg-white cursor-pointer",header.column.getCanSort()?"select-none":"" ), onClick: header.column.getToggleSortingHandler(),}}>
                                            <div className="flex items-center">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{asc: <CaretUpIcon/>, desc: <CaretDownIcon/>,}[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        </th>)
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

            {
                showActionModal && <ActionModal
                                    item={branch}
                                    position={modalPosition}
                                    onActionBtnPress={onPressActionBtn}
                                    closeModal={setShowActionModal}
                                   />
            }
            </>
    );
};

export default TableView;



