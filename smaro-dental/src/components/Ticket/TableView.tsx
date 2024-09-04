import React, {useEffect, useState} from "react";
import TableContainer from "../Branch/TableContainer";
import {
    ColumnDef,
    FilterFn,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel, flexRender, PaginationState
} from "@tanstack/react-table";
import {rankItem} from "@tanstack/match-sorter-utils";
import useSearch from "@/hooks/useSearch";
import { TablePagination } from "../Table";
import StatusLabel from "./StatusLabel";
import { isStr } from "@/utils/utils"
import Actions from "./Actions";
import {ConversationTypes} from "@/types";
import {useNavigate} from "react-router-dom";

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

    interface OwnProps  {
        list : ConversationTypes[]
    }
    type Props = OwnProps;
    const TicketTableView: React.FC<Props> = ({list}) => {
        const navigate = useNavigate();
         const {query,onSetSearch} = useSearch();
          const [options] = useState({
            status: "",
            clientType: "",
            date: {startDate: "", endDate: ""}
        });
        const [pagination, setPagination] = React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        });

        const navigateTo = (item:ConversationTypes)=>{
            navigate("/messaging",{
                state: {
                    conversation: item
                }
            });
        }


            const columns:any = React.useMemo<ColumnDef<ConversationTypes>[]>(()=>[
             {
                accessorKey:"id",
                header: "#",
                cell: info=>info.getValue()
            },
            {
                accessorKey:"chat_conversation",
                header: "Ticket",
                cell: info=>info.getValue()
            },
             {
                accessorKey:"reference_id",
                header: "Reference",
                 filterFn: exactMatchFilter,
                cell:info=>info.getValue()
            },

            {
                accessorKey:"inserted_time",
                header:"Created At",
                 enableSorting:false,
                 filterFn: dateRangeFilter,
                cell: info=>{
                         const datetime = info.row.original.inserted_time;
                         const date = datetime? new Date(datetime)?.toLocaleDateString() : "";
                         const time = datetime? new Date(datetime)?.toLocaleTimeString() : "";

                     return (<>
                             <p>{date}</p>
                             <p className="text-sm text-[#54595E]">{time}</p>
                          </>)
                }

            },
            {
                accessorKey:"estatus",
                header: "Status",
                filterFn: exactMatchFilter,
                cell:info=><StatusLabel status={info.row.original.estatus}/>
            },
             {
                accessorKey:"id",
                header: "Actions",
                cell:(info)=>
                    <div className="flex text-center items-center  gap-x-4">
                      <Actions item={info.row.original} onPressActionBtn={navigateTo} />
                    </div>
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
                         if(options.status!==undefined && options.status!==null )
                            {
                                row.column.setFilterValue(options.status);
                            }
                    }
                      if(row.column.id==="inserted_time")
                    {
                         if(isStr(options.date.startDate) && isStr(options.date.endDate))
                            {
                                row.column.setFilterValue(options.date);
                            }
                    }
                })
            });
        }, [options, table]);

        return (
            <>

                <div className="px-[1.938rem] mt-3 w-full">
                    <TableContainer>
                <table className="table-auto border-collapse">
                            <thead className="text-sm font-bold border">
                            {
                                table.getHeaderGroups().map(headerGroup=><tr key={Math.random()+headerGroup.id} >
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









export default TicketTableView;
