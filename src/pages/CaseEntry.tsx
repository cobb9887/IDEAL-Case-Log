import React, { useState } from 'react';
import { 
  User, 
  Edit, 
  Save, 
  Activity,
  Heart,
  Brain,
  Layers,
  Bone
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useUser } from '../lib/UserContext';

export default function CaseEntry() {
  const { role } = useUser();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const modalities = ['CT', 'MR', 'PET/CT', 'IR'];
  const locations = ['WC', 'BMH', 'LM', 'CU', 'NYPQ'];
  const categories = [
    { name: 'Chest', icon: Layers },
    { name: 'Abdomen', icon: Layers },
    { name: 'Pelvis', icon: Layers },
    { name: 'CAP', icon: Layers },
    { name: 'Neuro', icon: Brain },
    { name: 'MSK', icon: Bone },
    { name: 'Cardiac', icon: Heart },
    { name: 'Vascular', icon: Activity },
  ];

  const protocols = [
    'TAVR', 'TMVR', 'TTVR', 'PVI', 'Watchman', 'Coronary', 
    'Calcium Score', 'Congenital', 'Run Off', 'Renal Donor', 
    'Robotic', 'Routine Measurements', '3D Only', 'Ortho/Fx', 
    'Prostate', 'Liver - Donor', 'Liver - Y90', 'Liver Volumes',
    'PFA - DIEP', 'PFA - PAP', 'PFA - TDAP', 'PFA - TUG/DUG',
    'PFA - GAP', 'PFA - Other', 'Bone Mineral Density',
    'Fetal Lung', 'Fetal Cardiac'
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="font-headline-md text-on-surface">Primary Case Entry</h1>
          <p className="text-secondary font-body-sm mt-1">Record diagnostic tracking information for 3D lab processing.</p>
        </div>
        <div className="flex items-center gap-2 text-secondary bg-surface-container-low px-3 py-1.5 rounded border border-outline-variant">
          <User size={18} />
          <span className="font-data-mono">Tech: Benjamin Cobb</span>
          <button className="hover:text-primary ml-2" type="button"><Edit size={16} /></button>
        </div>
      </div>

      {submitted && (
        <div className="bg-green-100 border border-green-500 text-green-800 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <Save size={20} className="animate-pulse" />
          <span className="font-medium">Case submitted successfully for processing.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest border border-outline-variant rounded p-6 space-y-8 shadow-sm">
        {/* Identifiers Grid */}
        <div>
          <h3 className="font-title-sm text-on-surface mb-4 border-b border-surface-variant pb-2">Patient Identifiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="block font-label-caps text-on-surface-variant uppercase">MRN *</label>
              <input 
                className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors outline-none" 
                placeholder="e.g., 9876543" 
                type="text" 
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-1">
              <label className="block font-label-caps text-on-surface-variant uppercase">Accession Number 1 *</label>
              <input 
                className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors outline-none" 
                placeholder="Required" 
                type="text" 
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-label-caps text-on-surface-variant uppercase">Accession Number 2</label>
              <input 
                className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors outline-none" 
                placeholder="Optional" 
                type="text" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-label-caps text-on-surface-variant uppercase">Accession Number 3</label>
              <input 
                className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors outline-none" 
                placeholder="Optional" 
                type="text" 
              />
            </div>
          </div>
        </div>

        {/* Chronology */}
        <div>
          <h3 className="font-title-sm text-on-surface mb-4 border-b border-surface-variant pb-2">Chronology</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-label-caps text-on-surface-variant uppercase">Date of Scan</label>
                <div className="flex gap-2">
                  <button type="button" className="px-2 py-0.5 text-[11px] font-semibold bg-surface-container text-secondary hover:bg-surface-variant rounded border border-outline-variant">Today</button>
                  <button type="button" className="px-2 py-0.5 text-[11px] font-semibold bg-surface-container text-secondary hover:bg-surface-variant rounded border border-outline-variant">Yesterday</button>
                </div>
              </div>
              <div className="relative">
                <input className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-label-caps text-on-surface-variant uppercase">Date of Processing</label>
                <div className="flex gap-2">
                  <button type="button" className="px-2 py-0.5 text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed rounded border border-tertiary-fixed-dim">Today</button>
                  <button type="button" className="px-2 py-0.5 text-[11px] font-semibold bg-surface-container text-secondary hover:bg-surface-variant rounded border border-outline-variant">Yesterday</button>
                </div>
              </div>
              <div className="relative">
                <input className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none" type="date" />
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Classification */}
        <div>
          <h3 className="font-title-sm text-on-surface mb-4 border-b border-surface-variant pb-2">Clinical Classification</h3>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-6">
              {/* Patient Status */}
              <div className="bg-surface-container-low p-4 rounded border border-surface-variant">
                <h4 className="font-label-caps text-on-surface-variant uppercase mb-3 text-[11px]">Patient Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2 border border-tertiary-container bg-tertiary-fixed rounded cursor-pointer transition-colors font-medium">
                    <input defaultChecked className="w-4 h-4 text-tertiary border-outline-variant focus:ring-tertiary" name="patient_status" type="radio" value="inpatient" />
                    <span className="font-body-sm text-[13px] text-on-tertiary-fixed">Inpatient</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest rounded cursor-pointer transition-colors">
                    <input className="w-4 h-4 text-tertiary border-outline-variant focus:ring-tertiary" name="patient_status" type="radio" value="outpatient" />
                    <span className="font-body-sm text-[13px] text-on-surface">Outpatient</span>
                  </label>
                </div>
              </div>
              {/* Modality */}
              <div className="bg-surface-container-low p-4 rounded border border-surface-variant">
                <h4 className="font-label-caps text-on-surface-variant uppercase mb-3 text-[11px]">Modality</h4>
                <div className="grid grid-cols-2 gap-2">
                  {modalities.map((m) => (
                    <label key={m} className={cn(
                      "flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors",
                      m === 'CT' ? "border-tertiary-container bg-tertiary-fixed font-medium" : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest"
                    )}>
                      <input defaultChecked={m === 'CT'} className="w-4 h-4 text-tertiary border-outline-variant rounded focus:ring-tertiary" type="checkbox" />
                      <span className={cn("font-body-sm text-[13px]", m === 'CT' ? "text-on-tertiary-fixed" : "text-on-surface")}>{m}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Location */}
              <div className="bg-surface-container-low p-4 rounded border border-surface-variant">
                <h4 className="font-label-caps text-on-surface-variant uppercase mb-3 text-[11px]">Location</h4>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((l) => (
                    <label key={l} className={cn(
                      "flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors",
                      l === 'WC' ? "border-tertiary-container bg-tertiary-fixed font-medium" : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest",
                      l === 'NYPQ' && "col-span-2"
                    )}>
                      <input defaultChecked={l === 'WC'} className="w-4 h-4 text-tertiary border-outline-variant rounded focus:ring-tertiary" type="checkbox" />
                      <span className={cn("font-body-sm text-[13px]", l === 'WC' ? "text-on-tertiary-fixed" : "text-on-surface")}>{l}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {/* Exam Categories */}
              <div className="bg-surface-container-low p-4 rounded border border-surface-variant">
                <h4 className="font-label-caps text-on-surface-variant uppercase mb-3 text-[11px]">Exam Categories</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((c) => (
                    <label key={c.name} className={cn(
                      "flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors",
                      (c.name === 'CAP' || c.name === 'Cardiac') ? "border-tertiary-container bg-tertiary-fixed font-medium" : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest"
                    )}>
                      <input defaultChecked={c.name === 'CAP' || c.name === 'Cardiac'} className="w-4 h-4 text-tertiary border-outline-variant rounded focus:ring-tertiary" type="checkbox" />
                      <span className={cn("font-body-sm text-[13px]", (c.name === 'CAP' || c.name === 'Cardiac') ? "text-on-tertiary-fixed" : "text-on-surface")}>{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Specialized Protocols */}
              <div className="bg-surface-container-low p-4 rounded border border-surface-variant">
                <h4 className="font-label-caps text-on-surface-variant uppercase mb-3 text-[11px]">Modifiers / Specialized Protocols</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {protocols.slice(0, 12).map((p) => (
                    <label key={p} className={cn(
                      "flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors",
                      p === 'TAVR' ? "border-tertiary-container bg-tertiary-fixed font-medium" : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest"
                    )}>
                      <input defaultChecked={p === 'TAVR'} className="w-4 h-4 text-tertiary border-outline-variant rounded focus:ring-tertiary" type="checkbox" />
                      <span className={cn("font-body-sm text-[13px]", p === 'TAVR' ? "text-on-tertiary-fixed" : "text-on-surface")}>{p}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-surface-variant pt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="block font-label-caps text-on-surface-variant uppercase text-[11px]">Comments / Clinical Notes</label>
            <textarea 
              className="w-full h-24 p-3 bg-surface border border-outline-variant rounded font-body-sm text-on-surface focus:border-tertiary focus:ring-1 focus:ring-tertiary resize-y outline-none" 
              placeholder="Enter any specific findings, anomalies, or requests..."
            ></textarea>
          </div>
          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="h-10 px-8 bg-primary text-on-primary rounded font-label-caps uppercase tracking-wider hover:bg-primary-container transition-colors active:shadow-inner flex items-center gap-2 text-[11px]"
            >
              <Save size={18} /> Submit Case
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
