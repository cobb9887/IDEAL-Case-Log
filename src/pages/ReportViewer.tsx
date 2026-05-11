import React from 'react';
import { 
  Download, 
  Printer, 
  BarChart3, 
  Timer, 
  CheckCircle2, 
  TrendingUp, 
  Receipt, 
  User,
  Layout
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';
import { TECHNOLOGISTS, CASE_VOLUMES, MODALITY_STATS, MONTHLY_TREND } from '../constants';

export default function ReportViewer() {
  return (
    <div className="bg-surface-container-high min-h-screen py-12 flex flex-col items-center gap-12 overflow-x-hidden">
      {/* Top Action Bar */}
      <div className="fixed top-0 left-0 w-full bg-surface shadow-sm h-16 flex items-center justify-between px-container z-50">
        <div className="font-title-sm">Report Viewer</div>
        <div className="flex gap-4">
          <button className="bg-primary text-on-primary px-4 py-2 rounded font-body-md flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Download size={20} /> Export PDF
          </button>
          <button className="border border-outline text-primary px-4 py-2 rounded font-body-md flex items-center gap-2 hover:bg-surface-container-low transition-colors">
            <Printer size={20} /> Print
          </button>
        </div>
      </div>

      {/* Simulated PDF Page */}
      <div className="pdf-container bg-surface w-full max-w-[850px] min-h-[1100px] shadow-2xl mt-8 border border-outline-variant flex flex-col p-[60px] relative">
        {/* Header */}
        <header className="border-b-2 border-primary pb-6 mb-10 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h1 className="font-display-lg text-primary uppercase">IDEAL</h1>
            <h2 className="font-headline-md font-semibold text-on-surface">Quarterly Performance Summary</h2>
          </div>
          <div className="text-right flex flex-col gap-1 items-end">
            <div className="w-12 h-12 bg-primary flex items-center justify-center text-on-primary font-bold rounded mb-2">W</div>
            <span className="font-label-caps text-secondary">Report Period: Q3 2023</span>
            <span className="font-body-sm text-secondary">Generated: October 15, 2023</span>
          </div>
        </header>

        {/* Management Summary */}
        <section className="mb-12">
          <h3 className="font-title-sm text-tertiary mb-3 border-b border-outline-variant pb-1 inline-block">Management Summary</h3>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            The Q3 2023 operational period demonstrated a significant 14% year-over-year increase in total 3D post-processing volume, primarily driven by cardiovascular and neurological modalities. Despite the volume surge, the lab maintained a rigorous 98.2% SLA compliance rate. Average processing turnaround time across all service lines remained stable at 48 minutes, indicating resilient staffing models and optimized software workflows. Immediate attention is required for the upcoming scheduled maintenance of Workstation Cluster B, which may temporarily impact throughput in early Q4.
          </p>
        </section>

        {/* Key KPIs */}
        <section className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-container-low p-4 border border-outline-variant rounded flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <BarChart3 size={18} />
              <span className="font-label-caps">Total Cases Processed</span>
            </div>
            <div className="font-display-lg">4,281</div>
            <div className="font-body-sm text-tertiary mt-2 flex items-center gap-1">
              <TrendingUp size={14} /> +14% vs Q2
            </div>
          </div>
          <div className="bg-surface-container-low p-4 border border-outline-variant rounded flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <Timer size={18} />
              <span className="font-label-caps">Avg Processing Time</span>
            </div>
            <div className="font-display-lg">48m</div>
            <div className="font-body-sm text-secondary mt-2 flex items-center gap-1 font-bold italic">
              Steady vs Q2
            </div>
          </div>
          <div className="bg-surface-container-low p-4 border border-outline-variant rounded flex flex-col justify-between border-l-4 border-l-primary">
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <CheckCircle2 size={18} />
              <span className="font-label-caps">SLA Compliance</span>
            </div>
            <div className="font-display-lg text-primary">98.2%</div>
            <div className="font-body-sm text-tertiary mt-2 flex items-center gap-1">
              <TrendingUp size={14} /> +0.5% vs Q2
            </div>
          </div>
        </section>

        {/* Breakdown Sections */}
        <div className="grid grid-cols-2 gap-10 mb-12">
          {/* Modality Distribution */}
          <div>
            <h3 className="font-title-sm mb-4 border-b border-outline-variant pb-1">Volume by Modality</h3>
            <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded h-64 flex items-center pt-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MODALITY_STATS}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {MODALITY_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-48 ml-4 flex flex-col gap-2 font-body-sm">
                {MODALITY_STATS.map((stat) => (
                  <div key={stat.name} className="flex justify-between items-center whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: stat.color }} />
                       <span className="text-[12px]">{stat.name}</span>
                    </div>
                    <span className="font-data-mono">{stat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Volume Trend */}
          <div>
            <h3 className="font-title-sm mb-4 border-b border-outline-variant pb-1">Monthly Volume Trend</h3>
            <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_TREND}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <YAxis hide />
                  <Tooltip wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
                    {MONTHLY_TREND.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? '#8d000a' : '#5D5F5F'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <section className="mb-10">
          <h3 className="font-title-sm mb-4 border-b border-outline-variant pb-1">Volume by Technologist</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded overflow-hidden">
            <table className="w-full text-left font-body-sm">
              <thead className="bg-surface-container-low border-b border-outline-variant text-secondary">
                <tr>
                  <th className="p-3 font-label-caps">Technologist</th>
                  <th className="p-3 font-label-caps text-right">Cases Processed</th>
                  <th className="p-3 font-label-caps text-right">Avg Time (min)</th>
                  <th className="p-3 font-label-caps text-right">RVUs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {TECHNOLOGISTS.map((tech) => (
                  <tr key={tech.name}>
                    <td className="p-3 font-medium">{tech.name}</td>
                    <td className="p-3 text-right font-data-mono">{tech.casesProcessed.toLocaleString()}</td>
                    <td className="p-3 text-right font-data-mono">{tech.avgTime}</td>
                    <td className="p-3 text-right font-data-mono">{tech.rvus.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Case Type Table */}
        <section className="mb-10">
          <h3 className="font-title-sm mb-4 border-b border-outline-variant pb-1">Volume by Case Type</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded overflow-hidden">
            <table className="w-full text-left font-body-sm">
              <thead className="bg-surface-container-low border-b border-outline-variant text-secondary">
                <tr>
                  <th className="p-3 font-label-caps">Case Type</th>
                  <th className="p-3 font-label-caps">Modality</th>
                  <th className="p-3 font-label-caps text-right">Volume</th>
                  <th className="p-3 font-label-caps text-right">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {CASE_VOLUMES.map((cv) => (
                  <tr key={cv.type}>
                    <td className="p-3 font-medium">{cv.type}</td>
                    <td className="p-3 text-secondary text-[12px]">{cv.modality}</td>
                    <td className="p-3 text-right font-data-mono">{cv.volume.toLocaleString()}</td>
                    <td className="p-3 text-right font-data-mono">{cv.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-outline-variant pt-4 flex justify-between items-center text-secondary">
          <span className="font-body-sm italic uppercase tracking-widest text-[10px]">WCM Internal Use Only. Confidential.</span>
          <span className="font-data-mono">Page 1 of 1</span>
        </footer>
      </div>
    </div>
  );
}
