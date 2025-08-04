"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnalyticsData } from "@/data/analytics-data"

interface AnalyticsTableProps {
  data: AnalyticsData[]
  className?: string
}

export function AnalyticsTable({ data, className }: AnalyticsTableProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Paused":
        return "secondary"
      case "Completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Analytics Data ({data.length} records)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Campaign
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Revenue
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Users
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Conversions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">
                        {formatDate(row.date)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {row.campaign}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {row.country}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge variant={getStatusVariant(row.status)}>
                          {row.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        ${row.revenue.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        {row.users.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        {row.conversions.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">No data found</p>
              <p className="text-sm">Try adjusting your filters to see results</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
