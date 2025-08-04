# ADmyBRAND Insights - Analytics Dashboard

A modern, AI-powered analytics dashboard built for digital marketing agencies. This project showcases beautiful UI/UX design with interactive data visualizations, responsive layouts, and smooth animations.

![Dashboard Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=ADmyBRAND+Insights+Dashboard)

### ✨ Features

### 📊 Dashboard Components
- **Overview Metrics**: Key performance indicators with trend indicators
- **Interactive Charts**: Line charts, bar charts, and pie charts using Recharts
- **Data Tables**: Sortable, filterable tables with pagination
- **Campaign Performance**: Comprehensive campaign tracking table
- **Export Functionality**: PDF reports, CSV data exports, and PNG snapshots
- **Responsive Design**: Mobile-first approach with perfect tablet and desktop layouts

### 🎨 UI/UX Excellence
- **Modern Design System**: Consistent colors, typography, and spacing
- **Dark/Light Mode**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Glass Morphism**: Beautiful backdrop blur effects
- **Loading States**: Elegant loading animations and states
- **Real-time Updates**: Live data simulation with refresh controls

### 📤 Export Capabilities
- **PDF Reports**: Comprehensive analytics reports with charts and tables
- **CSV Data Export**: Raw data export for further analysis
- **Individual Chart Export**: PNG export of specific charts
- **Theme-aware**: Exports respect current light/dark theme settings

### ⚡ Technical Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui with Radix UI primitives
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admybrand
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout with theme provider
│   └── page.tsx        # Main dashboard page
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui base components
│   ├── chart-card.tsx # Chart wrapper component
│   ├── data-table.tsx # Interactive data table
│   ├── metric-card.tsx # KPI metric cards
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx   # Dark/light mode toggle
├── data/              # Mock data and types
│   └── mock-data.ts   # Sample analytics data
└── lib/               # Utility functions
    └── utils.ts       # Tailwind class merging utility
```

## 🎯 Key Components

### MetricCard
Displays key performance indicators with:
- Icon with color-coded background
- Metric value and title
- Percentage change with trend indicators
- Hover animations

### ChartCard
Wrapper component for charts supporting:
- Line charts for trends
- Bar charts for comparisons  
- Pie charts for distributions
- Responsive design
- Interactive tooltips

### DataTable
Advanced table component featuring:
- Column sorting (ascending/descending)
- Search functionality
- Pagination controls
- Status badges
- Responsive design

## 🎨 Design System

### Colors
The dashboard uses a carefully crafted color palette:
- **Primary**: Blue tones for main actions
- **Secondary**: Neutral grays for backgrounds
- **Success**: Green for positive metrics
- **Warning**: Orange for attention items
- **Error**: Red for critical alerts

### Typography
- **Headings**: Inter font family with proper hierarchy
- **Body**: Optimized line heights and spacing
- **Code**: Monospace for technical content

### Spacing
Consistent spacing using Tailwind's spacing scale (4px base unit).

## 🌙 Theme Support

The dashboard supports both light and dark modes:
- **System Detection**: Automatically detects user preference
- **Manual Toggle**: Users can override system preference
- **Persistent**: Choice is saved in localStorage
- **Smooth Transitions**: Animated theme transitions

## 📱 Responsive Design

The dashboard is optimized for all screen sizes:
- **Mobile**: Stacked layout with touch-friendly interactions
- **Tablet**: Optimized grid layouts
- **Desktop**: Full multi-column layout
- **Large Screens**: Enhanced spacing and typography

## 🔧 Customization

### Adding New Metrics
1. Update the `DashboardMetric` type in `src/data/mock-data.ts`
2. Add new metric data to the `dashboardMetrics` array
3. Import and use the appropriate icon from Lucide React

### Creating New Charts
1. Add chart data to `src/data/mock-data.ts`
2. Use the `ChartCard` component with your data
3. Specify the chart type: 'line', 'bar', or 'pie'

### Styling Customization
- Modify `tailwind.config.js` for design system changes
- Update CSS custom properties in `globals.css`
- Add new component variants in respective component files

## 🚀 Deployment

The project is ready for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

For production builds:
```bash
npm run build
npm start
```

## 📊 Mock Data

The dashboard uses realistic mock data including:
- Revenue trends over 12 months
- Traffic source distributions
- Campaign performance metrics
- User engagement data
- Conversion tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Recharts** for beautiful chart components
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the comprehensive icon set
- **Framer Motion** for smooth animations

---

Built with ❤️ for digital marketing agencies worldwide.
