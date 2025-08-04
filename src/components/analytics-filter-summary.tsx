"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdvancedFilterState } from "@/components/new-advanced-filters"

interface AnalyticsFilterSummaryProps {
  filters: AdvancedFilterState
  onRemoveFilter: (filterType: string) => void
  onClearAll: () => void
  className?: string
}

export function AnalyticsFilterSummary({ 
  filters, 
  onRemoveFilter, 
  onClearAll, 
  className 
}: AnalyticsFilterSummaryProps) {
  const hasActiveFilters = React.useMemo(() => {
    return (
      filters.dateRange.from || 
      filters.dateRange.to || 
      filters.campaign !== "All" || 
      filters.country !== "All" || 
      filters.status !== "All"
    )
  }, [filters])

  if (!hasActiveFilters) {
    return null
  }

  const handleRemoveDateRange = () => {
    onRemoveFilter('dateRange')
  }

  const handleRemoveCampaign = () => {
    onRemoveFilter('campaign')
  }

  const handleRemoveCountry = () => {
    onRemoveFilter('country')
  }

  const handleRemoveStatus = () => {
    onRemoveFilter('status')
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 p-3 bg-muted/50 rounded-lg border ${className}`}>
      <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
      
      {/* Date Range */}
      {(filters.dateRange.from || filters.dateRange.to) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span>
            {filters.dateRange.from && filters.dateRange.to
              ? `${filters.dateRange.from.toLocaleDateString()} - ${filters.dateRange.to.toLocaleDateString()}`
              : filters.dateRange.from
              ? `From ${filters.dateRange.from.toLocaleDateString()}`
              : `Until ${filters.dateRange.to?.toLocaleDateString()}`
            }
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={handleRemoveDateRange}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Campaign */}
      {filters.campaign !== "All" && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span>Campaign: {filters.campaign}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={handleRemoveCampaign}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Country */}
      {filters.country !== "All" && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span>Country: {filters.country}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={handleRemoveCountry}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Status */}
      {filters.status !== "All" && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span>Status: {filters.status}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={handleRemoveStatus}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Clear All */}
      <Button
        variant="ghost"
        size="sm"
        className="ml-auto text-xs"
        onClick={onClearAll}
      >
        Clear all
      </Button>
    </div>
  )
}
