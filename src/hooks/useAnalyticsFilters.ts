"use client"

import { useState, useMemo, useCallback } from 'react'
import { isWithinInterval, isAfter, isBefore, parseISO } from 'date-fns'
import { AdvancedFilterState } from '@/components/new-advanced-filters'
import { AnalyticsData } from '@/data/analytics-data'

export function useAnalyticsFilters() {
  const [filters, setFilters] = useState<AdvancedFilterState>({
    dateRange: { 
      from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      to: new Date() // today
    },
    campaign: "All",
    country: "All",
    status: "All",
    metric: "revenue"
  })

  const applyFilters = useCallback((
    data: AnalyticsData[]
  ): AnalyticsData[] => {
    
    let filteredData = [...data]
    
    // Date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      filteredData = filteredData.filter(item => {
        const itemDate = parseISO(item.date)
        
        if (filters.dateRange.from && filters.dateRange.to) {
          return isWithinInterval(itemDate, {
            start: filters.dateRange.from,
            end: filters.dateRange.to
          })
        } else if (filters.dateRange.from) {
          return isAfter(itemDate, filters.dateRange.from) || 
                 itemDate.toDateString() === filters.dateRange.from.toDateString()
        } else if (filters.dateRange.to) {
          return isBefore(itemDate, filters.dateRange.to) ||
                 itemDate.toDateString() === filters.dateRange.to.toDateString()
        }
        return true
      })
    }
    
    // Campaign filter
    if (filters.campaign !== "All") {
      filteredData = filteredData.filter(item => item.campaign === filters.campaign)
    }
    
    // Country filter
    if (filters.country !== "All") {
      filteredData = filteredData.filter(item => item.country === filters.country)
    }
    
    // Status filter
    if (filters.status !== "All") {
      filteredData = filteredData.filter(item => item.status === filters.status)
    }

    // Sort by date for chart consistency
    filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return filteredData
  }, [filters])

  const getChartData = useCallback((data: AnalyticsData[]) => {
    const filteredData = applyFilters(data)
    
    // Group by date and sum the selected metric
    const groupedData = filteredData.reduce((acc, item) => {
      const date = item.date
      if (!acc[date]) {
        acc[date] = { date, [filters.metric]: 0 }
      }
      const metricValue = item[filters.metric as keyof Pick<AnalyticsData, 'revenue' | 'conversions' | 'users'>] as number
      acc[date][filters.metric] = (acc[date][filters.metric] as number) + metricValue
      return acc
    }, {} as Record<string, { date: string; [key: string]: number | string }>)

    return Object.values(groupedData).sort((a, b) => 
      new Date(a.date as string).getTime() - new Date(b.date as string).getTime()
    )
  }, [filters, applyFilters])

  const getFilterSummary = useCallback(() => {
    const summary: string[] = []
    
    if (filters.dateRange.from || filters.dateRange.to) {
      if (filters.dateRange.from && filters.dateRange.to) {
        summary.push(`Date: ${filters.dateRange.from.toLocaleDateString()} - ${filters.dateRange.to.toLocaleDateString()}`)
      } else if (filters.dateRange.from) {
        summary.push(`After: ${filters.dateRange.from.toLocaleDateString()}`)
      } else if (filters.dateRange.to) {
        summary.push(`Before: ${filters.dateRange.to.toLocaleDateString()}`)
      }
    }
    
    if (filters.campaign !== "All") {
      summary.push(`Campaign: ${filters.campaign}`)
    }
    
    if (filters.country !== "All") {
      summary.push(`Country: ${filters.country}`)
    }
    
    if (filters.status !== "All") {
      summary.push(`Status: ${filters.status}`)
    }
    
    return summary
  }, [filters])

  const hasActiveFilters = useMemo(() => {
    return (
      filters.dateRange.from || 
      filters.dateRange.to || 
      filters.campaign !== "All" || 
      filters.country !== "All" || 
      filters.status !== "All"
    )
  }, [filters])

  const getTotalMetrics = useCallback((data: AnalyticsData[]) => {
    const filteredData = applyFilters(data)
    
    return {
      totalRevenue: filteredData.reduce((sum, item) => sum + item.revenue, 0),
      totalConversions: filteredData.reduce((sum, item) => sum + item.conversions, 0),
      totalUsers: filteredData.reduce((sum, item) => sum + item.users, 0),
      recordCount: filteredData.length
    }
  }, [applyFilters])

  return {
    filters,
    setFilters,
    applyFilters,
    getChartData,
    getFilterSummary,
    hasActiveFilters,
    getTotalMetrics
  }
}
