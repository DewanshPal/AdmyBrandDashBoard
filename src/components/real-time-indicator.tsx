"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Radio } from "lucide-react"

interface RealTimeIndicatorProps {
  isLive: boolean
  lastUpdated: Date
  onToggleLive: () => void
  onReset: () => void
  onManualUpdate: () => void
}

export function RealTimeIndicator({ 
  isLive, 
  lastUpdated, 
  onToggleLive, 
  onReset, 
  onManualUpdate 
}: RealTimeIndicatorProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <span className="text-sm text-muted-foreground">--:--:--</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Live Status Indicator */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
          isLive 
            ? 'bg-green-500 animate-pulse shadow-green-500/50 shadow-lg' 
            : 'bg-gray-400'
        }`}></div>
        <span className="text-sm text-muted-foreground">
          {isLive ? 'LIVE' : 'PAUSED'}
        </span>
      </div>

      {/* Last Updated Time */}
      <span className="text-sm text-muted-foreground">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </span>

      {/* Control Buttons */}
      <div className="flex items-center space-x-2">
        {/* Play/Pause Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleLive}
          className="flex items-center space-x-1"
        >
          {isLive ? (
            <>
              <Pause className="h-3 w-3" />
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3" />
              <span className="hidden sm:inline">Start Live</span>
            </>
          )}
        </Button>

        {/* Manual Update Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onManualUpdate}
          disabled={isLive}
          className="flex items-center space-x-1"
        >
          <RotateCcw className="h-3 w-3" />
          <span className="hidden sm:inline">Update</span>
        </Button>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center space-x-1"
        >
          <Radio className="h-3 w-3" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
      </div>
    </div>
  )
}