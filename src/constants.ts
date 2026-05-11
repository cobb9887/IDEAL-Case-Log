import { ActivityLog, CaseTypeVolume, TechnologistPerformance } from './types';

export const ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: '1',
    timestamp: '2023-10-24 14:32:01',
    user: 'Tech M. Jones',
    action: 'Modified Protocol Settings',
    details: 'Updated threshold limits for Accession #ACC-98214',
    severity: 'info',
  },
  {
    id: '2',
    timestamp: '2023-10-24 14:15:22',
    user: 'System Automated',
    action: 'Case Status Change',
    details: "Accession #ACC-98210 moved to 'Processing' state",
    severity: 'info',
  },
  {
    id: '3',
    timestamp: '2023-10-24 13:58:45',
    user: 'Dr. J. Smith',
    action: 'Created Case',
    details: 'New CT Scan imported for Accession #ACC-98215',
    severity: 'info',
  },
  {
    id: '4',
    timestamp: '2023-10-24 13:45:10',
    user: 'Tech A. Davis',
    action: 'Export Failed',
    details: 'Failed to push 3D model to PACS for Accession #ACC-98205. Timeout error.',
    severity: 'warning',
  },
  {
    id: '5',
    timestamp: '2023-10-24 13:10:05',
    user: 'Tech M. Jones',
    action: 'User Login',
    details: 'Successful login from Workstation-04 (IP: 192.168.1.104)',
    severity: 'success',
  },
  {
    id: '6',
    timestamp: '2023-10-24 12:55:30',
    user: 'Unknown IP',
    action: 'Failed Authentication',
    details: "3 consecutive failed login attempts for user 'admin'",
    severity: 'critical',
  },
  {
    id: '7',
    timestamp: '2023-10-24 11:30:12',
    user: 'System Automated',
    action: 'Daily Backup',
    details: 'Database backup completed successfully (Size: 4.2GB)',
    severity: 'info',
  },
];

export const TECHNOLOGISTS: TechnologistPerformance[] = [
  { name: 'Sarah Jenkins', casesProcessed: 1154, avgTime: 42, rvus: 3450, casesPercent: 28 },
  { name: 'Michael Torres', casesProcessed: 1028, avgTime: 45, rvus: 2980, casesPercent: 23 },
  { name: 'David Wu', casesProcessed: 985, avgTime: 48, rvus: 2850, casesPercent: 18 },
  { name: 'Emily Chen', casesProcessed: 814, avgTime: 51, rvus: 2100, casesPercent: 15 },
  { name: 'Robert Davis', casesProcessed: 300, avgTime: 55, rvus: 1070, casesPercent: 10 },
];

export const CASE_VOLUMES: CaseTypeVolume[] = [
  { type: 'Coronary CTA', modality: 'Cardiac CT/MR', volume: 1250, percent: 29 },
  { type: 'Stroke Protocol / Perfusion', modality: 'Neuro CTA', volume: 985, percent: 23 },
  { type: 'TAVR Planning', modality: 'Cardiac CT/MR', volume: 676, percent: 16 },
  { type: 'Bone Models / MSK', modality: 'Ortho 3D', volume: 642, percent: 15 },
  { type: 'Aneurysm Evaluation', modality: 'Neuro CTA', volume: 299, percent: 7 },
  { type: 'Other Miscellaneous', modality: 'Other', volume: 429, percent: 10 },
];

export const MODALITY_STATS = [
  { name: 'Cardiac CT/MR', value: 45, color: '#8d000a' },
  { name: 'Neuro CTA', value: 30, color: '#004386' },
  { name: 'Ortho 3D', value: 15, color: '#5d5f5f' },
  { name: 'Other', value: 10, color: '#dbdad9' },
];

export const MONTHLY_TREND = [
  { month: 'July', volume: 1350 },
  { month: 'August', volume: 1410 },
  { month: 'Sept', volume: 1521 },
];
