"use client"

import * as React from "react"
import { TrendingUp, Users, Target, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricsSummaryProps {
  totalRevenue: number
  totalConversions: number
  totalUsers: number
  recordCount: number
  className?: string
}

export function MetricsSummary({ 
  totalRevenue, 
  totalConversions, 
  totalUsers, 
  recordCount, 
  className 
}: MetricsSummaryProps) {
  const metrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Conversions",
      value: totalConversions.toLocaleString(),
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "Data Points",
      value: recordCount.toLocaleString(),
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ]

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <IconComponent className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
