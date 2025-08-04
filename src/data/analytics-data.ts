export interface AnalyticsData {
  id: number
  date: string
  campaign: string
  country: string
  status: "Active" | "Paused" | "Completed"
  revenue: number
  conversions: number
  users: number
}

export const analyticsData: AnalyticsData[] = [
  {
    id: 1,
    date: "2025-08-01",
    campaign: "Summer Sale",
    country: "India",
    status: "Active",
    revenue: 3000,
    conversions: 100,
    users: 1500
  },
  {
    id: 2,
    date: "2025-08-02",
    campaign: "Summer Sale",
    country: "USA",
    status: "Active",
    revenue: 4500,
    conversions: 150,
    users: 2200
  },
  {
    id: 3,
    date: "2025-08-03",
    campaign: "Brand Awareness",
    country: "India",
    status: "Active",
    revenue: 2800,
    conversions: 85,
    users: 1800
  },
  {
    id: 4,
    date: "2025-08-04",
    campaign: "Holiday Promo",
    country: "UK",
    status: "Paused",
    revenue: 3200,
    conversions: 120,
    users: 1900
  },
  {
    id: 5,
    date: "2025-07-28",
    campaign: "Summer Sale",
    country: "India",
    status: "Active",
    revenue: 2900,
    conversions: 95,
    users: 1400
  },
  {
    id: 6,
    date: "2025-07-29",
    campaign: "Brand Awareness",
    country: "Canada",
    status: "Completed",
    revenue: 3500,
    conversions: 130,
    users: 2000
  },
  {
    id: 7,
    date: "2025-07-30",
    campaign: "Holiday Promo",
    country: "USA",
    status: "Active",
    revenue: 4200,
    conversions: 140,
    users: 2300
  },
  {
    id: 8,
    date: "2025-07-31",
    campaign: "Summer Sale",
    country: "UK",
    status: "Active",
    revenue: 3800,
    conversions: 125,
    users: 2100
  },
  {
    id: 9,
    date: "2025-08-05",
    campaign: "Brand Awareness",
    country: "India",
    status: "Active",
    revenue: 3100,
    conversions: 110,
    users: 1700
  },
  {
    id: 10,
    date: "2025-08-06",
    campaign: "Holiday Promo",
    country: "Canada",
    status: "Active",
    revenue: 3600,
    conversions: 135,
    users: 1950
  }
]

export const campaignOptions = ["All", "Summer Sale", "Brand Awareness", "Holiday Promo"]
export const countryOptions = ["All", "India", "USA", "UK", "Canada"]
export const statusOptions = ["All", "Active", "Paused", "Completed"]
export const metricOptions = ["revenue", "conversions", "users"] as const
