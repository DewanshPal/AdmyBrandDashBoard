"use client"

import * as React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdvancedFilterState } from "@/components/new-advanced-filters"

interface AnalyticsChartProps {
  data: Array<{
    date: string
    [key: string]: number | string
  }>
  metric: AdvancedFilterState['metric']
  className?: string
}

const metricConfig = {
  revenue: {
    label: 'Revenue',
    color: '#3b82f6',
    formatValue: (value: number) => `$${value.toLocaleString()}`
  },
  conversions: {
    label: 'Conversions',
    color: '#10b981',
    formatValue: (value: number) => value.toLocaleString()
  },
  users: {
    label: 'Users',
    color: '#8b5cf6',
    formatValue: (value: number) => value.toLocaleString()
  }
}

export function AnalyticsChart({ data, metric, className }: AnalyticsChartProps) {
  const config = metricConfig[metric]

  const formatXAxisDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length && label) {
      const date = new Date(label)
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-foreground mb-1">{formattedDate}</p>
          <p className="text-sm">
            <span className="font-medium" style={{ color: config.color }}>
              {config.label}: 
            </span>
            <span className="ml-1 font-semibold">
              {config.formatValue(payload[0].value)}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  const getTotalValue = () => {
    return data.reduce((sum, item) => sum + (item[metric] as number), 0)
  }

  const getAverageValue = () => {
    if (data.length === 0) return 0
    return getTotalValue() / data.length
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {config.label} Over Time
          </CardTitle>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Total: </span>
              <span className="text-foreground font-semibold">
                {config.formatValue(getTotalValue())}
              </span>
            </div>
            <div>
              <span className="font-medium">Avg: </span>
              <span className="text-foreground font-semibold">
                {config.formatValue(Math.round(getAverageValue()))}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxisDate}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={(value) => {
                  if (metric === 'revenue') {
                    return `$${(value / 1000).toFixed(0)}k`
                  }
                  return value.toLocaleString()
                }}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={metric} 
                stroke={config.color}
                strokeWidth={2}
                dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: config.color, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">No data available</p>
              <p className="text-sm">Try adjusting your filters to see results</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
