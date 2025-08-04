"use client"

import { useCallback } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as Papa from 'papaparse'
import html2canvas from 'html2canvas'
import { DashboardMetric, TableData } from '@/data/mock-data'

export interface ExportData {
  metrics: DashboardMetric[]
  campaigns: TableData[]
  timestamp: Date
}

export const useExport = () => {
  const exportToPDF = useCallback(async (data: ExportData) => {
    try {
      const pdf = new jsPDF()
      let yPosition = 20
      
      // Header
      pdf.setFontSize(20)
      pdf.setTextColor(40, 44, 52)
      pdf.text('ADmyBRAND Analytics Report', 20, yPosition)
      yPosition += 10
      
      // Date
      pdf.setFontSize(12)
      pdf.setTextColor(128, 128, 128)
      pdf.text(`Generated on: ${data.timestamp.toLocaleDateString()}`, 20, yPosition)
      yPosition += 20
      
      // Metrics Overview Section
      pdf.setFontSize(16)
      pdf.setTextColor(40, 44, 52)
      pdf.text('Key Metrics', 20, yPosition)
      yPosition += 10
      
      // Metrics table
      const metricsTableData = data.metrics.map(metric => [
        metric.title,
        metric.value,
        `${metric.change > 0 ? '+' : ''}${metric.change}%`,
        metric.changeLabel
      ])
      
      autoTable(pdf, {
        head: [['Metric', 'Value', 'Change', 'Status']],
        body: metricsTableData,
        startY: yPosition,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 139, 202] }
      })
      
      yPosition = (pdf as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 20
      
      // Campaign Performance Section
      pdf.setFontSize(16)
      pdf.text('Campaign Performance', 20, yPosition)
      yPosition += 10
      
      // Campaign table
      const campaignTableData = data.campaigns.map(campaign => [
        campaign.campaign,
        campaign.status.toUpperCase(),
        campaign.impressions.toLocaleString(),
        campaign.clicks.toLocaleString(),
        `${campaign.ctr.toFixed(2)}%`,
        `$${campaign.cost.toLocaleString()}`,
        campaign.conversions.toString()
      ])
      
      autoTable(pdf, {
        head: [['Campaign', 'Status', 'Impressions', 'Clicks', 'CTR', 'Cost', 'Conversions']],
        body: campaignTableData,
        startY: yPosition,
        theme: 'grid',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [66, 139, 202] },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 20 },
          2: { cellWidth: 25 },
          3: { cellWidth: 20 },
          4: { cellWidth: 15 },
          5: { cellWidth: 20 },
          6: { cellWidth: 20 }
        }
      })
      
      // Footer
      const pageCount = pdf.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(128, 128, 128)
        pdf.text(`ADmyBRAND Insights - Page ${i} of ${pageCount}`, 20, pdf.internal.pageSize.height - 10)
      }
      
      // Save the PDF
      const fileName = `admybrand-analytics-${data.timestamp.toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
      
      return { success: true, fileName }
    } catch (error) {
      console.error('Error exporting PDF:', error)
      return { success: false, error: 'Failed to export PDF' }
    }
  }, [])

  const exportToCSV = useCallback(async (data: ExportData, type: 'metrics' | 'campaigns' | 'all' = 'all') => {
    try {
      let csvData: unknown[] = []
      let fileName = ''
      
      if (type === 'metrics' || type === 'all') {
        const metricsData = data.metrics.map(metric => ({
          'Metric': metric.title,
          'Value': metric.value,
          'Change (%)': metric.change,
          'Change Label': metric.changeLabel,
          'Color': metric.color,
          'Icon': metric.icon,
          'Export Time': data.timestamp.toISOString()
        }))
        
        if (type === 'metrics') {
          csvData = metricsData
          fileName = `admybrand-metrics-${data.timestamp.toISOString().split('T')[0]}.csv`
        } else {
          csvData.push(...metricsData)
        }
      }
      
      if (type === 'campaigns' || type === 'all') {
        const campaignsData = data.campaigns.map(campaign => ({
          'Campaign ID': campaign.id,
          'Campaign Name': campaign.campaign,
          'Status': campaign.status,
          'Impressions': campaign.impressions,
          'Clicks': campaign.clicks,
          'CTR (%)': campaign.ctr,
          'Cost ($)': campaign.cost,
          'Conversions': campaign.conversions,
          'Export Time': data.timestamp.toISOString()
        }))
        
        if (type === 'campaigns') {
          csvData = campaignsData
          fileName = `admybrand-campaigns-${data.timestamp.toISOString().split('T')[0]}.csv`
        } else {
          csvData.push(...campaignsData)
        }
      }
      
      if (type === 'all') {
        fileName = `admybrand-complete-data-${data.timestamp.toISOString().split('T')[0]}.csv`
      }
      
      const csv = Papa.unparse(csvData)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', fileName)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
      
      return { success: true, fileName }
    } catch (error) {
      console.error('Error exporting CSV:', error)
      return { success: false, error: 'Failed to export CSV' }
    }
  }, [])

  const exportChartAsImage = useCallback(async (chartId: string) => {
    let originalVisibility = ''
    let originalOpacity = ''
    let originalDisplay = ''
    
    try {
      console.log(`Starting export for chart: ${chartId}`)
      
      const chartElement = document.getElementById(chartId)
      if (!chartElement) {
        console.error(`Chart element not found: ${chartId}`)
        throw new Error(`Chart with ID ${chartId} not found`)
      }

      console.log('Chart element found:', {
        id: chartElement.id,
        tagName: chartElement.tagName,
        className: chartElement.className,
        offsetWidth: chartElement.offsetWidth,
        offsetHeight: chartElement.offsetHeight,
        clientWidth: chartElement.clientWidth,
        clientHeight: chartElement.clientHeight
      })

      // Wait for chart to be fully rendered
      console.log('Waiting for chart to render...')
      await new Promise(resolve => setTimeout(resolve, 2000)) // Increased wait time

      // Check if the chart container has any SVG elements (common for recharts)
      const svgElements = chartElement.querySelectorAll('svg')
      const canvasElements = chartElement.querySelectorAll('canvas')
      console.log('Chart content analysis:', {
        svgCount: svgElements.length,
        canvasCount: canvasElements.length,
        hasChildren: chartElement.children.length > 0,
        innerHTML: chartElement.innerHTML.substring(0, 200) + '...'
      })

      // If no SVG/canvas found, wait longer and check again
      if (svgElements.length === 0 && canvasElements.length === 0) {
        console.log('No chart content found, waiting longer...')
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        const svgAfterWait = chartElement.querySelectorAll('svg')
        const canvasAfterWait = chartElement.querySelectorAll('canvas')
        console.log('After extended wait:', {
          svgCount: svgAfterWait.length,
          canvasCount: canvasAfterWait.length
        })
        
        if (svgAfterWait.length === 0 && canvasAfterWait.length === 0) {
          throw new Error('Chart content not found - no SVG or Canvas elements detected')
        }
      }

      // Get theme background color
      const computedStyle = getComputedStyle(document.documentElement)
      const backgroundColor = computedStyle.getPropertyValue('--background').trim()
      const bgColor = backgroundColor ? `hsl(${backgroundColor})` : '#ffffff'

      console.log('Using background color:', bgColor)

      // Ensure chart is visible and properly styled for capture
      originalVisibility = chartElement.style.visibility
      originalOpacity = chartElement.style.opacity
      originalDisplay = chartElement.style.display
      
      chartElement.style.visibility = 'visible'
      chartElement.style.opacity = '1'
      chartElement.style.display = 'block'
      
      // Small additional wait after style changes
      await new Promise(resolve => setTimeout(resolve, 500))

      // Try multiple capture approaches
      let canvas
      
      try {
        // Attempt 1: Standard capture
        console.log('Attempting standard chart capture...')
        canvas = await html2canvas(chartElement, {
          backgroundColor: bgColor,
          scale: 2,
          logging: true,
          useCORS: true,
          allowTaint: true,
          width: chartElement.offsetWidth,
          height: chartElement.offsetHeight,
          ignoreElements: (element: Element) => {
            return element.tagName === 'IFRAME'
          }
        })
      } catch (standardError) {
        console.log('Standard capture failed, trying simple approach...', standardError)
        
        // Attempt 2: Simple capture
        try {
          canvas = await html2canvas(chartElement, {
            backgroundColor: bgColor,
            scale: 1,
            logging: false
          })
        } catch (simpleError) {
          console.log('Simple capture failed, trying container approach...', simpleError)
          
          // Attempt 3: Try capturing the parent container
          const parentElement = chartElement.parentElement
          if (parentElement) {
            canvas = await html2canvas(parentElement, {
              backgroundColor: bgColor,
              scale: 1,
              logging: false
            })
          } else {
            throw new Error('All capture methods failed')
          }
        }
      }

      if (!canvas) {
        throw new Error('Failed to create canvas')
      }

      console.log('Canvas created successfully:', {
        width: canvas.width,
        height: canvas.height
      })

      // Check if canvas is empty (all transparent/white)
      const context = canvas.getContext('2d')
      if (context) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data
        let hasContent = false
        let hasNonTransparent = false
        
        for (let i = 0; i < pixels.length; i += 4) {
          const alpha = pixels[i + 3]
          if (alpha > 0) { // Check alpha channel
            hasNonTransparent = true
            // Check if it's not just the background color
            const r = pixels[i]
            const g = pixels[i + 1]
            const b = pixels[i + 2]
            
            // Consider it content if it's not pure white/background
            if (!(r > 250 && g > 250 && b > 250)) {
              hasContent = true
              break
            }
          }
        }
        
        console.log('Canvas content check:', {
          hasNonTransparent,
          hasContent,
          totalPixels: pixels.length / 4
        })
        
        if (!hasNonTransparent) {
          throw new Error('Generated image appears to be completely transparent')
        }
        
        if (!hasContent) {
          console.warn('Canvas might only contain background color')
          // Don't throw error, let user see the result
        }
      }

      const link = document.createElement('a')
      const fileName = `chart-${chartId}-${new Date().toISOString().split('T')[0]}.png`
      link.download = fileName
      link.href = canvas.toDataURL('image/png', 0.9) // Higher quality
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log(`Chart ${chartId} exported successfully as ${fileName}`)
      
      // Restore original styles
      const chartElement2 = document.getElementById(chartId)
      if (chartElement2) {
        chartElement2.style.visibility = originalVisibility
        chartElement2.style.opacity = originalOpacity
        chartElement2.style.display = originalDisplay
      }
      
      return { success: true, fileName }
    } catch (error) {
      console.error('Error exporting chart:', error)
      
      // Restore styles in case of error too
      const chartElement = document.getElementById(chartId)
      if (chartElement) {
        chartElement.style.visibility = originalVisibility || ''
        chartElement.style.opacity = originalOpacity || ''
        chartElement.style.display = originalDisplay || ''
      }
      
      return { success: false, error: `Failed to export chart: ${error instanceof Error ? error.message : 'Unknown error'}` }
    }
  }, [])

  return {
    exportToPDF,
    exportToCSV,
    exportChartAsImage
  }
}
