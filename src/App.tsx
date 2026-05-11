import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ActivityLogs from './pages/ActivityLogs';
import ReportViewer from './pages/ReportViewer';
import AdminSettings from './pages/AdminSettings';

import { UserProvider } from './lib/UserContext';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ActivityLogs />} />
            <Route path="admin-metrics" element={<Dashboard />} />
            <Route path="analytics" element={<Dashboard />} />
            <Route path="queue" element={<ActivityLogs />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="case-entry" element={<div className="p-8 text-center text-secondary">Case Entry Module - Development in Progress</div>} />
            <Route path="new-case" element={<div className="p-8 text-center text-secondary">Create New Case - Development in Progress</div>} />
          </Route>
          <Route path="/report-viewer" element={<ReportViewer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

