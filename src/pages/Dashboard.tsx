import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  FolderOpen, 
  Timer, 
  AlertTriangle, 
  Receipt, 
  Calendar,
  User,
  LayoutGrid,
  TrendingUp,
  TrendingDown,
  Download,
  Settings,
  EyeOff
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useUser } from '../lib/UserContext';
import { TECHNOLOGISTS, MONTHLY_TREND } from '../constants';

const KPICard = ({ title, value, unit, trend, trendValue, icon: Icon, iconColor }: any) => (
  <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col justify-between h-[140px]">
    <div className="flex justify-between items-start">
      <span className="font-label-caps text-secondary tracking-wider">{title}</span>
      <Icon className={cn("w-5 h-5", iconColor)} />
    </div>
    <div className="flex items-baseline gap-2">
      <span className="font-display-lg text-[42px] leading-none">
        {value}{unit && <span className="text-[20px] text-secondary ml-1">{unit}</span>}
      </span>
      <span className={cn(
        "font-data-mono flex items-center gap-0.5",
        trend === 'up' ? "text-primary" : "text-[#2e7d32]"
      )}>
        {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {trendValue}
      </span>
    </div>
  </div>
);

export default function Dashboard() {
  const { isAdmin } = useUser();
  const [timeRange, setTimeRange] = React.useState('Monthly');
  const [showCustomizer, setShowCustomizer] = React.useState(false);
  
  // Widget visibility state
  const [visibleWidgets, setVisibleWidgets] = React.useState({
    kpis: true,
    volumeTrend: true,
    locationTotals: true,
    modalityTotals: true,
    techBreakdown: true
  });

  const toggleWidget = (id: keyof typeof visibleWidgets) => {
    setVisibleWidgets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const chartDataWeekly = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 210 },
    { name: 'Wed', value: 180 },
    { name: 'Thu', value: 280 },
    { name: 'Fri', value: 190 },
    { name: 'Sat', value: 320 },
    { name: 'Sun', value: 240 },
  ];

  const chartDataMonthly = [
    { name: 'Jan', value: 980 },
    { name: 'Feb', value: 1100 },
    { name: 'Mar', value: 1050 },
    { name: 'Apr', value: 1280 },
    { name: 'May', value: 1400 },
    { name: 'Jun', value: 1320 },
    { name: 'Jul', value: 1350 },
    { name: 'Aug', value: 1410 },
    { name: 'Sep', value: 1521 },
  ];

  const chartDataQuarterly = [
    { name: 'Q1 2023', value: 3130 },
    { name: 'Q2 2023', value: 4000 },
    { name: 'Q3 2023', value: 4281 },
    { name: 'Q4 2023 (Est)', value: 4600 },
  ];

  const chartDataYearly = [
    { name: '2021', value: 12400 },
    { name: '2022', value: 14800 },
    { name: '2023 (YTD)', value: 11411 },
  ];

  const getChartData = () => {
    switch (timeRange) {
      case 'Weekly': return chartDataWeekly;
      case 'Quarterly': return chartDataQuarterly;
      case 'Yearly': return chartDataYearly;
      default: return chartDataMonthly;
    }
  };

  const modalityBreakdown = [
    { name: 'CT Angiography', value: 45, color: 'bg-primary' },
    { name: 'MRI Cardiac', value: 30, color: 'bg-tertiary' },
    { name: 'PET CT Fusion', value: 15, color: 'bg-secondary' },
    { name: 'Other', value: 10, color: 'bg-outline-variant' },
  ];

  const locationTotals = [
    { name: 'WC (Main)', value: 1840, percent: 43 },
    { name: 'BMH', value: 1020, percent: 24 },
    { name: 'LM', value: 680, percent: 16 },
    { name: 'CU', value: 430, percent: 10 },
    { name: 'NYPQ', value: 311, percent: 7 },
  ];

  const techTypeData = [
    { name: 'S. Jenkins', cardiac: 450, neuro: 320, ortho: 210, other: 174 },
    { name: 'M. Torres', cardiac: 380, neuro: 290, ortho: 180, other: 178 },
    { name: 'D. Wu', cardiac: 340, neuro: 310, ortho: 150, other: 185 },
    { name: 'E. Chen', cardiac: 290, neuro: 240, ortho: 120, other: 164 },
    { name: 'R. Davis', cardiac: 110, neuro: 80, ortho: 55, other: 55 },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header & Filters */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h1 className="font-display-lg">Metrics</h1>
          <p className="font-body-md text-secondary">Performance and throughput analysis for IDEAL.</p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button 
              onClick={() => setShowCustomizer(!showCustomizer)}
              className={cn(
                "h-10 px-4 flex items-center gap-2 rounded font-body-sm transition-all border",
                showCustomizer ? "bg-primary text-on-primary border-primary" : "bg-surface-container text-on-surface border-outline-variant hover:bg-surface-container-high"
              )}
            >
              <LayoutGrid size={18} /> 
              {showCustomizer ? "Finish Customizing" : "Customize Layout"}
            </button>
          )}
          <a 
            href="/report-viewer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="h-10 px-4 flex items-center gap-2 bg-tertiary text-on-tertiary rounded font-body-sm hover:opacity-90 transition-opacity"
          >
            <Receipt size={18} /> View Detailed Report
          </a>
          <div className="flex flex-wrap gap-stack bg-surface-container px-4 py-2 rounded-lg border border-outline-variant">
            <div className="flex items-center gap-2 border-r border-outline-variant pr-4">
              <Calendar size={18} className="text-secondary" />
              <select className="bg-transparent border-none font-body-sm focus:ring-0 p-0 cursor-pointer text-on-surface">
                <option>Last 30 Days</option>
                <option>This Quarter</option>
                <option>Year to Date</option>
              </select>
            </div>
            <div className="flex items-center gap-2 border-r border-outline-variant pr-4 pl-2">
              <User size={18} className="text-secondary" />
              <select className="bg-transparent border-none font-body-sm focus:ring-0 p-0 cursor-pointer text-on-surface">
                <option>All Technicians</option>
                {TECHNOLOGISTS.map(t => <option key={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <LayoutGrid size={18} className="text-secondary" />
              <select className="bg-transparent border-none font-body-sm focus:ring-0 p-0 cursor-pointer text-on-surface">
                <option>All Modalities</option>
                <option>CT</option>
                <option>MRI</option>
                <option>PET/CT</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Panel */}
      {showCustomizer && (
        <div className="bg-primary-container/10 border-2 border-dashed border-primary/30 p-6 rounded-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Settings size={20} />
            <h3 className="font-title-sm">Customize Metrics Layout</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'kpis', label: 'KPI Summary Cards' },
              { id: 'volumeTrend', label: 'Processing Volume Trend' },
              { id: 'locationTotals', label: 'Totals by Location' },
              { id: 'modalityTotals', label: 'Top Modalities' },
              { id: 'techBreakdown', label: 'Volume by Tech & Type' }
            ].map(w => (
              <label key={w.id} className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-full border cursor-pointer transition-all",
                visibleWidgets[w.id as keyof typeof visibleWidgets] 
                  ? "bg-primary text-on-primary border-primary shadow-sm" 
                  : "bg-surface border-outline-variant text-secondary opacity-60"
              )}>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={visibleWidgets[w.id as keyof typeof visibleWidgets]}
                  onChange={() => toggleWidget(w.id as keyof typeof visibleWidgets)}
                />
                <span className="font-label-caps text-[10px]">{w.label}</span>
                {visibleWidgets[w.id as keyof typeof visibleWidgets] ? <TrendingUp size={14} /> : <EyeOff size={14} />}
              </label>
            ))}
          </div>
          <p className="text-[10px] text-secondary mt-4 italic">Note: Changes here only affect your current view. Admin-wide defaults can be locked in the System Settings.</p>
        </div>
      )}

      {/* KPI Cards Grid */}
      {visibleWidgets.kpis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-grid">
          <KPICard 
            title="Total Cases (Month)" 
            value="1,284" 
            trend="up" 
            trendValue="+12%" 
            icon={FolderOpen} 
            iconColor="text-tertiary" 
          />
          <KPICard 
            title="Avg Processing Time" 
            value="42" 
            unit="min" 
            trend="down" 
            trendValue="-5%" 
            icon={Timer} 
            iconColor="text-tertiary" 
          />
          <KPICard 
            title="Critical Cases SLA" 
            value="98.5" 
            unit="%" 
            trend="down" 
            trendValue="On Target" 
            icon={AlertTriangle} 
            iconColor="text-primary" 
          />
          <KPICard 
            title="Total RVUs" 
            value="3,450" 
            trend="up" 
            trendValue="+8%" 
            icon={Receipt} 
            iconColor="text-tertiary-container" 
          />
        </div>
      )}

      {/* Main Charts Area */}
      {(visibleWidgets.volumeTrend || visibleWidgets.locationTotals || visibleWidgets.modalityTotals) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid">
          {/* Large Chart: Processing Volume Trend */}
          {visibleWidgets.volumeTrend && (
            <div className={cn(
              "bg-surface-container-lowest border border-outline-variant rounded-lg p-6 min-h-[440px] flex flex-col",
              (!visibleWidgets.locationTotals && !visibleWidgets.modalityTotals) ? "lg:col-span-3" : "lg:col-span-2"
            )}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-title-sm">Processing Volume Trend</h3>
                <div className="flex gap-1 bg-surface-container p-1 rounded">
                  {['Weekly', 'Monthly', 'Quarterly', 'Yearly'].map((range) => (
                    <button 
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={cn(
                        "px-3 py-1 font-label-caps rounded text-[10px] transition-colors",
                        timeRange === range ? "bg-primary text-on-primary" : "text-secondary hover:text-primary"
                      )}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height={340}>
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3BEB9" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#5D5F5F', fontFamily: 'Public Sans' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#5D5F5F', fontFamily: 'Public Sans' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }} 
                      contentStyle={{ 
                        backgroundColor: '#1B1C1C', 
                        border: 'none', 
                        borderRadius: '4px',
                        color: '#FFFFFF',
                        fontSize: '12px'
                      }} 
                    />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                      {getChartData().map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index === getChartData().length - 1 ? "#8d000a" : "#D6E3FF"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Right Column Breakdown Charts */}
          {(visibleWidgets.locationTotals || visibleWidgets.modalityTotals) && (
            <div className={cn(
              "flex flex-col gap-grid",
              !visibleWidgets.volumeTrend ? "lg:col-span-3 lg:grid lg:grid-cols-2" : ""
            )}>
              {/* Cases by Location */}
              {visibleWidgets.locationTotals && (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex-1">
                  <h3 className="font-title-sm mb-4">Totals by Location</h3>
                  <div className="flex flex-col gap-4">
                    {locationTotals.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between font-body-sm mb-1">
                          <span className="text-on-background">{item.name}</span>
                          <span className="font-data-mono font-bold text-secondary">{item.value.toLocaleString()} <span className="text-[10px] opacity-70 ml-1">({item.percent}%)</span></span>
                        </div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div className="h-full bg-tertiary transition-all duration-500" style={{ width: `${item.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cases by Modality */}
              {visibleWidgets.modalityTotals && (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex-1">
                  <h3 className="font-title-sm mb-4">Top Modalities</h3>
                  <div className="flex flex-col gap-4">
                    {modalityBreakdown.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between font-body-sm mb-1">
                          <span className="text-on-background">{item.name}</span>
                          <span className="font-data-mono font-bold">{item.value}%</span>
                        </div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div className={cn("h-full transition-all duration-500", item.color)} style={{ width: `${item.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Integrated Volume by Tech & Type */}
      {visibleWidgets.techBreakdown && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col min-h-[460px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-title-sm">Volume by Technologist and Case Type</h3>
              <p className="text-[12px] text-secondary mt-1">Total cases processed in the current period, categorized by study type.</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-sm bg-primary"></div>
                 <span className="text-[10px] font-label-caps text-secondary">Cardiac</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-sm bg-tertiary"></div>
                 <span className="text-[10px] font-label-caps text-secondary">Neuro</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-sm bg-secondary"></div>
                 <span className="text-[10px] font-label-caps text-secondary">Ortho</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-sm bg-outline-variant"></div>
                 <span className="text-[10px] font-label-caps text-secondary">Other</span>
               </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={techTypeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3BEB9" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#1B1C1C', fontFamily: 'Public Sans', fontWeight: 600 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#5D5F5F', fontFamily: 'Public Sans' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#F5F3F3' }} 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E3BEB9', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    color: '#1B1C1C'
                  }} 
                />
                <Bar dataKey="cardiac" stackId="a" fill="#8d000a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="neuro" stackId="a" fill="#004386" radius={[0, 0, 0, 0]} />
                <Bar dataKey="ortho" stackId="a" fill="#5d5f5f" radius={[0, 0, 0, 0]} />
                <Bar dataKey="other" stackId="a" fill="#e3beb9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
