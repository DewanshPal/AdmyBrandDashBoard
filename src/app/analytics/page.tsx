"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdvancedFilters, AdvancedFilterState } from "@/components/new-advanced-filters"
import { AnalyticsChart } from "@/components/analytics-chart"
import { useAnalyticsFilters } from "@/hooks/useAnalyticsFilters"
import { analyticsData, campaignOptions, countryOptions, statusOptions } from "@/data/analytics-data"

export default function AnalyticsDashboard() {
  const [isLoading, setIsLoading] = React.useState(false)
  
  const { 
    filters, 
    setFilters, 
    applyFilters, 
    getChartData, 
    getTotalMetrics 
  } = useAnalyticsFilters()

  // Handle filter changes with loading state
  const handleFiltersChange = React.useCallback((newFilters: AdvancedFilterState) => {
    setIsLoading(true)
    setFilters(newFilters)
    // Simulate network delay for better UX
    setTimeout(() => setIsLoading(false), 300)
  }, [setFilters])

  // Apply filters to get filtered data
  const filteredData = React.useMemo(() => {
    return applyFilters(analyticsData)
  }, [applyFilters])

  // Get chart data
  const chartData = React.useMemo(() => {
    return getChartData(analyticsData)
  }, [getChartData])

  // Get total metrics
  const totalMetrics = React.useMemo(() => {
    return getTotalMetrics(analyticsData)
  }, [getTotalMetrics])
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header with Navigation */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Advanced Analytics Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Monitor your campaign performance with advanced filtering and real-time insights.
            </p>
          </div>
        </div>

        {/* Advanced Filters */}
        <AdvancedFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          campaignOptions={campaignOptions}
          countryOptions={countryOptions}
          statusOptions={statusOptions}
        />

        {/* Metric Selector for Chart */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h3 className="text-sm font-medium">Chart Metric:</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'revenue', label: 'Revenue', color: 'bg-blue-500' },
                { key: 'users', label: 'Users', color: 'bg-green-500' },
                { key: 'conversions', label: 'Conversions', color: 'bg-purple-500' }
              ].map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => handleFiltersChange({ ...filters, metric: metric.key as 'revenue' | 'users' | 'conversions' })}
                  disabled={isLoading}
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium transition-colors disabled:opacity-50 ${
                    filters.metric === metric.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${metric.color}`}></div>
                  {metric.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            // Loading Skeleton
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-20"></div>
                  <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-8 bg-muted rounded animate-pulse w-24 mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-16"></div>
              </div>
            ))
          ) : (
            // Actual Metrics
            <>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20m-7-7l7-7 7 7" />
                  </svg>
                </div>
                <div className="text-2xl font-bold">${totalMetrics.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  From {totalMetrics.recordCount} records
                </p>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Total Users</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="text-2xl font-bold">{totalMetrics.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Active users
                </p>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Total Conversions</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </div>
                <div className="text-2xl font-bold">{totalMetrics.totalConversions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Successful conversions
                </p>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Data Records</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M3 3v18h18" />
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                  </svg>
                </div>
                <div className="text-2xl font-bold">{totalMetrics.recordCount}</div>
                <p className="text-xs text-muted-foreground">
                  Filtered results
                </p>
              </div>
            </>
          )}
        </div>

        {/* Analytics Chart */}
        {isLoading ? (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="h-6 bg-muted rounded animate-pulse w-32 mb-4"></div>
            <div className="h-64 bg-muted rounded animate-pulse"></div>
          </div>
        ) : (
          <AnalyticsChart
            data={chartData}
            metric={filters.metric}
          />
        )}

        {/* Data Table */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Analytics Data</h3>
            
            {isLoading ? (
              // Table Loading Skeleton
              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-4 pb-2 border-b">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-4 bg-muted rounded animate-pulse"></div>
                  ))}
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-7 gap-4">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <div key={j} className="h-4 bg-muted rounded animate-pulse"></div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 min-w-[100px]">Date</th>
                      <th className="text-left p-2 min-w-[120px]">Campaign</th>
                      <th className="text-left p-2 min-w-[100px]">Country</th>
                      <th className="text-left p-2 min-w-[100px]">Status</th>
                      <th className="text-right p-2 min-w-[100px]">Revenue</th>
                      <th className="text-right p-2 min-w-[80px]">Users</th>
                      <th className="text-right p-2 min-w-[100px]">Conversions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="p-2">{item.campaign}</td>
                        <td className="p-2">{item.country}</td>
                        <td className="p-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            item.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            item.status === 'Paused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-2 text-right font-medium">${item.revenue.toLocaleString()}</td>
                        <td className="p-2 text-right">{item.users.toLocaleString()}</td>
                        <td className="p-2 text-right">{item.conversions.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredData.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No data found matching the current filters
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
