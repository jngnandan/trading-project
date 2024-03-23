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
import { DataTableDemo } from './showtable';



function Screener() {
  return (
    <div>
      <Header/>
      <div className='flex flex-col justify-start h-80 mx-8'>
      
      <div className='flex flex-row justify-center mb-5'>
        <Tabs defaultValue="descriptive" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="descriptive">Descriptive</TabsTrigger>
          <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="etf">ETF</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
      </Tabs>

      </div>
      <div className='grid grid-cols-5 space-around'>
        {/* 1 */}
        <div className='flex flex-col justify-end items-end gap-2'>
        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Exchange</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Market cap</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Earning</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Price</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>
        </div>
      
        {/* 2 */}
         <div className='flex flex-col justify-end items-end gap-2'>
        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Exchange</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Market cap</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Earning</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Price</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>
        </div>

      {/* 3 */}
      <div className='flex flex-col justify-end items-end gap-1 gap-y-2'>
        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Exchange</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Market cap</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Earning</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Price</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>
        </div>

      {/* 4 */}
      <div className='flex flex-col justify-end items-end gap-1 gap-y-2'>
        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Exchange</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Market cap</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Earning</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Price</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>
        </div>

      {/* 5 */}
      <div className='extra-columns flex flex-col justify-end items-end gap-1 gap-y-2'>
        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Exchange</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Market cap</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Earning</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>

        <div className='flex flex-row gap-1 gap-y-2 items-center'>
        <p className='text-xs'>Price</p>
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="My Presets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Presets</SelectItem>
          <SelectItem value="dark">Save Screen</SelectItem>
          <SelectItem value="system">Edit Screen</SelectItem>
        </SelectContent>
      </Select>
        </div>
      </div>


      </div>

      <div className='mt-8'>
        <DataTableDemo/>
      </div>
      
      </div>
      </div>
  )
}

export default Screener