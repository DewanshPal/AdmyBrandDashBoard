"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Filter, X, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface AdvancedFilterState {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  campaign: string
  country: string
  status: string
  metric: "revenue" | "conversions" | "users"
}

interface AdvancedFiltersProps {
  filters: AdvancedFilterState
  onFiltersChange: (filters: AdvancedFilterState) => void
  campaignOptions?: string[]
  countryOptions?: string[]
  statusOptions?: string[]
  className?: string
}

const defaultCampaignOptions = ["All", "Summer Sale", "Brand Awareness", "Holiday Promo"]
const defaultCountryOptions = ["All", "India", "USA", "UK", "Canada"]
const defaultStatusOptions = ["All", "Active", "Paused", "Completed"]

export function AdvancedFilters({
  filters,
  onFiltersChange,
  campaignOptions = defaultCampaignOptions,
  countryOptions = defaultCountryOptions,
  statusOptions = defaultStatusOptions,
  className
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const updateFilters = (updates: Partial<AdvancedFilterState>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const resetFilters = () => {
    onFiltersChange({
      dateRange: { from: undefined, to: undefined },
      campaign: "All",
      country: "All",
      status: "All",
      metric: "revenue"
    })
  }

  const hasActiveFilters = React.useMemo(() => {
    return (
      filters.dateRange.from || 
      filters.dateRange.to || 
      filters.campaign !== "All" || 
      filters.country !== "All" || 
      filters.status !== "All"
    )
  }, [filters])

  const activeFilterCount = React.useMemo(() => {
    let count = 0
    if (filters.dateRange.from || filters.dateRange.to) count++
    if (filters.campaign !== "All") count++
    if (filters.country !== "All") count++
    if (filters.status !== "All") count++
    return count
  }, [filters])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="relative"
            >
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[800px] p-0" align="start">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Advanced Filters</CardTitle>
                  <div className="flex items-center space-x-2">
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="h-8 px-2 text-xs"
                      >
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Reset
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !filters.dateRange.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.from ? (
                            format(filters.dateRange.from, "PPP")
                          ) : (
                            "From date"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.from}
                          onSelect={(date) =>
                            updateFilters({
                              dateRange: { ...filters.dateRange, from: date }
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !filters.dateRange.to && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.to ? (
                            format(filters.dateRange.to, "PPP")
                          ) : (
                            "To date"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.to}
                          onSelect={(date) =>
                            updateFilters({
                              dateRange: { ...filters.dateRange, to: date }
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Dropdown Filters */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Campaign Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Campaign</Label>
                    <Select
                      value={filters.campaign}
                      onValueChange={(value) => updateFilters({ campaign: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign" />
                      </SelectTrigger>
                      <SelectContent>
                        {campaignOptions.map((campaign) => (
                          <SelectItem key={campaign} value={campaign}>
                            {campaign}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Country Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Country</Label>
                    <Select
                      value={filters.country}
                      onValueChange={(value) => updateFilters({ country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryOptions.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Status</Label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) => updateFilters({ status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Metric Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Chart Metric</Label>
                  <Select
                    value={filters.metric}
                    onValueChange={(value: "revenue" | "conversions" | "users") => 
                      updateFilters({ metric: value })
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="conversions">Conversions</SelectItem>
                      <SelectItem value="users">Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Apply/Clear Actions */}
                <div className="flex justify-between pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Clear All
                  </Button>
                  <Button size="sm" onClick={() => setIsOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
