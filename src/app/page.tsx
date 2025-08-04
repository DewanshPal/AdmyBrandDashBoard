"use client"

import * as React from "react"
import { ChartCard } from "@/components/chart-card-wrapper"
import { DataTable } from "@/components/data-table"
import { ThemeToggle } from "@/components/theme-toggle"
import { ExportMenu } from "@/components/export-menu"
import { ExportInfo } from "@/components/export-info"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { 
  Users, 
  DollarSign, 
  RefreshCw,
  CreditCard,
  Activity,
  Pause,
  Play,
  RotateCcw
} from "lucide-react"

import { 
  dashboardMetrics, 
  revenueData, 
  trafficSourceData, 
  conversionData,
  campaignsData 
} from "@/data/mock-data"

// Icon mapping for metric cards
const iconMap = {
  DollarSign,
  Users,
  CreditCard,
  Activity,
}

// Color mapping for metric cards
const colorMap = {
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-600",
  green: "bg-green-500/10 border-green-500/20 text-green-600", 
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-600",
  orange: "bg-orange-500/10 border-orange-500/20 text-orange-600",
  red: "bg-red-500/10 border-red-500/20 text-red-600"
}

export default function Dashboard() {
  const [mounted, setMounted] = React.useState(false)
  const [isLive, setIsLive] = React.useState(false)
  const [lastUpdated, setLastUpdated] = React.useState(new Date())
  const [currentMetrics, setCurrentMetrics] = React.useState(dashboardMetrics)
  const [currentCampaigns, setCurrentCampaigns] = React.useState(campaignsData)
  
  // Chart data state for reloading
  const [currentRevenueData, setCurrentRevenueData] = React.useState(revenueData)
  const [currentTrafficData, setCurrentTrafficData] = React.useState(trafficSourceData)
  const [currentConversionData, setCurrentConversionData] = React.useState(conversionData)
  const [chartKey, setChartKey] = React.useState(0) // Key to force chart re-render
  const [isResetting, setIsResetting] = React.useState(false) // Loading state for reset

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Simulate data updates
  const updateData = React.useCallback(() => {
    // Update metrics with small random variations
    const updatedMetrics = currentMetrics.map(metric => {
      const randomChange = (Math.random() - 0.5) * 0.1 // ±5% variation
      let newValue = metric.value
      const newChange = randomChange * 100 // Convert to percentage for display

      if (typeof metric.value === 'string' && metric.value.includes('$')) {
        const numericValue = parseFloat(metric.value.replace(/[$,]/g, ''))
        const updatedValue = numericValue * (1 + randomChange)
        newValue = `$${updatedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      } else if (typeof metric.value === 'string' && metric.value.includes('%')) {
        const numericValue = parseFloat(metric.value.replace('%', ''))
        const updatedValue = Math.max(0, numericValue * (1 + randomChange))
        newValue = `${updatedValue.toFixed(1)}%`
      } else if (typeof metric.value === 'string' && metric.value.includes(',')) {
        const numericValue = parseInt(metric.value.replace(/,/g, ''))
        const updatedValue = Math.max(0, Math.floor(numericValue * (1 + randomChange)))
        newValue = updatedValue.toLocaleString()
      }

      return {
        ...metric,
        value: newValue,
        change: Math.round(newChange * 10) / 10
      }
    })

    // Update campaign data
    const updatedCampaigns = currentCampaigns.map(campaign => {
      const impressionVariation = (Math.random() - 0.5) * 0.02
      const clickVariation = (Math.random() - 0.5) * 0.03
      const conversionVariation = (Math.random() - 0.5) * 0.04

      const newImpressions = Math.max(0, Math.floor(campaign.impressions * (1 + impressionVariation)))
      const newClicks = Math.max(0, Math.floor(campaign.clicks * (1 + clickVariation)))
      const newConversions = Math.max(0, Math.floor(campaign.conversions * (1 + conversionVariation)))
      const newCtr = newImpressions > 0 ? (newClicks / newImpressions) * 100 : 0

      return {
        ...campaign,
        impressions: newImpressions,
        clicks: newClicks,
        conversions: newConversions,
        ctr: Math.round(newCtr * 100) / 100
      }
    })

    // Update chart data during live updates
    const updatedRevenueData = currentRevenueData.map(item => ({
      ...item,
      value: Math.max(0, item.value + (Math.random() - 0.5) * item.value * 0.05) // ±2.5% variation
    }))
    
    const updatedTrafficData = currentTrafficData.map(item => ({
      ...item,
      value: Math.max(1, item.value + (Math.random() - 0.5) * item.value * 0.08) // ±4% variation
    }))
    
    const updatedConversionData = currentConversionData.map(item => ({
      ...item,
      value: Math.max(1, item.value + (Math.random() - 0.5) * item.value * 0.06) // ±3% variation
    }))

    setCurrentMetrics(updatedMetrics)
    setCurrentCampaigns(updatedCampaigns)
    setCurrentRevenueData(updatedRevenueData)
    setCurrentTrafficData(updatedTrafficData)
    setCurrentConversionData(updatedConversionData)
    setLastUpdated(new Date())
  }, [currentMetrics, currentCampaigns, currentRevenueData, currentTrafficData, currentConversionData])

  const toggleLiveUpdates = () => {
    setIsLive(!isLive)
  }

  const resetData = async () => {
    setIsResetting(true)
    setIsLive(false)
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setCurrentMetrics(dashboardMetrics)
    setCurrentCampaigns(campaignsData)
    
    // Reset chart data with slight variations to simulate reload
    const resetRevenueData = revenueData.map(item => ({
      ...item,
      value: item.value + (Math.random() - 0.5) * item.value * 0.1 // ±5% variation
    }))
    
    const resetTrafficData = trafficSourceData.map(item => ({
      ...item,
      value: Math.max(1, item.value + (Math.random() - 0.5) * item.value * 0.15) // ±7.5% variation
    }))
    
    const resetConversionData = conversionData.map(item => ({
      ...item,
      value: Math.max(1, item.value + (Math.random() - 0.5) * item.value * 0.12) // ±6% variation
    }))
    
    setCurrentRevenueData(resetRevenueData)
    setCurrentTrafficData(resetTrafficData)
    setCurrentConversionData(resetConversionData)
    
    // Force chart re-render by updating key
    setChartKey(prev => prev + 1)
    
    setLastUpdated(new Date())
    setIsResetting(false)
  }

  // Auto-update effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isLive) {
      interval = setInterval(updateData, 3000) // Update every 3 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isLive, updateData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 transition-all duration-500">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-4 sm:h-16">
            {/* Navigation Links */}
            <div>
              <div className="flex items-center space-x-6">
                <Link 
                  href="/" 
                  className="text-sm font-medium text-foreground hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/analytics" 
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  Advanced Analytics
                </Link>
              </div>
            </div>
            
            {/* Controls - Mobile Optimized */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-4">
              {/* Real-time Controls */}
              <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                {/* Live Status Indicator */}
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isLive 
                      ? 'bg-green-500 animate-pulse shadow-green-500/50 shadow-lg' 
                      : 'bg-gray-400'
                  }`}></div>
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {isLive ? 'LIVE' : 'PAUSED'}
                  </span>
                </div>

                {/* Last Updated Time - Hidden on very small screens */}
                <span className="text-xs text-muted-foreground hidden md:inline">
                  Last: {mounted ? lastUpdated.toLocaleTimeString() : '--:--:--'}
                </span>
              </div>

              {/* Control Buttons - Mobile Friendly */}
              <div className="flex items-center justify-between sm:justify-start sm:space-x-2">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleLiveUpdates}
                    className="flex items-center space-x-1 h-8 px-2 sm:h-9 sm:px-3"
                  >
                    {isLive ? (
                      <>
                        <Pause className="h-3 w-3" />
                        <span className="text-xs">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3" />
                        <span className="text-xs">Live</span>
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={updateData}
                    disabled={isLive}
                    className="flex items-center space-x-1 h-8 px-2 sm:h-9 sm:px-3"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span className="text-xs hidden sm:inline">Update</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetData}
                    disabled={isResetting}
                    className="flex items-center space-x-1 h-8 px-2 sm:h-9 sm:px-3"
                  >
                    <RotateCcw className={`h-3 w-3 ${isResetting ? 'animate-spin' : ''}`} />
                    <span className="text-xs hidden sm:inline">
                      {isResetting ? 'Resetting...' : 'Reset'}
                    </span>
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <ExportMenu 
                    data={{
                      metrics: currentMetrics,
                      campaigns: currentCampaigns,
                      timestamp: lastUpdated
                    }}
                  />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Live Update Banner */}
        {isLive && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-400">
                Live updates active. Refreshes every 3 seconds.
              </span>
            </div>
          </div>
        )}

        {/* Reset Banner */}
        {isResetting && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-orange-700 dark:text-orange-400">
                Resetting dashboard and reloading all charts...
              </span>
            </div>
          </div>
        )}

        {/* Dashboard Overview */}
        <div className="space-y-6 sm:space-y-8">
          {/* Dashboard Title */}
          <div className="text-center space-y-2 px-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              ADmyBRAND Insights
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">AI-Powered Analytics Dashboard</p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {currentMetrics.map((metric, index) => {
              const Icon = iconMap[metric.icon as keyof typeof iconMap]
              const colorClasses = colorMap[metric.color]
              
              return (
                <div
                  key={metric.title}
                  className="group bg-card/80 backdrop-blur-sm border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.02] animate-fade-in touch-manipulation"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">
                        {metric.title}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold transition-all duration-300">
                        {metric.value}
                      </p>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs font-medium ${
                          metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change >= 0 ? '+' : ''}{metric.change}%
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {metric.changeLabel}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-lg ${colorClasses} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-2`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
            <div className="animate-fade-in group" style={{ animationDelay: '400ms' }} id="revenue-chart">
              <ChartCard
                key={`revenue-${chartKey}`}
                title="Revenue Over Time"
                description="Monthly revenue trends"
                data={currentRevenueData}
                type="line"
                chartId="revenue-chart"
              />
            </div>
            
            <div className="animate-fade-in group" style={{ animationDelay: '500ms' }} id="conversions-chart">
              <ChartCard
                key={`conversions-${chartKey}`}
                title="Weekly Conversions"
                description="Conversion performance by week"
                data={currentConversionData}
                type="bar"
                chartId="conversions-chart"
              />
            </div>
            
            <div className="animate-fade-in group lg:col-span-2 2xl:col-span-1" style={{ animationDelay: '600ms' }} id="traffic-chart">
              <ChartCard
                key={`traffic-${chartKey}`}
                title="Traffic Sources"
                description="Distribution of traffic sources"
                data={currentTrafficData}
                type="pie"
                chartId="traffic-chart"
              />
            </div>
          </div>

          {/* Export Information */}
          <div className="animate-fade-in" style={{ animationDelay: '750ms' }}>
            <ExportInfo 
              data={{
                metrics: currentMetrics,
                campaigns: currentCampaigns,
                timestamp: lastUpdated
              }}
            />
          </div>

          {/* Campaign Performance Table */}
          <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
            <DataTable 
              data={currentCampaigns} 
              title="Campaign Performance"
              description="Track and analyze your marketing campaigns"
            />
          </div>

          {/* Real-time Update Summary */}
          <div className="animate-fade-in bg-muted/50 rounded-xl p-4 sm:p-6" style={{ animationDelay: '800ms' }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">Real-time</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Data Updates</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-green-600 font-mono">
                  {mounted ? lastUpdated.toLocaleTimeString() : '--:--:--'}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Last Refresh</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">
                  {isLive ? 'Active' : 'Paused'}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Live Status</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}
