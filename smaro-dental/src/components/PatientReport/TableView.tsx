import React, {Fragment, useEffect, useState} from "react";
import "./TableView.css"
import {ReportAnalysisTypes} from "@/types";
import {isNum, isStr, strcmp} from "@/utils/utils";

import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    FilterFn,
    PaginationState,
    flexRender
} from "@tanstack/react-table";

import {rankItem} from "@tanstack/match-sorter-utils";
import useSearch from "@/hooks/useSearch";


import CustomSelectBox from "../Common/CustomSelectBox";
import classNames from "classnames";
import {CaretUpIcon, CaretDownIcon, TablePagination} from "../Table";
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
const results_type_options =
    [
        {label: "Select Result", value: "", color: "black"},
        {label: "Normal", value: "Normal", color: "black"},
        {label: "Abnormal", value: "Abnormal", color: "black"},
        // {label:"Clear",value:"Clear",color:"black"},
    ]
const priority_options = [
    {label: "Select Priority", value: "", color: "black"},
    {label: "Emergency", value: "Emergency", color: "black"},
    // {label:"Medium",value:"Medium",color:"black"},
    {label: "Normal", value: "Normal", color: "black"},
]

const report_status_options =
    [
        {label: "Select Report status", value: "", color: "black"},
        {label: "Completed", value: "Completed", color: "black"},
        {label: "Pending", value: "Pending", color: "black"},
        {label: "In Progress", value: "Inprocess", color: "black"},
    ]

const UrgencyLevel = ({priority}: { priority: string }) => {
    let title: string;
    let style: NonNullable<unknown>;
    switch (priority) {
        case "Emergency":
            title = "Emergency";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#ff0000"
            }
            break;
        case "Normal":
            title = "Normal";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#006400"
            }
            break;
        default:
            title = "Not Started";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#6b7280"
            }
            break;

    }
    return (
        <div className="flex justify-center items-center w-[100px] h-[25px] rounded"
             style={style}>
            <p className="capitalize text-sm font-semibold">{title}</p>
        </div>
    )
}


const StatusLabel = ({label}: { label: string }) => {
    let title: string;
    let style: NonNullable<unknown>;
    switch (label) {
        case "Completed":
            title = "Completed";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#1d7413"
            }
            break;
        case "Pending":
            title = "Pending";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#fb112c"
            }
            break;
        case "Inprocess":
            title = "In Progress";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#039487"
            }
            break;
        default:
            title = "Not Yet Started";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#6b7280"
            }
            break;

    }
    return (
        <div className="flex px-2 justify-center items-center w-fit h-[25px] rounded"
             style={style}>
            <p className="capitalize text-sm min-w-max font-semibold">{title}</p>
        </div>
    )
}

const ResultType = ({label}: { label: string }) => {
    let title: string;
    let style: NonNullable<unknown>;
    switch (label) {
        case "Normal":
            title = "Normal";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#006b69"
            }
            break;
        case "Abnormal":
            title = "Abnormal";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#e60000"
            }
            break;
        case "Clear":
            title = "Clear";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#0040FA"
            }
            break;
        default:
            title = "Not Started";
            style = {
                color: "#FFFFFF",
                backgroundColor: "#6b7280"
            }
            break;

    }
    return (
        <div className="flex px-2 justify-center items-center w-[100px] h-[25px] rounded"
             style={style}>
            <p className="capitalize text-sm font-semibold">{title}</p>
        </div>
    )
}

interface OwnProps {
    list: ReportAnalysisTypes[]
    onActionBtnPress: (action: "view" | "report-viewer" | "pdf-viewer", item: ReportAnalysisTypes) => void;
}

type Props = OwnProps;
const ViewTable: React.FC<Props> = ({list, onActionBtnPress}) => {

    const {query, onSetSearch} = useSearch();

    const [options, setOptions] = useState({
        status: "",
        modality: "",
        priority: "",
        results_type: "",
        report_status: "",
        date: {
            startDate: "",
            endDate: ""
        }
    });

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });


    const columns: any = React.useMemo<ColumnDef<ReportAnalysisTypes>[]>(() => [
        {
            accessorKey: "id",
            header: "Sr No",
            cell: info => info.row.index + 1
        },
        {
            accessorKey: "patient_name",
            header: "NAME/GENDER/AGE",
            enableSorting: false,
            cell: info => {
                const _g_class = strcmp(info.row.original.gender) === "male" ? "text-blue-400" : "text-pink-400";
                return (<Fragment><p className="font-normal capitalize">{info.row.original.patient_name}</p>
                    <p className={classNames("text-xs", _g_class)}>{info.row.original.gender} {isNum(info.row.original?.age) ? `| ${info.row.original?.age}` : ""}</p>
                </Fragment>)
            }
        },
        {
            accessorKey: "test_type",
            header: "Test",
            enableSorting: false,
            filterFn: exactMatchFilter,
            cell: info => <><p>{info.row.original.test_type}</p>
                <p className="text-xs text-blue-700">{info.row.original.test_sub_type}</p>
            </>
        },
        {
            accessorKey: "priority_type",
            header: "Priority Type",
            filterFn: exactMatchFilter,
            cell: (info) => <UrgencyLevel priority={info.row.original.priority_type}/>
        },
        {
            accessorKey: "results_type",
            header: "Result Type",
            filterFn: exactMatchFilter,
            cell: (info) => <ResultType label={info.row.original.results_type}/>

        },
        {
            accessorKey: "report_status",
            header: "Report Status",
            filterFn: exactMatchFilter,
            cell: (info) => <StatusLabel label={info.row.original.report_status}/>
        },
        {
            accessorKey: "id",
            header: "Actions",
            enableSorting: false,
            cell: info => <>
                <div className="flex text-center items-center justify-left gap-x-2">
                    <Actions item={info.row.original} onPressActionBtn={onActionBtnPress}/>
                </div>
            </>
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


    const onChangeOption = (key: string, text: any) => {
        setOptions({...options, ...{[key]: text}});
    }


    useEffect(() => {
        table.getHeaderGroups().map(headerGroup => {
            headerGroup.headers.map(row => {

                row.column.setFilterValue("");
                if (row.column.id === "estatus") {
                    if (options.status !== undefined && options.status !== null && options.status !== "") {
                        row.column.setFilterValue(options.status);
                    }
                }
                if (row.column.id === "report_status") {
                    if (options.report_status !== undefined && options.report_status !== null && options.report_status !== "") {
                        row.column.setFilterValue(options.report_status);
                    }
                }
                if (row.column.id === "test_type") {
                    if (options.modality !== undefined && options.modality !== null && options.modality !== "") {
                        row.column.setFilterValue(options.modality);
                    }
                }
                if (row.column.id === "priority_type") {
                    if (options.priority !== undefined && options.priority !== null && options.priority !== "") {
                        row.column.setFilterValue(options.priority);
                    }
                }
                if (row.column.id === "inserted_time") {
                    if (isStr(options.date.startDate) && isStr(options.date.endDate)) {
                        row.column.setFilterValue(options.date);
                    }
                }
                if (row.column.id === "results_type") {
                    if (options.results_type !== undefined && options.results_type !== null && options.results_type !== "") {
                        row.column.setFilterValue(options.results_type);
                    }
                }
            })
        });
    }, [options, table]);


    return (
        <Fragment>
            <div className="flex w-full justify-start my-3  items-center gap-3">
                <div
                    className="px-2 h-full py-4 w-full flex justify-items-start pl-[10px] gap-x-3 flex-wrap bg-white rounded-[12px] ">

                    <CustomSelectBox
                        label="Result Type"
                        width={250}
                        options={results_type_options}
                        setValue={option => onChangeOption("results_type", option.value)}
                        value={options.results_type}
                    />
                    <CustomSelectBox
                        label="Select Priority"
                        width={250}
                        options={priority_options}
                        setValue={option => onChangeOption("priority", option.value)}
                        value={options.priority}
                    />
                    <CustomSelectBox
                        label="Report Status"
                        width={250}
                        options={report_status_options}
                        setValue={option => onChangeOption("report_status", option.value)}
                        value={options.report_status}
                    />
                </div>
            </div>
            <table className="table-auto border-collapse">
                <thead className="text-sm font-bold border">
                {
                    table.getHeaderGroups().map(headerGroup => <tr key={Math.random() + headerGroup.id}>
                        {
                            headerGroup.headers.map((header) => {
                                return (<th scope="col" key={Math.random() + header.id} {...{
                                    className: classNames("px-2 bg-white cursor-pointer", header.column.getCanSort() ? "select-none" : ""),
                                    onClick: header.column.getToggleSortingHandler(),
                                }}>
                                    <div className="flex items-center">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: <CaretUpIcon/>,
                                            desc: <CaretDownIcon/>,
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                </th>)
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
                                    return (<td key={Math.random() + cell.id} className="px-3 text-sm">
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
                <tfoot>

                </tfoot>
            </table>
            <TablePagination table={table}/>
        </Fragment>
    );
};

export default ViewTable;
