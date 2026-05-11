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
  Download
} from 'lucide-react';
import { cn } from '../lib/utils';
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
  const chartData = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 210 },
    { name: 'Wed', value: 180 },
    { name: 'Thu', value: 280 },
    { name: 'Fri', value: 190 },
    { name: 'Sat', value: 320 },
    { name: 'Sun', value: 240 },
  ];

  const modalityBreakdown = [
    { name: 'CT Angiography', value: 45, color: 'bg-tertiary-container', barWidth: 'w-[45%]' },
    { name: 'MRI Cardiac', value: 30, color: 'bg-tertiary', barWidth: 'w-[30%]' },
    { name: 'PET CT Fusion', value: 15, color: 'bg-secondary', barWidth: 'w-[15%]' },
    { name: 'Other', value: 10, color: 'bg-outline-variant', barWidth: 'w-[10%]' },
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
              <select className="bg-transparent border-none font-body-sm focus:ring-0 p-0 cursor-pointer">
                <option>Last 30 Days</option>
                <option>This Quarter</option>
                <option>Year to Date</option>
              </select>
            </div>
            <div className="flex items-center gap-2 border-r border-outline-variant pr-4 pl-2">
              <User size={18} className="text-secondary" />
              <select className="bg-transparent border-none font-body-sm focus:ring-0 p-0 cursor-pointer">
                <option>All Technicians</option>
                <option>Dr. A. Smith</option>
                <option>T. Johnson</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <LayoutGrid size={18} className="text-secondary" />
              <select className="bg-transparent border-none font-body-sm focus:ring-0 p-0 cursor-pointer">
                <option>All Modalities</option>
                <option>CT</option>
                <option>MRI</option>
              </select>
            </div>
          </div>
          <button className="p-2 bg-surface border border-outline-variant rounded-lg text-secondary hover:text-primary transition-colors">
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
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

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid">
        {/* Large Chart: Processing Volume Trend */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-title-sm">Processing Volume Trend</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-surface-container font-label-caps rounded text-on-surface">Weekly</button>
              <button className="px-3 py-1 bg-transparent border border-outline-variant font-label-caps rounded text-secondary">Monthly</button>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
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
                    color: '#FFFFFF'
                  }} 
                />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? "#005AB0" : "#D6E3FF"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column Breakdown Charts */}
        <div className="flex flex-col gap-grid">
          {/* Cases by Modality */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex-1">
            <h3 className="font-title-sm mb-4">Cases by Modality</h3>
            <div className="flex flex-col gap-4">
              {modalityBreakdown.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between font-body-sm mb-1">
                    <span className="text-on-background">{item.name}</span>
                    <span className="font-data-mono font-bold">{item.value}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className={cn("h-full transition-all duration-500", item.color, item.barWidth)}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RVU Generation by Tech */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex-1">
            <h3 className="font-title-sm mb-4">RVU Generation by Tech</h3>
            <div className="flex flex-col gap-4">
              {TECHNOLOGISTS.slice(0, 3).map((tech, i) => (
                <div key={tech.name}>
                  <div className="flex justify-between font-body-sm mb-1">
                    <span className="text-on-background">{tech.name}</span>
                    <span className="font-data-mono font-bold">{tech.rvus.toLocaleString()} RVUs</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-500", i === 0 ? "bg-primary" : "bg-primary-fixed-dim")} 
                      style={{ width: `${tech.casesPercent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Anomalies Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-title-sm">Processing Anomalies (SLA Breaches)</h3>
          <button className="font-label-caps text-secondary flex items-center gap-1 hover:text-primary transition-colors">
            <Download size={14} /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low font-label-caps text-secondary">
                <th className="px-6 py-3 font-medium tracking-wider">Case ID</th>
                <th className="px-6 py-3 font-medium tracking-wider">Modality</th>
                <th className="px-6 py-3 font-medium tracking-wider">Patient Status</th>
                <th className="px-6 py-3 font-medium tracking-wider">Technician</th>
                <th className="px-6 py-3 font-medium tracking-wider">Processing Time</th>
                <th className="px-6 py-3 font-medium tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="font-data-mono text-on-background divide-y divide-outline-variant">
              {[
                { id: '#WCM-8921', modality: 'CT Angiography', patient: 'Inpatient', tech: 'A. Smith', time: '1h 45m', status: 'SLA Breach' },
                { id: '#WCM-8910', modality: 'MRI Cardiac', patient: 'Outpatient', tech: 'M. Rivera', time: '2h 10m', status: 'SLA Breach' },
                { id: '#WCM-8905', modality: 'PET CT Fusion', patient: 'Inpatient', tech: 'T. Johnson', time: '1h 15m', status: 'Warning' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-3">{row.id}</td>
                  <td className="px-6 py-3">{row.modality}</td>
                  <td className="px-6 py-3">{row.patient}</td>
                  <td className="px-6 py-3">{row.tech}</td>
                  <td className={cn("px-6 py-3", row.status === 'SLA Breach' ? "text-primary" : "text-amber-600")}>{row.time}</td>
                  <td className="px-6 py-3">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                      row.status === 'SLA Breach' ? "bg-error-container text-on-error-container" : "bg-amber-100 text-amber-800"
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
