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

export interface CaseRecord {
  id: string;
  mrn: string;
  accession: string;
  patientStatus: 'Inpatient' | 'Outpatient';
  modality: string;
  location: string;
  dateOfScan: string;
  processingDate: string;
  submittedDate: string;
  tech: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
}
