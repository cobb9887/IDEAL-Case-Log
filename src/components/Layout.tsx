import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FilePlus, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  HelpCircle,
  ClipboardList,
  PlusSquare,
  LogOut,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';

import { useUser, UserRole } from '../lib/UserContext';

export default function Layout() {
  const location = useLocation();
  const { role, setRole, isAdmin } = useUser();

  const primaryNav = [
    { name: 'Case Log', path: '/' },
    { name: 'Case Entry', path: '/case-entry' },
    ...(isAdmin ? [{ name: 'Metrics', path: '/admin-metrics' }] : []),
  ];

  const sidebarNav = [
    { name: 'Case Log', path: '/queue', icon: ClipboardList },
    { name: 'New Case', path: '/new-case', icon: PlusSquare },
    ...(isAdmin ? [
      { name: 'Analytics', path: '/analytics', icon: BarChart3 },
      { name: 'Settings', path: '/settings', icon: Settings }
    ] : []),
  ];

  const footerNav = [
    { name: 'Support', path: '/support', icon: HelpCircle },
    { name: 'Logout', path: '/logout', icon: LogOut },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 h-16 bg-background border-b border-outline-variant px-container flex items-center justify-between">
        <div className="flex items-center gap-grid">
          <h1 className="font-display-lg text-primary tracking-tight">IDEAL</h1>
          <nav className="hidden md:flex ml-8 gap-grid h-full items-center">
            {primaryNav.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => cn(
                  "font-title-sm transition-colors px-2 py-1",
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-secondary hover:text-primary"
                )}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-grid">
          {/* Role Switcher for Demo */}
          <div className="flex items-center bg-surface-container rounded-full p-1 mr-4 border border-outline-variant">
            <button 
              onClick={() => setRole('standard')}
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all",
                role === 'standard' ? "bg-primary text-on-primary" : "text-secondary hover:text-primary"
              )}
            >
              Standard
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all",
                role === 'admin' ? "bg-primary text-on-primary" : "text-secondary hover:text-primary"
              )}
            >
              Admin
            </button>
          </div>
          <button className="text-secondary hover:text-primary transition-colors p-2">
            <Search size={20} />
          </button>
          <button className="text-secondary hover:text-primary transition-colors p-2">
            <Bell size={20} />
          </button>
          <button className="text-secondary hover:text-primary transition-colors p-2">
            <HelpCircle size={20} />
          </button>
          <div className="w-8 h-8 rounded-full border border-outline-variant overflow-hidden ml-2">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <div className="flex pt-16 h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-panel bg-surface-container-low border-r border-outline-variant py-grid">
          <div className="px-container pb-grid border-b border-outline-variant mb-grid flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-on-primary rounded flex items-center justify-center font-bold font-headline-md">
              W
            </div>
            <div>
              <h2 className="font-headline-md text-primary leading-none">3D Lab Manager</h2>
              <p className="font-body-sm text-secondary leading-none mt-1">Clinical Precision</p>
            </div>
          </div>

          <div className="px-container mb-grid">
            <button className="w-full bg-primary text-on-primary h-10 rounded font-title-sm font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2 active:opacity-80">
              <Plus size={18} /> Create New Case
            </button>
          </div>

          <nav className="flex-1 px-container flex flex-col gap-1">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 font-label-caps rounded transition-all duration-200",
                    isActive
                      ? "bg-tertiary-container text-on-tertiary-container"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  )}
                >
                  <Icon size={20} className={isActive ? "fill-current" : ""} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          <div className="px-container mt-auto flex flex-col gap-1 pt-grid border-t border-outline-variant">
            {footerNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2 font-label-caps text-on-surface-variant hover:bg-surface-container-high rounded transition-all duration-200"
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-panel overflow-y-auto bg-background p-container">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
