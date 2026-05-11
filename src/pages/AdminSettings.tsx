import React from 'react';
import { 
  Plus, 
  GripVertical, 
  Edit2, 
  Trash2, 
  EyeOff
} from 'lucide-react';
import { cn } from '../lib/utils';

import { useUser } from '../lib/UserContext';

export default function AdminSettings() {
  const { isAdmin } = useUser();

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h2 className="font-headline-md text-primary">Access Denied</h2>
        <p className="text-secondary mt-2">You do not have administrative privileges to manage protocols.</p>
      </div>
    );
  }

  const modalities = [
    { name: 'CT', status: 'Active' },
    { name: 'MR', status: 'Active' },
    { name: 'PET/CT', status: 'Hidden' },
  ];

  const categories = [
    { name: 'Chest', status: 'Active' },
    { name: 'Abdomen', status: 'Active' },
    { name: 'Cardiac', status: 'Active' },
  ];

  const protocols = [
    { name: 'TAVR', rvu: 2.5 },
    { name: 'TMVR', rvu: 3.0 },
    { name: 'Calcium Score', rvu: 1.2 },
    { name: 'Coronary', rvu: 2.0 },
    { name: 'Robotic', rvu: 0.0, hidden: true },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="mb-8 border-b border-outline-variant pb-6">
        <h1 className="font-display-lg">Settings</h1>
        <p className="font-body-md text-secondary mt-1">Manage clinical categories and protocol options for IDEAL.</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack">
        {/* Modalities Section */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col h-[400px]">
          <header className="bg-surface-container-low px-4 py-3 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-title-sm">Modalities</h3>
            <button className="bg-primary hover:opacity-90 text-on-primary font-body-sm px-3 py-1.5 rounded flex items-center gap-1 transition-opacity min-h-[32px]">
              <Plus size={16} /> Add
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {modalities.map((item) => (
                <li key={item.name} className={cn(
                  "group flex items-center justify-between p-2 rounded hover:bg-surface-container-low border border-transparent hover:border-outline-variant transition-colors min-h-[40px]",
                  item.status === 'Hidden' && "opacity-70"
                )}>
                  <div className="flex items-center gap-3">
                    <GripVertical size={20} className="text-secondary cursor-grab active:cursor-grabbing" />
                    <span className={cn(
                      "font-body-md font-medium",
                      item.status === 'Hidden' && "line-through text-secondary"
                    )}>
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                      item.status === 'Active' ? "bg-tertiary-container/20 text-tertiary" : "bg-surface-container-highest text-secondary"
                    )}>
                      {item.status}
                    </span>
                    <button className="text-secondary hover:text-tertiary p-1"><Edit2 size={18} /></button>
                    <button className="text-secondary hover:text-primary p-1"><Trash2 size={18} /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col h-[400px]">
          <header className="bg-surface-container-low px-4 py-3 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-title-sm">Exam Categories</h3>
            <button className="bg-primary hover:opacity-90 text-on-primary font-body-sm px-3 py-1.5 rounded flex items-center gap-1 transition-opacity min-h-[32px]">
              <Plus size={16} /> Add
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {categories.map((item) => (
                <li key={item.name} className="group flex items-center justify-between p-2 rounded hover:bg-surface-container-low border border-transparent hover:border-outline-variant transition-colors min-h-[40px]">
                  <div className="flex items-center gap-3">
                    <GripVertical size={20} className="text-secondary cursor-grab" />
                    <span className="font-body-md font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-tertiary-container/20 text-tertiary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                    <button className="text-secondary hover:text-tertiary p-1"><Edit2 size={18} /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Protocols Section */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col min-h-[400px] lg:col-span-2">
          <header className="bg-surface-container-low px-4 py-3 border-b border-outline-variant flex justify-between items-center">
            <div>
              <h3 className="font-title-sm">Modifiers / Specialized Protocols</h3>
              <p className="text-[12px] text-secondary mt-0.5">Drag to reorder options presented in the Case Entry form.</p>
            </div>
            <button className="bg-primary hover:opacity-90 text-on-primary font-body-sm px-3 py-1.5 rounded flex items-center gap-1 transition-opacity min-h-[32px]">
              <Plus size={16} /> Add Protocol
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 content-start">
            {protocols.map((protocol) => (
              <div key={protocol.name} className={cn(
                "group flex items-center justify-between p-2 rounded border transition-colors min-h-[48px]",
                protocol.hidden 
                  ? "bg-surface-container-high opacity-60 border-outline-variant" 
                  : "bg-surface-container-lowest border-outline-variant hover:bg-surface-container-low shadow-sm"
              )}>
                <div className="flex items-center gap-2">
                  <GripVertical size={18} className="text-secondary cursor-grab" />
                  <span className={cn("font-body-md", protocol.hidden && "line-through text-secondary")}>
                    {protocol.name}
                  </span>
                  <div className="flex items-center gap-1 ml-4">
                    <label className="text-[10px] font-bold text-secondary uppercase">RVU</label>
                    <input 
                      type="number" 
                      defaultValue={protocol.rvu}
                      step="0.1"
                      className="w-16 h-7 text-xs rounded border-outline-variant bg-surface-container-lowest focus:ring-primary focus:border-primary px-2"
                      disabled={protocol.hidden}
                    />
                  </div>
                </div>
                {protocol.hidden ? (
                  <span className="text-[10px] font-bold text-secondary uppercase mr-2">Hidden</span>
                ) : (
                  <button className="text-secondary hover:text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
