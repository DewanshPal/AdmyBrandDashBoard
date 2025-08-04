"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useExport, ExportData } from "@/hooks/useExport"
import { useToast } from "@/hooks/use-toast"
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Image,
  Info
} from "lucide-react"

interface ExportInfoProps {
  data?: ExportData
}

export function ExportInfo({ }: ExportInfoProps) {
  const { exportChartAsImage } = useExport()
  const { toast } = useToast()

  const chartExports = [
    { id: "revenue-chart", title: "Revenue Chart" },
    { id: "conversions-chart", title: "Conversions Chart" },
    { id: "traffic-chart", title: "Traffic Sources Chart" }
  ]

  const handleChartExport = async (chartId: string, title: string) => {
    const result = await exportChartAsImage(chartId)
    if (result.success) {
      toast({
        title: "Chart Exported",
        description: `${title} exported as ${result.fileName}`,
      })
    } else {
      toast({
        title: "Export Failed",
        description: result.error || "Failed to export chart",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800">
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
        <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 text-lg sm:text-xl">
          <Info className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Export Features</span>
        </CardTitle>
        <CardDescription className="text-blue-600 dark:text-blue-400 text-sm">
          Export your dashboard data in multiple formats for reporting and analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
        {/* Export Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex flex-col items-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-center">PDF Report</span>
            <span className="text-xs text-muted-foreground text-center">Complete analytics report</span>
          </div>
          
          <div className="flex flex-col items-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border">
            <FileSpreadsheet className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-center">CSV Data</span>
            <span className="text-xs text-muted-foreground text-center">Raw data for analysis</span>
          </div>
          
          <div className="flex flex-col items-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border">
            <Image className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-center">Chart Images</span>
            <span className="text-xs text-muted-foreground text-center">Individual charts</span>
          </div>
        </div>

        {/* Individual Chart Export Buttons */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Quick Chart Exports:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {chartExports.map((chart) => (
              <Button
                key={chart.id}
                variant="outline"
                size="sm"
                onClick={() => handleChartExport(chart.id, chart.title)}
                className="flex items-center justify-center space-x-1 text-xs h-8"
              >
                <Download className="h-3 w-3" />
                <span className="truncate">{chart.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Export Instructions */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            💡 <strong>Pro Tip:</strong> Use the main Export button in the header for comprehensive data exports, 
            or hover over individual charts to export them as images.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
