import { ColumnDef } from "@tanstack/react-table";
import { DataItem } from "./typical/types";


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
];

