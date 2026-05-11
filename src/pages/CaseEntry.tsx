import React, { useState } from 'react';
import { 
  User, 
  Edit, 
  Save, 
  Activity,
  Heart,
  Brain,
  Layers,
  Bone,
  Check,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useUser } from '../lib/UserContext';
import { TECHNOLOGISTS } from '../constants';

export default function CaseEntry() {
  const { role } = useUser();
  const [submitted, setSubmitted] = useState(false);
  const [scanDate, setScanDate] = useState('');
  const [processingDate, setProcessingDate] = useState('');
  const [selectedTech, setSelectedTech] = useState('Benjamin Cobb');
  const [isEditingTech, setIsEditingTech] = useState(false);
  const [tempTech, setTempTech] = useState('Benjamin Cobb');

  // Form selections state
  const [mrn, setMrn] = useState('');
  const [acc1, setAcc1] = useState('');
  const [acc2, setAcc2] = useState('');
  const [acc3, setAcc3] = useState('');
  const [comments, setComments] = useState('');
  const [patientStatus, setPatientStatus] = useState<string | null>(null);
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);

  const toggleMultiSelect = (item: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const getDateString = (offset: number = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  };

  const handleClear = () => {
    setMrn('');
    setAcc1('');
    setAcc2('');
    setAcc3('');
    setComments('');
    setScanDate('');
    setProcessingDate('');
    setPatientStatus(null);
    setSelectedModalities([]);
    setSelectedLocation(null);
    setSelectedCategories([]);
    setSelectedProtocols([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    handleClear();

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
          <h1 className="font-headline-md text-on-surface">Case Entry</h1>
          <p className="text-secondary font-body-sm mt-1">Record diagnostic tracking information for 3D lab processing.</p>
        </div>
        <div className="flex items-center gap-6">
          <button 
            type="button" 
            onClick={handleClear}
            className="text-secondary hover:text-error transition-colors font-label-caps text-[11px] flex items-center gap-1.5 px-2 py-1 rounded hover:bg-error/5"
            title="Reset all form fields"
          >
            <X size={16} /> Clear Form
          </button>
          
          <div className="flex items-center gap-2 text-secondary bg-surface-container-low px-3 py-1.5 rounded border border-outline-variant">
          <User size={18} />
          {isEditingTech ? (
            <div className="flex items-center gap-2">
              <select 
                value={tempTech} 
                onChange={(e) => setTempTech(e.target.value)}
                className="bg-surface border border-outline-variant rounded px-2 py-0.5 font-data-mono text-xs outline-none focus:border-primary"
              >
                <option value="Benjamin Cobb">Benjamin Cobb</option>
                {TECHNOLOGISTS.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
              <button 
                onClick={() => { setSelectedTech(tempTech); setIsEditingTech(false); }}
                className="text-green-600 hover:text-green-700"
              >
                <Check size={16} />
              </button>
              <button 
                onClick={() => { setTempTech(selectedTech); setIsEditingTech(false); }}
                className="text-error hover:text-error/80"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-data-mono">Tech: {selectedTech}</span>
              <button 
                className="hover:text-primary ml-2" 
                type="button"
                onClick={() => { setTempTech(selectedTech); setIsEditingTech(true); }}
              >
                <Edit size={16} />
              </button>
            </div>
          )}
        </div>
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
              <label className="block font-label-caps text-on-surface-variant uppercase">10-Digit MRN *</label>
              <input 
                className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors outline-none" 
                placeholder="e.g., 2039485761" 
                type="text" 
                value={mrn}
                onChange={(e) => setMrn(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-1">
              <label className="block font-label-caps text-on-surface-variant uppercase">11-Digit Accession 1 *</label>
              <input 
                className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors outline-none" 
                placeholder="Required" 
                type="text" 
                value={acc1}
                onChange={(e) => setAcc1(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-label-caps text-on-surface-variant uppercase">Accession 2</label>
              <input 
                className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors outline-none" 
                placeholder="Optional" 
                type="text" 
                value={acc2}
                onChange={(e) => setAcc2(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-label-caps text-on-surface-variant uppercase">Accession 3</label>
              <input 
                className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-colors outline-none" 
                placeholder="Optional" 
                type="text" 
                value={acc3}
                onChange={(e) => setAcc3(e.target.value)}
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
                  <button 
                    type="button" 
                    onClick={() => setScanDate(getDateString(0))}
                    className="px-2 py-0.5 text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim transition-colors rounded border border-tertiary-fixed-dim"
                  >
                    Today
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setScanDate(getDateString(-1))}
                    className="px-2 py-0.5 text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim transition-colors rounded border border-tertiary-fixed-dim"
                  >
                    Yesterday
                  </button>
                </div>
              </div>
              <div className="relative">
                <input 
                  className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none" 
                  type="date" 
                  value={scanDate}
                  onChange={(e) => setScanDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-label-caps text-on-surface-variant uppercase">Date of Processing</label>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setProcessingDate(getDateString(0))}
                    className="px-2 py-0.5 text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim transition-colors rounded border border-tertiary-fixed-dim"
                  >
                    Today
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setProcessingDate(getDateString(-1))}
                    className="px-2 py-0.5 text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim transition-colors rounded border border-tertiary-fixed-dim"
                  >
                    Yesterday
                  </button>
                </div>
              </div>
              <div className="relative">
                <input 
                  className="w-full h-10 px-3 bg-surface border border-outline-variant rounded font-data-mono focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none" 
                  type="date" 
                  value={processingDate}
                  onChange={(e) => setProcessingDate(e.target.value)}
                />
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
                  <button 
                    type="button"
                    onClick={() => setPatientStatus('Outpatient')}
                    className={cn(
                      "flex items-center justify-center gap-2 p-2 border rounded cursor-pointer transition-all font-medium h-10",
                      patientStatus === 'Outpatient' 
                        ? "border-tertiary bg-tertiary text-on-tertiary ring-2 ring-tertiary/20" 
                        : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface"
                    )}
                  >
                    <span className="font-body-sm text-[13px]">Outpatient</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPatientStatus('Inpatient')}
                    className={cn(
                      "flex items-center justify-center gap-2 p-2 border rounded cursor-pointer transition-all font-medium h-10",
                      patientStatus === 'Inpatient' 
                        ? "border-tertiary bg-tertiary text-on-tertiary ring-2 ring-tertiary/20" 
                        : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface"
                    )}
                  >
                    <span className="font-body-sm text-[13px]">Inpatient</span>
                  </button>
                </div>
              </div>

              {/* Modality */}
              <div className="bg-surface-container-low p-4 rounded border border-surface-variant">
                <h4 className="font-label-caps text-on-surface-variant uppercase mb-3 text-[11px]">Modality</h4>
                <div className="grid grid-cols-2 gap-2">
                  {modalities.map((m) => (
                    <button 
                      key={m}
                      type="button"
                      onClick={() => toggleMultiSelect(m, selectedModalities, setSelectedModalities)}
                      className={cn(
                        "flex items-center justify-center gap-2 p-2 border rounded cursor-pointer transition-all font-medium h-10",
                        selectedModalities.includes(m)
                          ? "border-tertiary bg-tertiary text-on-tertiary ring-2 ring-tertiary/20"
                          : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface"
                      )}
                    >
                      <span className="font-body-sm text-[13px]">{m}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-surface-container-low p-4 rounded border border-surface-variant">
                <h4 className="font-label-caps text-on-surface-variant uppercase mb-3 text-[11px]">Location</h4>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((l) => (
                    <button 
                      key={l}
                      type="button"
                      onClick={() => setSelectedLocation(l)}
                      className={cn(
                        "flex items-center justify-center gap-2 p-2 border rounded cursor-pointer transition-all font-medium h-10",
                        selectedLocation === l
                          ? "border-tertiary bg-tertiary text-on-tertiary ring-2 ring-tertiary/20"
                          : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface",
                        l === 'NYPQ' && "col-span-2"
                      )}
                    >
                      <span className="font-body-sm text-[13px]">{l}</span>
                    </button>
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
                    <button 
                      key={c.name}
                      type="button"
                      onClick={() => toggleMultiSelect(c.name, selectedCategories, setSelectedCategories)}
                      className={cn(
                        "flex items-center gap-3 p-2.5 border rounded cursor-pointer transition-all font-medium",
                        selectedCategories.includes(c.name)
                          ? "border-tertiary bg-tertiary text-on-tertiary ring-2 ring-tertiary/20 shadow-md transform scale-[1.02]"
                          : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface"
                      )}
                    >
                      <c.icon size={18} className={cn(
                        "transition-colors",
                        selectedCategories.includes(c.name) ? "text-on-tertiary" : "text-secondary"
                      )} />
                      <span className="font-body-sm text-[13px]">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialized Protocols */}
              <div className="bg-surface-container-low p-4 rounded border border-surface-variant">
                <h4 className="font-label-caps text-on-surface-variant uppercase mb-3 text-[11px]">Modifiers / Specialized Protocols</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
                  {protocols.slice(0, 16).map((p) => (
                    <button 
                      key={p}
                      type="button"
                      onClick={() => toggleMultiSelect(p, selectedProtocols, setSelectedProtocols)}
                      className={cn(
                        "flex items-center justify-center p-2 border rounded cursor-pointer transition-all font-medium text-center min-h-[44px]",
                        selectedProtocols.includes(p)
                          ? "border-tertiary bg-tertiary text-on-tertiary ring-2 ring-tertiary/20 shadow-sm"
                          : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface shadow-xs"
                      )}
                    >
                      <span className="font-body-sm text-[11px] leading-tight">{p}</span>
                    </button>
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
              value={comments}
              onChange={(e) => setComments(e.target.value)}
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
