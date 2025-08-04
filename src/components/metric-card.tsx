"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { DashboardMetric } from "@/data/mock-data"

interface MetricCardProps {
  metric: DashboardMetric
  icon: LucideIcon
}

const colorClasses = {
  blue: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
  green: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800",
  purple: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800",
  orange: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800",
  red: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800",
}

export function MetricCard({ metric, icon: Icon }: MetricCardProps) {
  const isPositive = metric.change >= 0

  return (
    <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-2 bg-gradient-to-br from-card to-card/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </CardTitle>
        <div className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center shadow-sm",
          colorClasses[metric.color]
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <span className={cn(
            "flex items-center",
            isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {isPositive ? "+" : ""}{metric.change}%
          </span>
          <span className="ml-1">{metric.changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}
