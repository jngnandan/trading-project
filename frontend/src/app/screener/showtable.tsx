"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Header from '../header'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type Payment = {
  id: number;
  ticker: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  Company: string;
  Sector: string;
  Industry: string;
  Country: string;
  Market: number;
  PE: number;
  Price: number;
  Change: string;
  Volume: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "ticker",
    header: "ticker",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ticker")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-right">Email</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "Company",
    header: () => <div className="text-right">Company</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Company")}</div>,
  },
  {
    accessorKey: "Sector",
    header: () => <div className="text-right">Sector</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Sector")}</div>,
  },
  {
    accessorKey: "Industry",
    header: () => <div className="text-right">Industry</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Industry")}</div>,
  },
  {
    accessorKey: "Country",
    header: () => <div className="text-right">Country</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Country")}</div>,
  },
  {
    accessorKey: "Market",
    header: () => <div className="text-right">Market</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Market")}</div>,
  },
  {
    accessorKey: "PE",
    header: () => <div className="text-right">PE</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("PE")}</div>,
  },
  {
    accessorKey: "Price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Price")}</div>,
  },
  {
    accessorKey: "Change",
    header: () => <div className="text-right">Change</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Change")}</div>,
  },
  {
    accessorKey: "Volume",
    header: () => <div className="text-right">Volume</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Volume"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
 
export function DataTableDemo() {
  const [stocks, setStocks] = useState([]);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('http://localhost:8000/stocks');
        const data = await response.json();
        setStocks(data.stocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);

  const mappedData = stocks.map((stock) => ({
    id: stock.id,
    ticker: stock.ticker,
    amount: stock.amount,
    status: stock.status,
    email: stock.email,
    Company: stock.company, // Assuming the property name in the data is 'company'
    Sector: stock.sector, // Assuming the property name in the data is 'sector'
    Industry: stock.industry, // Assuming the property name in the data is 'industry'
    Country: stock.country, // Assuming the property name in the data is 'country'
    Market: stock.market,
    PE: stock.pe,
    Price: stock.price,
    Change: stock.change,
    Volume: stock.volume,
  }));

  const table = useReactTable({
    data: mappedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Companies..."
          value={(table.getColumn("Company")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Company")?.setFilterValue(event.target.value)
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
                  data-state={row.getIsSelected() && "selected"}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}