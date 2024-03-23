"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../header';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Payment = {
  id: string;
  ticker: string;
  Company: string;
  Sector: string;
  Industry: string;
  Market: string;
  PE: number | null;
  EPS: number | null;
  MarketCap: number | null;
  BookValue: number | null;
  DividendYield: number | null;
  EBITDA: number | null;
  PriceToSalesTrailing12Months: number | null;
  FiftyTwoWeekHigh: number | null;
  FiftyTwoWeekLow: number | null;
  FiftyDayMovingAverage: number | null;
  TwoHundredDayMovingAverage: number | null;
  SharesOutstanding: number | null;
  Price: number | null;
  Quantity: number;
  Invested: number | null;
  Weight: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "ticker",
    header: "ticker",
    cell: ({ row }) => <div className="capitalize">{row.getValue("ticker")}</div>,
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
    accessorKey: "EPS",
    header: () => <div className="text-right">EPS</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("EPS")}</div>,
  },
  {
    accessorKey: "MarketCap",
    header: () => <div className="text-right">Market Cap</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("MarketCap")}</div>,
  },
  {
    accessorKey: "BookValue",
    header: () => <div className="text-right">Book Value</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("BookValue")}</div>,
  },
  {
    accessorKey: "DividendYield",
    header: () => <div className="text-right">Dividend Yield</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("DividendYield")}</div>,
  },
  {
    accessorKey: "EBITDA",
    header: () => <div className="text-right">EBITDA</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("EBITDA")}</div>,
  },
  {
    accessorKey: "PriceToSalesTrailing12Months",
    header: () => <div className="text-right">Price to Sales Trailing 12 Months</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("PriceToSalesTrailing12Months")}</div>,
  },
  {
    accessorKey: "FiftyTwoWeekHigh",
    header: () => <div className="text-right">52 Week High</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("FiftyTwoWeekHigh")}</div>,
  },
  {
    accessorKey: "FiftyTwoWeekLow",
    header: () => <div className="text-right">52 Week Low</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("FiftyTwoWeekLow")}</div>,
  },
  {
    accessorKey: "FiftyDayMovingAverage",
    header: () => <div className="text-right">50 Day Moving Average</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("FiftyDayMovingAverage")}</div>,
  },
  {
    accessorKey: "TwoHundredDayMovingAverage",
    header: () => <div className="text-right">200 Day Moving Average</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("TwoHundredDayMovingAverage")}</div>,
  },
  {
    accessorKey: "SharesOutstanding",
    header: () => <div className="text-right">Shares Outstanding</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("SharesOutstanding")}</div>,
  },
  {
    accessorKey: "Price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Price")}</div>,
  },
  {
    accessorKey: "Quantity",
    header: () => <div className="text-right">Quantity</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Quantity")}</div>,
  },
  {
    accessorKey: "Invested",
    header: () => <div className="text-right">Invested</div>,
    cell: ({ row }) => {
      const amount = row.getValue("Invested");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "Weight",
    header: () => <div className="text-right">Weight</div>,
    cell: ({ row }) => <div className="text-right lowercase">{row.getValue("Weight")}</div>,
  },
];

export function DataTableDemo() {
  const [stocks, setStocks] = useState([]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('http://localhost:8000/stocks/');
        const data = await response.json();
        setStocks(data.stocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);

  const mappedData = stocks.map((stock) => ({
    id: stock.Symbol,
    ticker: stock.Symbol,
    Company: stock.Company,
    Sector: stock.Sector,
    Industry: stock.Industry,
    Market: stock.Market,
    PE: stock.PE,
    EPS: stock.EPS,
    MarketCap: stock.MarketCap,
    BookValue: stock.BookValue,
    DividendYield: stock.DividendYield,
    EBITDA: stock.EBITDA,
    PriceToSalesTrailing12Months: stock.PriceToSalesTrailing12Months,
    FiftyTwoWeekHigh: stock.FiftyTwoWeekHigh,
    FiftyTwoWeekLow: stock.FiftyTwoWeekLow,
    FiftyDayMovingAverage: stock.FiftyDayMovingAverage,
    TwoHundredDayMovingAverage: stock.TwoHundredDayMovingAverage,
    SharesOutstanding: stock.SharesOutstanding,
    Price: stock.Price,
    Quantity: stock.Quantity,
    Invested: stock.Invested,
    Weight: stock.Weight,
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
  });

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
                );
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
                  );
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
  );
}