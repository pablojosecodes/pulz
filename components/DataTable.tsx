"use client"

import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



export type DataItem = {
    id: string;
    url: string;
    pathname: string;
    type: string;
    country?: string;
    city?: string;
    timestamp: string;
    originatorid: string;
};

function formatRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const timeString = formatter.format(date);

    const diff = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const daysDiff = Math.floor(diff / oneDay);

    if (daysDiff === 0) {
        return `Today, ${timeString}`;
    } else if (daysDiff === 1) {
        return `Yesterday, ${timeString}`;
    } else {
        return `${daysDiff} days ago, ${timeString}`;
    }
}



export const columns: ColumnDef<DataItem>[] = [
    {
        accessorKey: "url",
        header: "Domain",
        cell: ({ row }) => <div>{
            (row.getValue("url") as string) &&
            (row.getValue("url") as string).split("://").length > 1 &&

            (row.getValue("url") as string).split("://")[1].slice(0, -1)}</div>,
    },
    {
        accessorKey: "pathname",
        header: "pathname",
        cell: ({ row }) => <div>{
            (row.getValue("url") as string) &&
            (row.getValue("url") as string).split("://").length > 1 &&

            (row.getValue("url") as string).split("://")[1].split("/").length > 1 ?  (row.getValue("url") as string).split("://")[1].split("/")[1] : (row.getValue("url") as string).split("://")[1].split("/")[0] + "/"}</div>,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
        accessorKey: "country",
        header: "Country",
        cell: ({ row }) => <div>{row.getValue("country")}</div>,
    },
    {
        accessorKey: "city",
        header: "City",
        cell: ({ row }) => <div>{row.getValue("city")}</div>,
    },
    {
        accessorKey: "timestamp",
        header: "Timestamp",
        cell: ({ row }) => <div>{formatRelativeTime(row.getValue("timestamp"))}</div>,
    },
    {
        accessorKey: "Session ID",
        header: "Session ID",
        cell: ({ row }) => <div>{row.getValue("originatorid")}</div>,
    },
    // ... (any other columns you need)
];


type DataTableProps = {
    data: DataItem[];
};

export function DataTable({ data }: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})



    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,

        state: {
            sorting,
            columnFilters,
            columnVisibility,

        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter pathnames..."
                    value={(table.getColumn("pathname")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("pathname")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                // data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>


        </div>
    )
}
