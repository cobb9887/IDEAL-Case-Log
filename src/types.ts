export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  severity: 'info' | 'warning' | 'success' | 'critical';
}

export interface TechnologistPerformance {
  name: string;
  casesProcessed: number;
  avgTime: number;
  rvus: number;
  casesPercent: number;
}

export interface CaseTypeVolume {
  type: string;
  modality: string;
  volume: number;
  percent: number;
}
