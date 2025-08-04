"use client"

import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartData } from "@/data/mock-data"
import { useExport } from "@/hooks/useExport"
import { useToast } from "@/hooks/use-toast"
import { Download } from "lucide-react"

interface ChartCardProps {
  title: string
  description?: string
  data: ChartData[]
  type: 'line' | 'bar' | 'pie'
  className?: string
  chartId?: string
}

// Create a wrapper component for dynamic loading
const ChartRenderer = dynamic(() => import('recharts').then(recharts => ({
  default: function ChartComponent({ data, type }: { data: ChartData[], type: 'line' | 'bar' | 'pie' }) {
    const COLORS = [
      'hsl(217, 91%, 59%)',  // Bright Blue
      'hsl(142, 76%, 36%)',  // Emerald Green
      'hsl(346, 77%, 50%)',  // Rose Pink
      'hsl(25, 95%, 53%)',   // Orange
      'hsl(262, 83%, 58%)',  // Purple
      'hsl(199, 89%, 48%)',  // Sky Blue
      'hsl(48, 96%, 53%)',   // Yellow
      'hsl(339, 82%, 52%)'   // Magenta
    ]
    
    switch (type) {
      case 'line':
        return (
          <div className="animate-in fade-in-0 duration-500">
            <recharts.ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
              <recharts.LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <recharts.CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <recharts.XAxis 
                  dataKey="name" 
                  className="text-xs" 
                  tick={{ fontSize: 10 }} 
                  interval="preserveStartEnd"
                  tickMargin={5}
                />
                <recharts.YAxis 
                  className="text-xs" 
                  tick={{ fontSize: 10 }} 
                  width={40}
                  tickMargin={5}
                />
                <recharts.Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))',
                    fontSize: '12px'
                  }}
                  labelStyle={{
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <recharts.Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(221.2, 83.2%, 53.3%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(221.2, 83.2%, 53.3%)', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, fill: 'hsl(221.2, 83.2%, 53.3%)', stroke: '#fff', strokeWidth: 2 }}
                />
              </recharts.LineChart>
            </recharts.ResponsiveContainer>
          </div>
        )
      
      case 'bar':
        return (
          <div className="animate-in fade-in-0 duration-500">
            <recharts.ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
              <recharts.BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <recharts.CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <recharts.XAxis 
                  dataKey="name" 
                  className="text-xs" 
                  tick={{ fontSize: 10 }} 
                  interval="preserveStartEnd"
                  tickMargin={5}
                />
                <recharts.YAxis 
                  className="text-xs" 
                  tick={{ fontSize: 10 }} 
                  width={40}
                  tickMargin={5}
                />
                <recharts.Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))',
                    fontSize: '12px'
                  }}
                  labelStyle={{
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <recharts.Bar 
                  dataKey="value" 
                  fill="hsl(142.1, 76.2%, 36.3%)" 
                  radius={[6, 6, 0, 0]}
                />
              </recharts.BarChart>
            </recharts.ResponsiveContainer>
          </div>
        )
      
      case 'pie':
        return (
          <div className="animate-in fade-in-0 duration-500">
            <recharts.ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
              <recharts.PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <filter id="shadow" x="0" y="0" width="200%" height="200%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <recharts.Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  labelLine={false}
                  label={false}
                  outerRadius={100}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                  style={{ filter: "url(#shadow)" }}
                >
                  {data.map((entry, index) => (
                    <recharts.Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </recharts.Pie>
              <recharts.Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div style={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        padding: '8px 12px',
                        color: 'hsl(var(--card-foreground))'
                      }}>
                        <p style={{ color: 'hsl(var(--card-foreground))', margin: 0, fontWeight: 'bold' }}>
                          {payload[0].name}
                        </p>
                        <p style={{ color: 'hsl(var(--muted-foreground))', margin: 0 }}>
                          {`Value: ${payload[0].value?.toLocaleString()}`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <recharts.Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '12px'
                }}
                formatter={(value: string) => (
                  <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
                )}
              />
            </recharts.PieChart>
          </recharts.ResponsiveContainer>
          </div>
        )
      
      default:
        return <div>Chart type not supported</div>
    }
  }
})), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[300px] sm:h-[350px] animate-pulse">
      <div className="space-y-4 w-full max-w-sm px-4">
        <div className="h-3 sm:h-4 bg-muted rounded w-3/4 mx-auto animate-pulse"></div>
        <div className="h-24 sm:h-32 bg-muted rounded-lg animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-2 sm:h-3 bg-muted rounded w-1/2 mx-auto animate-pulse"></div>
          <div className="h-2 sm:h-3 bg-muted rounded w-1/3 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  )
})

export function ChartCard({ title, description, data, type, className, chartId }: ChartCardProps) {
  const { exportChartAsImage } = useExport()
  const { toast } = useToast()

  const handleExportChart = async () => {
    if (!chartId) {
      toast({
        title: "Export Failed",
        description: "Chart ID not found",
        variant: "destructive",
      })
      return
    }

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
    <Card className={`${className} border-2 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4`}>
      <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
        <div className="flex items-start sm:items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg font-semibold transition-colors duration-300 truncate">{title}</CardTitle>
            {description && (
              <CardDescription className="text-xs sm:text-sm text-muted-foreground transition-colors duration-300 mt-1">{description}</CardDescription>
            )}
          </div>
          {chartId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportChart}
              className="opacity-70 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
              title="Export chart as image"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pl-2 pr-4 sm:pl-2 sm:pr-6 pb-4 sm:pb-6">
        <div className="transition-all duration-300 ease-in-out" id={chartId}>
          <ChartRenderer data={data} type={type} />
        </div>
      </CardContent>
    </Card>
  )
}
