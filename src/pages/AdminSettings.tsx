import React, { useState } from 'react';
import { 
  Plus, 
  GripVertical, 
  Edit2, 
  Trash2, 
  EyeOff,
  Eye,
  Check,
  X,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useUser } from '../lib/UserContext';
import { TECHNOLOGISTS } from '../constants';

interface BaseItem {
  id: string;
  name: string;
  status: 'Active' | 'Hidden';
}

interface Protocol extends BaseItem {
  rvu: number;
}

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Standard';
  status: 'Active' | 'Inactive';
}

export default function AdminSettings() {
  const { isAdmin } = useUser();

  // State for Lists
  const [modalities, setModalities] = useState<BaseItem[]>([
    { id: 'mod-1', name: 'CT', status: 'Active' },
    { id: 'mod-2', name: 'MR', status: 'Active' },
    { id: 'mod-3', name: 'PET/CT', status: 'Hidden' },
    { id: 'mod-4', name: 'IR', status: 'Active' },
  ]);

  const [categories, setCategories] = useState<BaseItem[]>([
    { id: 'cat-1', name: 'Chest', status: 'Active' },
    { id: 'cat-2', name: 'Abdomen', status: 'Active' },
    { id: 'cat-3', name: 'Cardiac', status: 'Active' },
    { id: 'cat-4', name: 'Neuro', status: 'Active' },
    { id: 'cat-5', name: 'MSK', status: 'Active' },
  ]);

  const [protocols, setProtocols] = useState<Protocol[]>([
    { id: 'proto-1', name: 'TAVR', rvu: 2.5, status: 'Active' },
    { id: 'proto-2', name: 'TMVR', rvu: 3.0, status: 'Active' },
    { id: 'proto-3', name: 'Calcium Score', rvu: 1.2, status: 'Active' },
    { id: 'proto-4', name: 'Coronary', rvu: 2.0, status: 'Active' },
    { id: 'proto-5', name: 'Robotic', rvu: 0.0, status: 'Hidden' },
  ]);

  const [techs, setTechs] = useState<BaseItem[]>(
    TECHNOLOGISTS.map((t, i) => ({ id: `tech-${i}`, name: t.name, status: 'Active' }))
  );

  const [users, setUsers] = useState<UserRecord[]>([
    { 
      id: '1', 
      name: 'Sarah Jenkins', 
      email: 's.jenkins@hospital.org', 
      role: 'Admin', 
      status: 'Active'
    },
    { 
      id: '2', 
      name: 'Mark Torres', 
      email: 'm.torres@hospital.org', 
      role: 'Standard', 
      status: 'Active'
    },
    { 
      id: '3', 
      name: 'David Wu', 
      email: 'd.wu@hospital.org', 
      role: 'Standard', 
      status: 'Inactive'
    },
  ]);

  // Edit States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<UserRecord | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isAddingSection, setIsAddingSection] = useState<string | null>(null);
  const [newValue, setNewValue] = useState('');

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h2 className="font-headline-md text-primary">Access Denied</h2>
        <p className="text-secondary mt-2">You do not have administrative privileges to manage system settings.</p>
      </div>
    );
  }

  const startEditing = (item: BaseItem) => {
    setEditingId(item.id);
    setEditValue(item.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const toggleStatus = (id: string, list: BaseItem[], setter: React.Dispatch<React.SetStateAction<any>>) => {
    setter(list.map(item => 
      item.id === id ? { ...item, status: item.status === 'Active' ? 'Hidden' : 'Active' } : item
    ));
  };

  const saveRename = (id: string, list: BaseItem[], setter: React.Dispatch<React.SetStateAction<any>>) => {
    if (!editValue.trim()) return;
    setter(list.map(item => item.id === id ? { ...item, name: editValue } : item));
    setEditingId(null);
    setEditValue('');
  };

  const addItem = (section: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    if (!newValue.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name: newValue,
      status: 'Active' as const,
      ...(section === 'protocols' ? { rvu: 1.0 } : {})
    };
    setter((prev: any) => [...prev, newItem]);
    setNewValue('');
    setIsAddingSection(null);
  };

  const deleteItem = (id: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setter((prev: any) => prev.filter((item: any) => item.id !== id));
    }
  };

  const toggleUserRole = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, role: u.role === 'Admin' ? 'Standard' : 'Admin' } : u
    ));
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    ));
  };

  const addNewUser = () => {
    if (!newValue.trim()) return;
    const newUser: UserRecord = {
      id: Date.now().toString(),
      name: newValue,
      email: `${newValue.toLowerCase().replace(' ', '.')}@hospital.org`,
      role: 'Standard',
      status: 'Active'
    };
    setUsers(prev => [...prev, newUser]);
    setNewValue('');
    setIsAddingSection(null);
  };

  const ListSection = ({ title, items, setter, sectionId, icon: Icon = Plus }: any) => (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col h-[450px]">
      <header className="bg-surface-container-low px-4 py-3 border-b border-outline-variant flex justify-between items-center shrink-0">
        <h3 className="font-title-sm">{title}</h3>
        <button 
          onClick={() => setIsAddingSection(sectionId)}
          className="bg-primary hover:opacity-90 text-on-primary font-body-sm px-3 py-1.5 rounded flex items-center gap-1 transition-opacity min-h-[32px]"
        >
          <Icon size={16} /> Add
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence mode="popLayout">
          {isAddingSection === sectionId && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-2 mb-2 bg-primary-container/20 border border-primary/30 rounded-lg flex gap-2"
            >
              <input 
                autoFocus
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={`New ${title.toLowerCase()} name...`}
                onKeyDown={(e) => e.key === 'Enter' && addItem(sectionId, setter)}
                className="flex-1 h-9 px-3 bg-surface border border-outline-variant rounded font-body-sm outline-none focus:border-primary"
              />
              <button 
                onClick={() => addItem(sectionId, setter)}
                className="bg-primary text-on-primary p-1.5 rounded hover:bg-primary/90"
              >
                <Check size={18} />
              </button>
              <button 
                onClick={() => { setIsAddingSection(null); setNewValue(''); }}
                className="bg-surface-container text-secondary p-1.5 rounded hover:bg-surface-container-high"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}

          <ul className="space-y-1">
            {items.map((item: BaseItem) => (
              <motion.li 
                layout
                key={item.id} 
                className={cn(
                  "group flex items-center justify-between p-2 rounded border transition-all min-h-[44px]",
                  item.status === 'Hidden' ? "bg-surface-container-high border-transparent opacity-60" : "bg-surface border-transparent hover:border-outline-variant hover:bg-surface-container-low",
                  editingId === item.id && "ring-2 ring-primary ring-inset border-primary"
                )}
              >
                <div className="flex items-center gap-3 flex-1 px-1">
                  <GripVertical size={18} className="text-secondary/50 cursor-grab group-hover:text-secondary" />
                  
                  {editingId === item.id ? (
                    <input 
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveRename(item.id, items, setter);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="flex-1 h-8 px-2 bg-surface-container-lowest border border-primary/50 font-medium rounded font-body-sm outline-none"
                    />
                  ) : (
                    <span className={cn(
                      "font-body-sm font-medium transition-all text-on-surface",
                      item.status === 'Hidden' && "line-through text-secondary italic"
                    )}>
                      {item.name}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {editingId === item.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => saveRename(item.id, items, setter)} className="text-green-600 hover:bg-green-50 p-1.5 rounded"><Check size={18} /></button>
                      <button onClick={cancelEdit} className="text-error hover:bg-error-container/10 p-1.5 rounded"><X size={18} /></button>
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={() => toggleStatus(item.id, items, setter)}
                        className={cn(
                          "p-1.5 rounded transition-colors",
                          item.status === 'Active' ? "text-secondary hover:text-primary opacity-0 group-hover:opacity-100" : "text-primary bg-primary/5"
                        )}
                        title={item.status === 'Active' ? "Hide Item" : "Show Item"}
                      >
                        {item.status === 'Active' ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button 
                        onClick={() => startEditing(item)}
                        className="text-secondary hover:text-tertiary p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Rename"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id, setter)}
                        className="text-secondary hover:text-error p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="mb-4 border-b border-outline-variant pb-6">
        <h1 className="font-display-lg">System Settings</h1>
        <p className="font-body-md text-secondary mt-1">Configure clinical workflow options, clinical staff, and dictionary values.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-grid">
        {/* Modalities */}
        <ListSection 
          title="Modalities" 
          items={modalities} 
          setter={setModalities} 
          sectionId="modalities"
        />

        {/* Categories */}
        <ListSection 
          title="Clinical Categories" 
          items={categories} 
          setter={setCategories} 
          sectionId="categories"
        />

        {/* Technologists */}
        <ListSection 
          title="Technologists" 
          items={techs} 
          setter={setTechs} 
          sectionId="techs"
          icon={UserPlus}
        />

        {/* User Management Section */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col md:col-span-2 min-h-[450px]">
          <header className="bg-surface-container-low px-4 py-3 border-b border-outline-variant flex justify-between items-center shrink-0">
            <div>
              <h3 className="font-title-sm">User Management</h3>
              <p className="text-[11px] text-secondary">Manage access levels and account status.</p>
            </div>
            <button 
              onClick={() => setIsAddingSection('users')}
              className="bg-primary hover:opacity-90 text-on-primary font-body-sm px-4 py-2 rounded flex items-center gap-1.5 transition-opacity"
            >
              <UserPlus size={18} /> Add User
            </button>
          </header>

          <div className="flex-1 overflow-x-auto p-4">
            <AnimatePresence mode="popLayout">
              {isAddingSection === 'users' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-primary-container/10 border border-primary/30 rounded-xl flex flex-wrap gap-4 items-end"
                >
                  <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-secondary uppercase">Full Name</label>
                    <input 
                      autoFocus
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="e.g., Jane Cooper"
                      className="h-10 px-3 bg-surface border border-outline-variant rounded font-body-sm outline-none focus:border-primary"
                    />
                  </div>
                  <button 
                    onClick={addNewUser}
                    className="h-10 px-6 bg-primary text-on-primary rounded font-label-caps text-[11px] flex items-center gap-2"
                  >
                    <Check size={18} /> Create User Account
                  </button>
                  <button 
                    onClick={() => { setIsAddingSection(null); setNewValue(''); }}
                    className="h-10 px-4 bg-surface border border-outline-variant rounded font-label-caps text-[11px] text-secondary"
                  >
                    Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="py-3 px-2 font-label-caps text-[10px] font-bold text-secondary uppercase">Name & Email</th>
                  <th className="py-3 px-2 font-label-caps text-[10px] font-bold text-secondary uppercase">System Role</th>
                  <th className="py-3 px-2 font-label-caps text-[10px] font-bold text-secondary uppercase">Status</th>
                  <th className="py-3 px-2 font-label-caps text-[10px] font-bold text-secondary uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {users.map((user) => (
                  <tr key={user.id} className={cn(
                    "hover:bg-surface-container-low transition-colors group",
                    user.status === 'Inactive' && "opacity-60 grayscale"
                  )}>
                    <td className="py-4 px-2">
                      <div className="flex flex-col">
                        <span className="font-body-md font-bold text-on-surface">{user.name}</span>
                        <span className="text-[11px] text-secondary font-data-mono">{user.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      {editingId === user.id ? (
                        <button 
                          onClick={() => toggleUserRole(user.id)}
                          className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors",
                            user.role === 'Admin' ? "bg-primary text-on-primary ring-2 ring-primary/20" : "bg-surface-container-highest text-secondary border border-outline-variant hover:bg-surface-container-low"
                          )}
                        >
                          {user.role}
                        </button>
                      ) : (
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          user.role === 'Admin' ? "bg-primary/10 text-primary border border-primary/20" : "bg-surface-container-highest text-secondary border border-outline-variant opacity-60"
                        )}>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-2">
                      {editingId === user.id ? (
                        <button 
                          onClick={() => toggleUserStatus(user.id)}
                          className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors border",
                            user.status === 'Active' ? "bg-green-100 text-green-700 border-green-200" : "bg-error-container/10 text-error border-error-container/20"
                          )}
                        >
                          {user.status}
                        </button>
                      ) : (
                        <span className={cn(
                          "text-[10px] font-bold uppercase",
                          user.status === 'Active' ? "text-green-600" : "text-error"
                        )}>
                          {user.status}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex justify-end gap-1">
                        {editingId === user.id ? (
                          <>
                            <button 
                              onClick={() => setEditingId(null)} 
                              className="p-2 rounded bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={() => setEditingId(null)} 
                              className="p-2 rounded bg-error-container/5 text-error hover:bg-error-container/10 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => setEditingId(user.id)}
                              className="p-2 rounded text-secondary hover:text-tertiary transition-colors"
                              title="Edit User"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => setConfirmDeleteUser(user)}
                              className="p-2 rounded text-secondary hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                              title="Delete User"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Protocols Wrapper (Full Width) */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col md:col-span-2 min-h-[450px]">
          <header className="bg-surface-container-low px-4 py-3 border-b border-outline-variant flex justify-between items-center shrink-0 text-on-surface">
            <div>
              <h3 className="font-title-sm">Modifiers / Specialized Protocols</h3>
              <p className="text-[11px] text-secondary">Dictionary for specific procedure modifiers and RVU weighting.</p>
            </div>
            <button 
              onClick={() => setIsAddingSection('protocols')}
              className="bg-primary hover:opacity-90 text-on-primary font-body-sm px-4 py-2 rounded flex items-center gap-1.5 transition-opacity"
            >
              <Plus size={18} /> Add Protocol
            </button>
          </header>
          
          <div className="p-4 flex-1">
            <AnimatePresence mode="popLayout">
              {isAddingSection === 'protocols' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-primary-container/10 border border-primary/30 p-4 rounded-lg mb-4 flex flex-wrap gap-4 items-end"
                >
                  <div className="flex-1 min-w-[200px] flex flex-col gap-1.5 text-on-surface">
                    <label className="text-[10px] font-bold text-secondary uppercase">Protocol Name</label>
                    <input 
                      autoFocus
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="h-10 px-3 bg-surface border border-outline-variant rounded font-body-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addItem('protocols', setProtocols)}
                      className="bg-primary text-on-primary h-10 px-4 rounded font-label-caps text-[11px] flex items-center gap-2"
                    >
                      <Check size={18} /> Save Entry
                    </button>
                    <button 
                      onClick={() => { setIsAddingSection(null); setNewValue(''); }}
                      className="bg-surface border border-outline-variant h-10 px-4 rounded font-label-caps text-[11px] text-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {protocols.map((protocol) => (
                  <motion.div 
                    layout
                    key={protocol.id} 
                    className={cn(
                      "group relative p-3 rounded-xl border flex flex-col gap-2 transition-all",
                      protocol.status === 'Hidden' 
                        ? "bg-surface-container-high opacity-60 border-transparent shadow-none" 
                        : "bg-surface border-outline-variant hover:border-primary hover:shadow-md shadow-sm"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 flex-1">
                        <GripVertical size={18} className="text-secondary opacity-40 group-hover:opacity-100 cursor-grab" />
                        {editingId === protocol.id ? (
                          <input 
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRename(protocol.id, protocols, setProtocols);
                              if (e.key === 'Escape') cancelEdit();
                            }}
                            className="bg-surface-container-lowest border border-primary/30 rounded px-2 py-0.5 font-body-md outline-none w-full"
                          />
                        ) : (
                          <span className={cn("font-title-sm font-semibold text-on-surface", protocol.status === 'Hidden' && "line-through text-secondary italic")}>
                            {protocol.name}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {editingId === protocol.id ? (
                          <button onClick={() => saveRename(protocol.id, protocols, setProtocols)} className="text-primary"><Check size={18} /></button>
                        ) : (
                          <>
                            <button 
                              onClick={() => toggleStatus(protocol.id, protocols, setProtocols)} 
                              className={cn("p-1 rounded transition-colors", protocol.status === 'Hidden' ? "text-primary bg-primary/5" : "text-secondary hover:text-primary opacity-0 group-hover:opacity-100")}
                            >
                              {protocol.status === 'Active' ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                            <button onClick={() => startEditing(protocol)} className="text-secondary hover:text-tertiary p-1 rounded transition-colors opacity-0 group-hover:opacity-100"><Edit2 size={16} /></button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-1 pt-2 border-t border-outline-variant/30">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">RVU Weighted</span>
                        <div className="bg-tertiary-container/10 px-2 py-0.5 rounded text-tertiary font-data-mono text-xs font-bold">
                          {protocol.rvu.toFixed(2)}
                        </div>
                      </div>
                      {!editingId && (
                        <button 
                          onClick={() => deleteItem(protocol.id, setProtocols)}
                          className="opacity-0 group-hover:opacity-100 text-error hover:bg-error-container/10 p-1.5 rounded transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDeleteUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDeleteUser(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-error-container/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={24} />
                </div>
                <h3 className="font-headline-sm text-on-surface">Delete User?</h3>
                <p className="text-secondary font-body-sm mt-2">
                  Are you sure you want to permanently delete <span className="font-bold text-on-surface">{confirmDeleteUser.name}</span>? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="grid grid-cols-2 border-t border-outline-variant">
                <button 
                  onClick={() => setConfirmDeleteUser(null)}
                  className="p-4 font-label-caps text-[11px] text-secondary hover:bg-surface-container-low transition-colors border-r border-outline-variant"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setUsers(prev => prev.filter(u => u.id !== confirmDeleteUser.id));
                    setConfirmDeleteUser(null);
                  }}
                  className="p-4 font-label-caps text-[11px] text-error font-bold hover:bg-error-container/5 transition-colors"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

