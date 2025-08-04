"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableData } from "@/data/mock-data"
import { ChevronUp, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataTableProps {
  data: TableData[]
  title: string
  description?: string
}

type SortField = keyof TableData
type SortDirection = 'asc' | 'desc'

export function DataTable({ data, title, description }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>('campaign')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredData = data.filter(item =>
    item.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const SortButton = ({ field, children }: { field: SortField, children: React.ReactNode }) => (
    <Button
      variant="ghost"
      className="h-auto p-0 font-semibold justify-start"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' 
          ? <ChevronUp className="ml-2 h-4 w-4" />
          : <ChevronDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    }
    
    return (
      <span className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusStyles[status as keyof typeof statusStyles]
      )}>
        {status}
      </span>
    )
  }

  return (
    <Card className="border-2 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out">
      <CardHeader className="space-y-4 px-4 sm:px-6 py-4 sm:py-6">
        <div className="space-y-2">
          <CardTitle className="text-lg sm:text-xl font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search campaigns..."
              className="flex h-9 w-full sm:w-64 rounded-md border border-input bg-background px-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground sm:ml-auto">
            {sortedData.length} campaigns found
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[180px]">
                    <SortButton field="campaign">Campaign</SortButton>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[100px]">
                    <SortButton field="impressions">Impressions</SortButton>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[80px]">
                    <SortButton field="clicks">Clicks</SortButton>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[70px]">
                    <SortButton field="ctr">CTR</SortButton>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[80px]">
                    <SortButton field="cost">Cost</SortButton>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[100px]">
                    <SortButton field="conversions">Conversions</SortButton>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[90px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{item.campaign}</td>
                    <td className="p-4 align-middle">{item.impressions.toLocaleString()}</td>
                    <td className="p-4 align-middle">{item.clicks.toLocaleString()}</td>
                    <td className="p-4 align-middle">{item.ctr.toFixed(2)}%</td>
                    <td className="p-4 align-middle">${item.cost.toFixed(2)}</td>
                    <td className="p-4 align-middle">{item.conversions}</td>
                    <td className="p-4 align-middle">{getStatusBadge(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tablet Table View (Simplified) */}
        <div className="hidden md:block lg:hidden">
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="h-12 px-3 text-left align-middle font-medium text-muted-foreground">
                    <SortButton field="campaign">Campaign</SortButton>
                  </th>
                  <th className="h-12 px-3 text-left align-middle font-medium text-muted-foreground">
                    <SortButton field="impressions">Impressions</SortButton>
                  </th>
                  <th className="h-12 px-3 text-left align-middle font-medium text-muted-foreground">
                    <SortButton field="ctr">CTR</SortButton>
                  </th>
                  <th className="h-12 px-3 text-left align-middle font-medium text-muted-foreground">
                    <SortButton field="cost">Cost</SortButton>
                  </th>
                  <th className="h-12 px-3 text-left align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-3 align-middle">
                      <div>
                        <div className="font-medium text-sm">{item.campaign}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.clicks.toLocaleString()} clicks • {item.conversions} conversions
                        </div>
                      </div>
                    </td>
                    <td className="p-3 align-middle text-sm">{item.impressions.toLocaleString()}</td>
                    <td className="p-3 align-middle text-sm">{item.ctr.toFixed(2)}%</td>
                    <td className="p-3 align-middle text-sm">${item.cost.toFixed(2)}</td>
                    <td className="p-3 align-middle">{getStatusBadge(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {/* Mobile Sort Options */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">Sort by:</span>
            <select
              value={sortField}
              onChange={(e) => handleSort(e.target.value as SortField)}
              className="text-sm bg-background border border-input rounded px-2 py-1 min-w-0 max-w-[140px]"
            >
              <option value="campaign">Campaign</option>
              <option value="impressions">Impressions</option>
              <option value="clicks">Clicks</option>
              <option value="ctr">CTR</option>
              <option value="cost">Cost</option>
              <option value="conversions">Conversions</option>
            </select>
          </div>

          {paginatedData.map((item) => (
            <div key={item.id} className="rounded-lg border p-4 space-y-3 bg-card hover:bg-muted/50 transition-colors touch-manipulation">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm leading-tight flex-1 min-w-0">{item.campaign}</h3>
                <div className="flex-shrink-0">{getStatusBadge(item.status)}</div>
              </div>
              
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                    <span className="text-muted-foreground text-xs">Impressions</span>
                    <span className="font-medium text-xs">{item.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                    <span className="text-muted-foreground text-xs">Clicks</span>
                    <span className="font-medium text-xs">{item.clicks.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                    <span className="text-muted-foreground text-xs">CTR</span>
                    <span className="font-medium text-xs">{item.ctr.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                    <span className="text-muted-foreground text-xs">Cost</span>
                    <span className="font-medium text-xs">${item.cost.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="flex justify-between items-center p-2 bg-muted/20 rounded w-full max-w-[160px]">
                    <span className="text-muted-foreground text-xs">Conversions</span>
                    <span className="font-medium text-xs">{item.conversions}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2 py-4">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="text-xs sm:text-sm h-8 px-3"
            >
              Previous
            </Button>
            <div className="text-xs sm:text-sm text-muted-foreground px-2">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="text-xs sm:text-sm h-8 px-3"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
