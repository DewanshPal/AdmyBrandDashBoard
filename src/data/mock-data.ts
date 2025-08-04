export interface DashboardMetric {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

export interface TableData {
  id: string;
  campaign: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  status: 'active' | 'paused' | 'completed';
  createdDate: Date;
  lastUpdated: Date;
}

export const dashboardMetrics: DashboardMetric[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    changeLabel: "from last month",
    icon: "DollarSign",
    color: "green"
  },
  {
    title: "Active Users",
    value: "2,350",
    change: 180.1,
    changeLabel: "from last month",
    icon: "Users",
    color: "blue"
  },
  {
    title: "Conversions",
    value: "12,234",
    change: 19,
    changeLabel: "from last month",
    icon: "CreditCard",
    color: "purple"
  },
  {
    title: "Growth Rate",
    value: "23.5%",
    change: 4.3,
    changeLabel: "from last month",
    icon: "Activity",
    color: "orange"
  }
];

export const revenueData: ChartData[] = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
  { name: "Aug", value: 6500 },
  { name: "Sep", value: 8000 },
  { name: "Oct", value: 7500 },
  { name: "Nov", value: 9000 },
  { name: "Dec", value: 8500 }
];

export const trafficSourceData: ChartData[] = [
  { name: "Organic Search", value: 4500 },
  { name: "Paid Ads", value: 3200 },
  { name: "Social Media", value: 2100 },
  { name: "Direct", value: 1800 },
  { name: "Email", value: 1200 },
  { name: "Referral", value: 900 }
];

export const conversionData: ChartData[] = [
  { name: "Week 1", value: 120 },
  { name: "Week 2", value: 150 },
  { name: "Week 3", value: 180 },
  { name: "Week 4", value: 200 },
  { name: "Week 5", value: 170 },
  { name: "Week 6", value: 190 },
  { name: "Week 7", value: 220 },
  { name: "Week 8", value: 250 }
];

export const campaignsData: TableData[] = [
  {
    id: "1",
    campaign: "Summer Sale 2024",
    impressions: 125000,
    clicks: 3200,
    ctr: 2.56,
    cost: 1250.50,
    conversions: 156,
    status: "active",
    createdDate: new Date('2024-07-01'),
    lastUpdated: new Date('2024-08-04')
  },
  {
    id: "2",
    campaign: "Brand Awareness Q3",
    impressions: 89000,
    clicks: 1800,
    ctr: 2.02,
    cost: 890.25,
    conversions: 89,
    status: "active",
    createdDate: new Date('2024-07-15'),
    lastUpdated: new Date('2024-08-03')
  },
  {
    id: "3",
    campaign: "Holiday Promotion",
    impressions: 156000,
    clicks: 4200,
    ctr: 2.69,
    cost: 1680.75,
    conversions: 234,
    status: "completed",
    createdDate: new Date('2024-06-10'),
    lastUpdated: new Date('2024-07-20')
  },
  {
    id: "4",
    campaign: "Product Launch",
    impressions: 67000,
    clicks: 1200,
    ctr: 1.79,
    cost: 450.00,
    conversions: 45,
    status: "paused",
    createdDate: new Date('2024-07-20'),
    lastUpdated: new Date('2024-07-25')
  },
  {
    id: "5",
    campaign: "Retargeting Campaign",
    impressions: 98000,
    clicks: 2800,
    ctr: 2.86,
    cost: 980.30,
    conversions: 167,
    status: "active",
    createdDate: new Date('2024-06-25'),
    lastUpdated: new Date('2024-08-02')
  }
];

export const dailyActiveUsers: ChartData[] = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  value: Math.floor(Math.random() * 1000) + 500,
  date: new Date(2024, 7, i + 1).toISOString().split('T')[0]
}));
