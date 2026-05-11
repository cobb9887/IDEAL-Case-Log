import React from 'react';
import { 
  Upload, 
  Download, 
  RefreshCcw, 
  Calendar, 
  User, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ACTIVITY_LOGS } from '../constants';

export default function ActivityLogs() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="mb-grid border-b border-outline-variant pb-stack flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="font-headline-md font-semibold text-on-surface">System Activity Logs</h2>
          <p className="font-body-sm text-secondary mt-1">Audit trail of all administrative and user actions within the 3D Lab system.</p>
        </div>
        <div className="flex gap-2">
          <button className="h-10 px-4 bg-surface-container text-on-surface border border-outline-variant rounded font-body-sm font-medium hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <Upload size={18} /> Import CSV
          </button>
          <button className="h-10 px-4 bg-surface-container text-on-surface border border-outline-variant rounded font-body-sm font-medium hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <Download size={18} /> Export CSV
          </button>
          <button className="h-10 px-4 bg-tertiary text-on-tertiary rounded font-body-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <RefreshCcw size={18} /> Refresh Logs
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-grid flex flex-wrap gap-stack items-end shadow-sm">
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-caps text-secondary mb-1">Date Range</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text"
              placeholder="Last 7 Days (Oct 18 - Oct 24)"
              className="w-full h-10 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-on-surface focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-caps text-secondary mb-1">User</label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <select className="w-full h-10 pl-9 pr-8 bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-on-surface focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none appearance-none cursor-pointer">
              <option value="">All Users</option>
              <option value="dr_smith">Dr. J. Smith</option>
              <option value="tech_jones">Tech M. Jones</option>
              <option value="system">System Automated</option>
            </select>
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-caps text-secondary mb-1">Action Type</label>
          <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <select className="w-full h-10 pl-9 pr-8 bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-on-surface focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none appearance-none cursor-pointer">
              <option value="">All Actions</option>
              <option value="create">Creation Events</option>
              <option value="modify">Modifications</option>
              <option value="delete">Deletions</option>
              <option value="auth">Authentication</option>
            </select>
          </div>
        </div>
        <button className="h-10 px-6 bg-surface-container text-on-surface border border-outline-variant rounded font-body-sm font-medium hover:bg-surface-container-high transition-colors">
          Clear Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="py-3 px-4 font-label-caps text-secondary font-semibold w-52">Timestamp (UTC)</th>
                <th className="py-3 px-4 font-label-caps text-secondary font-semibold w-48">User</th>
                <th className="py-3 px-4 font-label-caps text-secondary font-semibold w-64">Action</th>
                <th className="py-3 px-4 font-label-caps text-secondary font-semibold">Details</th>
                <th className="py-3 px-4 font-label-caps text-secondary font-semibold w-24 text-center">Severity</th>
              </tr>
            </thead>
            <tbody className="font-data-mono divide-y divide-outline-variant">
              {ACTIVITY_LOGS.map((log) => (
                <tr 
                  key={log.id} 
                  className={cn(
                    "hover:bg-surface-container-low transition-colors h-10",
                    (log.severity === 'warning' || log.severity === 'critical') && "border-l-4",
                    log.severity === 'warning' && "border-l-amber-500 bg-amber-50/30",
                    log.severity === 'critical' && "border-l-primary bg-error-container/10"
                  )}
                >
                  <td className="py-2 px-4 text-secondary">{log.timestamp}</td>
                  <td className="py-2 px-4 text-on-surface">{log.user}</td>
                  <td className={cn(
                    "py-2 px-4 font-medium",
                    log.severity === 'critical' ? "text-primary" : "text-on-surface"
                  )}>
                    {log.action}
                  </td>
                  <td className="py-2 px-4 text-secondary text-sm">{log.details}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center">
                      {log.severity === 'info' && <div className="w-2.5 h-2.5 rounded-full bg-tertiary" title="Info" />}
                      {log.severity === 'success' && <div className="w-2.5 h-2.5 rounded-full bg-green-500" title="Success" />}
                      {log.severity === 'warning' && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" title="Warning" />}
                      {log.severity === 'critical' && <div className="w-2.5 h-2.5 rounded-full bg-primary" title="Critical" />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-outline-variant p-4 flex flex-col sm:flex-row items-center justify-between bg-surface-container-lowest gap-4">
          <span className="font-body-sm text-secondary">Showing 1 to 25 of 1,248 entries</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-low disabled:opacity-50">
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-tertiary text-on-tertiary font-body-sm font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-low font-body-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-low font-body-sm">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-secondary font-body-sm italic">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-low">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
