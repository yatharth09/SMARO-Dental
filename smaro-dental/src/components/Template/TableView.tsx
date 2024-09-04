import React, {useEffect, useState} from "react";
import "./TableView.css";

import TableContainer from "../Table/TableContainer";
import {Link} from "react-router-dom";
import DateRangePicker from "../Common/DateRangePicker";

import {TemplateTypes} from "@/types";
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
import TablePagination from "../Table/TablePagination";
import StatusLabel from "./StatusLabel";
import {isStr} from "@/utils/utils";
import CustomSelectBox from "../Common/CustomSelectBox";
import Actions from "./Actions";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)
    // Store the itemRank info
    addMeta({itemRank,})
    // Return if the item should be filtered in/out
    return itemRank.passed
}
const exactMatchFilter = (row: any, id: any, filterValue: any) => {
    return row.original[id] === filterValue;
};

const dateRangeFilter = (row: any, id: any, filterValue: any) => {
    const {startDate, endDate} = filterValue;
    const date = new Date(row.original[id]).getTime();
    const start_date = new Date(startDate).getTime();
    const end_date = new Date(endDate).getTime();
    return start_date <= date && date <= end_date;
}

interface OwnProps {
    list: TemplateTypes[]
    onActionBtnPress:(action:any,params:any) => void
}

type Props = OwnProps;
const TableView: React.FC<Props> = ({list,onActionBtnPress}) => {
    const {query, onSetSearch} = useSearch();
    const [options, setOptions] = useState({
        status: "",
        clientType: "",
        date: {startDate: "", endDate: ""}
    });
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const onChangeOption = (key: string, text: any) => {
        setOptions({...options, ...{[key]: text}});
    }
    const status_options = [
        {label: "Select Status", value: "", color: "black"},
        {label: "Active", value: 1, color: "black"},
        {label: "In Active", value: 0, color: "black"},
    ]



    const onChangeDateRange = (value: any) => {
        setOptions({...options, ...{date: value}});
    }

    const columns: any = React.useMemo<ColumnDef<TemplateTypes>[]>(() => [
        {
            accessorKey: "id",
            header: "#",
            cell: info => info.getValue()
        },
        {
            accessorKey: "report_template_name",
            header: "Name",
            cell: info => info.getValue()
        },
        {
            accessorKey: "test_type",
            header: "Category",
            filterFn: exactMatchFilter,
            cell: info => info.getValue()
        },
        {
            accessorKey: "short_code",
            header: "Modality",
            enableSorting: false,
            cell: info => <><p>{info.row.original.short_code}</p>
                <p className="text-xs text-[#54595E]">{info.row.original.test_sub_type}</p></>
        },
        {
            accessorKey: "inserted_time",
            header: "Created At",
            enableSorting: false,
            filterFn: dateRangeFilter,
            cell: info => {
                const datetime = info.row.original.inserted_time;
                const date = datetime ? new Date(datetime)?.toLocaleDateString() : "";
                const time = datetime ? new Date(datetime)?.toLocaleTimeString() : "";

                return (<>
                    <p>{date}</p>
                    <p className="text-sm text-[#54595E]">{time}</p>
                </>)
            }

        },
        {
            accessorKey: "estatus",
            header: "Status",
            filterFn: exactMatchFilter,
            cell: info => <StatusLabel status={info.row.original.estatus}/>
        },
        {
            accessorKey: "id",
            header: "Actions",
            cell: (info) =>
                <div className="flex text-center items-center  gap-x-4">
                    <Actions item={info.row.original} onPressActionBtn={onActionBtnPress}/>
                </div>
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], []);


    const table = useReactTable({
        data: list,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination: pagination,
            globalFilter: query,
        },
        filterFns: {
            fuzzy: fuzzyFilter,
            exactMatchFilter: exactMatchFilter,
            dateRangeFilter: dateRangeFilter
        },
        onGlobalFilterChange: onSetSearch,
        globalFilterFn: fuzzyFilter,
    });
    useEffect(() => {
        table.getHeaderGroups().map(headerGroup => {
            headerGroup.headers.map(row => {

                row.column.setFilterValue("");
                if (row.column.id === "estatus") {
                    if (options.status !== undefined && options.status !== null) {
                        row.column.setFilterValue(options.status);
                    }
                }
                if (row.column.id === "inserted_time") {
                    if (isStr(options.date.startDate) && isStr(options.date.endDate)) {
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
                    <DateRangePicker width="15" value={options.date} setValue={onChangeDateRange}/>
                    <CustomSelectBox
                        label="Status"
                        width={200}
                        options={status_options}
                        setValue={option => onChangeOption("status", option.value)}
                        value={options.status}
                    />

                </div>
                <Link to={"/templates/create-new-template"}>
                    <button
                        className="text-base font-semibold leading-[18px] w-min h-min px-[1.5rem] py-4 min-w-max text-white rounded-[6px] bg-[#0D6EFD]">
                        Create new Template
                    </button>
                </Link>
            </div>

            <div className="px-[1.938rem] mt-3 w-full">
                <TableContainer>
                    <table className="table-auto border-collapse">
                        <thead className="text-sm font-bold border">
                        {
                            table.getHeaderGroups().map(headerGroup => <tr key={Math.random() + headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => {
                                        return (<th key={Math.random() + header.id} {...{
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
                            table.getRowModel().rows.map(row => {
                                return (<tr key={Math.random() + row.id} className="h-[1.5rem] relative">
                                    {
                                        row.getVisibleCells().map(cell => {
                                            return (<td key={Math.random() + cell.id} className="px-1 text-sm">
                                                {
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
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






