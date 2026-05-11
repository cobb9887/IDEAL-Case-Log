import React, { useState, useMemo } from 'react';
import { 
  Download, 
  RefreshCcw, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CASE_RECORDS } from '../constants';
import { CaseRecord } from '../types';

type SortKey = keyof CaseRecord;

export default function CaseLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalityFilter, setModalityFilter] = useState('All Modalities');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedRecords = useMemo(() => {
    let result = [...CASE_RECORDS];

    // Search filtering
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(r => 
        r.accession.toLowerCase().includes(lowerSearch) ||
        r.mrn.toLowerCase().includes(lowerSearch) ||
        r.tech.toLowerCase().includes(lowerSearch)
      );
    }

    // Modality filtering
    if (modalityFilter !== 'All Modalities') {
      result = result.filter(r => r.modality === modalityFilter);
    }

    // Status filtering
    if (statusFilter !== 'All Statuses') {
      result = result.filter(r => r.patientStatus === statusFilter);
    }

    // Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchTerm, modalityFilter, statusFilter, sortConfig]);

  const formatDate = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('-')) return dateStr;
    const [datePart] = dateStr.split(' ');
    const [year, month, day] = datePart.split('-');
    return `${month}/${day}/${year}`;
  };

  const SortIndicator = ({ column }: { column: SortKey }) => {
    if (!sortConfig || sortConfig.key !== column) return <RefreshCcw size={12} className="opacity-0 group-hover:opacity-20" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-primary" /> : <ChevronDown size={14} className="text-primary" />;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="mb-grid border-b border-outline-variant pb-stack flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="font-headline-md font-semibold text-on-surface">Case Log</h2>
          <p className="font-body-sm text-secondary mt-1">Comprehensive list of all 3D post-processing case entries and their status.</p>
        </div>
        <div className="flex gap-2">
          <button className="h-10 px-4 bg-surface-container text-on-surface border border-outline-variant rounded font-body-sm font-medium hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <Download size={18} /> Export List
          </button>
          <button className="h-10 px-4 bg-tertiary text-on-tertiary rounded font-body-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <RefreshCcw size={18} /> Sync Data
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-grid flex flex-wrap gap-stack shadow-sm">
        <div className="flex-1 min-w-[300px] relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            type="text"
            placeholder="Search by MRN, Accession, or Technologist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={modalityFilter}
            onChange={(e) => setModalityFilter(e.target.value)}
            className="h-10 px-3 bg-surface border border-outline-variant rounded font-body-sm text-secondary focus:border-primary outline-none cursor-pointer"
          >
            <option>All Modalities</option>
            <option>CT</option>
            <option>MR</option>
            <option>PET/CT</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 bg-surface border border-outline-variant rounded font-body-sm text-secondary focus:border-primary outline-none cursor-pointer"
          >
            <option>All Statuses</option>
            <option value="Inpatient">Inpatient</option>
            <option value="Outpatient">Outpatient</option>
          </select>
          <button 
            onClick={() => { setSearchTerm(''); setModalityFilter('All Modalities'); setStatusFilter('All Statuses'); setSortConfig(null); }}
            className="h-10 px-4 flex items-center justify-center bg-surface-container border border-outline-variant rounded text-secondary hover:text-primary transition-colors gap-2 font-body-sm font-medium"
          >
            <RefreshCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                {[
                  { label: 'Accession', key: 'accession' },
                  { label: 'MRN', key: 'mrn' },
                  { label: 'Submitted', key: 'submittedDate' },
                  { label: 'Scan Date', key: 'dateOfScan' },
                  { label: 'Processing Date', key: 'processingDate' },
                  { label: 'Modality', key: 'modality' },
                  { label: 'Location', key: 'location' },
                  { label: 'Technologist', key: 'tech' },
                  { label: 'Patient Status', key: 'patientStatus' },
                ].map((col) => (
                  <th 
                    key={col.key}
                    onClick={() => handleSort(col.key as SortKey)}
                    className="py-3 px-4 font-label-caps text-secondary font-semibold cursor-pointer hover:bg-surface-container-high transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-1">
                      {col.label}
                      <SortIndicator column={col.key as SortKey} />
                    </div>
                  </th>
                ))}
                <th className="py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono">
              {filteredAndSortedRecords.length > 0 ? (
                filteredAndSortedRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3 px-4 text-on-surface font-bold">{record.accession}</td>
                    <td className="py-3 px-4 text-secondary">{record.mrn}</td>
                    <td className="py-3 px-4 text-secondary text-[11px]">{formatDate(record.submittedDate)}</td>
                    <td className="py-3 px-4 text-secondary text-[13px]">{formatDate(record.dateOfScan)}</td>
                    <td className="py-3 px-4 text-secondary text-[13px]">{formatDate(record.processingDate)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-outline-variant text-secondary bg-surface-container-low">
                        {record.modality}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-secondary">{record.location}</td>
                    <td className="py-3 px-4 text-on-surface font-medium">{record.tech}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-outline-variant text-secondary bg-surface-container-low">
                          {record.patientStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-secondary italic font-body-md">
                    No records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="border-t border-outline-variant p-4 flex flex-col sm:flex-row items-center justify-between bg-surface-container-lowest gap-4">
          <span className="font-body-sm text-secondary">Showing {filteredAndSortedRecords.length} records</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-low disabled:opacity-50">
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-body-sm font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-low font-body-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-secondary hover:bg-surface-container-low">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
