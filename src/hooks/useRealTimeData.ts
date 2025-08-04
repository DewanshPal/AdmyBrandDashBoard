"use client"

import { useState, useEffect, useCallback } from 'react'
import { 
  DashboardMetric, 
  ChartData, 
  TableData,
  dashboardMetrics as initialMetrics,
  revenueData as initialRevenueData,
  conversionData as initialConversionData,
  campaignsData as initialCampaignsData 
} from '@/data/mock-data'

export interface RealTimeData {
  metrics: DashboardMetric[]
  revenueData: ChartData[]
  conversionData: ChartData[]
  campaignsData: TableData[]
  lastUpdated: Date
  isLive: boolean
}

// Simulate realistic data fluctuations
const simulateMetricUpdate = (metric: DashboardMetric): DashboardMetric => {
  const randomChange = (Math.random() - 0.5) * 0.1 // ±5% variation
  
  let newValue: string | number = metric.value
  const newChange = metric.change + (Math.random() - 0.5) * 2 // ±1% change variation
  
  if (typeof metric.value === 'string' && metric.value.includes('$')) {
    // Handle currency values
    const numericValue = parseFloat(metric.value.replace(/[$,]/g, ''))
    const updatedValue = numericValue * (1 + randomChange)
    newValue = `$${updatedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  } else if (typeof metric.value === 'string' && metric.value.includes('%')) {
    // Handle percentage values
    const numericValue = parseFloat(metric.value.replace('%', ''))
    const updatedValue = Math.max(0, numericValue * (1 + randomChange))
    newValue = `${updatedValue.toFixed(1)}%`
  } else if (typeof metric.value === 'string' && metric.value.includes(',')) {
    // Handle comma-separated numbers
    const numericValue = parseInt(metric.value.replace(/,/g, ''))
    const updatedValue = Math.max(0, Math.floor(numericValue * (1 + randomChange)))
    newValue = updatedValue.toLocaleString()
  }
  
  return {
    ...metric,
    value: newValue,
    change: Math.round(newChange * 10) / 10 // Round to 1 decimal place
  }
}

const simulateChartDataUpdate = (data: ChartData[]): ChartData[] => {
  return data.map(item => ({
    ...item,
    value: Math.max(0, Math.floor(item.value * (1 + (Math.random() - 0.5) * 0.05))) // ±2.5% variation
  }))
}

const simulateCampaignUpdate = (campaigns: TableData[]): TableData[] => {
  return campaigns.map(campaign => {
    const impressionVariation = (Math.random() - 0.5) * 0.02 // ±1% variation
    const clickVariation = (Math.random() - 0.5) * 0.03 // ±1.5% variation
    const conversionVariation = (Math.random() - 0.5) * 0.04 // ±2% variation
    
    const newImpressions = Math.max(0, Math.floor(campaign.impressions * (1 + impressionVariation)))
    const newClicks = Math.max(0, Math.floor(campaign.clicks * (1 + clickVariation)))
    const newConversions = Math.max(0, Math.floor(campaign.conversions * (1 + conversionVariation)))
    const newCtr = newImpressions > 0 ? (newClicks / newImpressions) * 100 : 0
    
    return {
      ...campaign,
      impressions: newImpressions,
      clicks: newClicks,
      conversions: newConversions,
      ctr: Math.round(newCtr * 100) / 100 // Round to 2 decimal places
    }
  })
}

export const useRealTimeData = (updateInterval: number = 5000) => {
  const [data, setData] = useState<RealTimeData>({
    metrics: initialMetrics,
    revenueData: initialRevenueData,
    conversionData: initialConversionData,
    campaignsData: initialCampaignsData,
    lastUpdated: new Date(),
    isLive: false
  })

  const updateData = useCallback(() => {
    setData(prevData => ({
      metrics: prevData.metrics.map(simulateMetricUpdate),
      revenueData: simulateChartDataUpdate(prevData.revenueData),
      conversionData: simulateChartDataUpdate(prevData.conversionData),
      campaignsData: simulateCampaignUpdate(prevData.campaignsData),
      lastUpdated: new Date(),
      isLive: prevData.isLive
    }))
  }, [])

  const toggleLiveUpdates = useCallback(() => {
    setData(prevData => ({
      ...prevData,
      isLive: !prevData.isLive
    }))
  }, [])

  const resetData = useCallback(() => {
    setData({
      metrics: initialMetrics,
      revenueData: initialRevenueData,
      conversionData: initialConversionData,
      campaignsData: initialCampaignsData,
      lastUpdated: new Date(),
      isLive: false
    })
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (data.isLive) {
      interval = setInterval(updateData, updateInterval)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [data.isLive, updateData, updateInterval])

  return {
    data,
    toggleLiveUpdates,
    resetData,
    updateData: updateData // Manual update function
  }
}