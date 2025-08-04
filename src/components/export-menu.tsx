"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useExport, ExportData } from "@/hooks/useExport"
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Image,
  Loader2
} from "lucide-react"

interface ExportMenuProps {
  data: ExportData
  className?: string
}

export function ExportMenu({ data, className }: ExportMenuProps) {
  const [isExporting, setIsExporting] = React.useState(false)
  const [exportType, setExportType] = React.useState<string>('')
  const { toast } = useToast()
  const { exportToPDF, exportToCSV } = useExport()

  const handleExport = async (type: string, action: () => Promise<{ success: boolean; fileName?: string; error?: string }>) => {
    setIsExporting(true)
    setExportType(type)
    
    try {
      const result = await action()
      
      if (result.success) {
        toast({
          title: "Export Successful",
          description: `${type} exported as ${result.fileName}`,
          variant: "default",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      console.error('Export error:', err)
      toast({
        title: "Export Failed",
        description: `Failed to export ${type}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
      setExportType('')
    }
  }

  const exportOptions = [
    {
      type: "PDF Report",
      icon: FileText,
      description: "Complete analytics report",
      action: () => exportToPDF(data)
    },
    {
      type: "CSV - All Data",
      icon: FileSpreadsheet,
      description: "All metrics and campaigns",
      action: () => exportToCSV(data, 'all')
    },
    {
      type: "CSV - Metrics Only",
      icon: FileSpreadsheet,
      description: "Key performance metrics",
      action: () => exportToCSV(data, 'metrics')
    },
    {
      type: "CSV - Campaigns Only",
      icon: FileSpreadsheet,
      description: "Campaign performance data",
      action: () => exportToCSV(data, 'campaigns')
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`flex items-center space-x-1 ${className}`}
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span>{isExporting ? `Exporting ${exportType}...` : 'Export'}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Dashboard Data</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {exportOptions.map((option) => (
          <DropdownMenuItem
            key={option.type}
            onClick={() => handleExport(option.type, option.action)}
            disabled={isExporting}
            className="flex items-center space-x-3 py-3 cursor-pointer"
          >
            <option.icon className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="font-medium">{option.type}</span>
              <span className="text-xs text-muted-foreground">{option.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem disabled className="text-xs text-muted-foreground">
          <Image className="h-3 w-3 mr-2" />
          Individual chart exports available via chart menus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
