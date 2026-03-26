import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitMerge, Plus, Save, Trash2, GripVertical, FileText, 
  Settings2, ArrowRight, Copy, CheckCircle2, Box, Library,
  PlayCircle, Circle, Clock
} from 'lucide-react';

// Mock Data
const AVAILABLE_MODULES = [
  { id: 'm1', clause: 'Clause 8.1', name: 'General Requirements', type: 'general' },
  { id: 'm2', clause: 'Clause 8.2', name: 'Protection against electric shock', type: 'safety' },
  { id: 'm3', clause: 'Clause 10.1', name: 'Charging modes and functions', type: 'functional' },
  { id: 'm4', clause: 'Clause 11.1', name: 'Communication between EV and EVSE', type: 'comm' },
  { id: 'm5', clause: 'Clause 12.1', name: 'Environmental conditions', type: 'env' },
  { id: 'm6', clause: 'Clause 13.1', name: 'Mechanical requirements', type: 'mech' },
  { id: 'm7', clause: 'Clause 14.1', name: 'Temperature rise', type: 'safety' },
  { id: 'm8', clause: 'Clause 15.1', name: 'Abnormal operation', type: 'safety' },
];

const BUILT_IN_FLOWS = [
  {
    id: 'std-1',
    name: 'IEC 61851-1 Full Compliance',
    description: 'Complete testing flow for IEC 61851-1 standard compliance.',
    isStandard: true,
    modules: ['m1', 'm2', 'm3', 'm4', 'm5', 'm7']
  },
  {
    id: 'std-2',
    name: 'GB/T 18487.1 Safety Focus',
    description: 'Focused testing flow for safety and protection requirements.',
    isStandard: true,
    modules: ['m1', 'm2', 'm7', 'm8']
  }
];

const INITIAL_PERSONAL_FLOWS = [
  {
    id: 'usr-1',
    name: 'My Quick Functional Test',
    description: 'Custom flow for rapid functional verification.',
    isStandard: false,
    modules: ['m1', 'm3', 'm4']
  }
];

export function TestFlowView() {
  const [personalFlows, setPersonalFlows] = useState(INITIAL_PERSONAL_FLOWS);
  const [activeTab, setActiveTab] = useState('standard');
  const [selectedFlowId, setSelectedFlowId] = useState(BUILT_IN_FLOWS[0].id);
  const [isEditing, setIsEditing] = useState(false);
  const [editFlow, setEditFlow] = useState<any>(null);

  const allFlows = [...BUILT_IN_FLOWS, ...personalFlows];
  const selectedFlow = isEditing ? editFlow : allFlows.find(f => f.id === selectedFlowId);

  const handleSelectFlow = (id: string) => {
    setSelectedFlowId(id);
    setIsEditing(false);
  };

  const handleEditFlow = () => {
    setEditFlow({ ...selectedFlow });
    setIsEditing(true);
  };

  const handleSaveAsPersonal = () => {
    const newFlow = {
      ...editFlow,
      id: `usr-${Date.now()}`,
      name: `${editFlow.name} (Copy)`,
      isStandard: false,
    };
    setPersonalFlows([...personalFlows, newFlow]);
    setActiveTab('personal');
    setSelectedFlowId(newFlow.id);
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    if (editFlow.isStandard) {
      // Can't save over standard, save as personal
      handleSaveAsPersonal();
    } else {
      setPersonalFlows(personalFlows.map(f => f.id === editFlow.id ? editFlow : f));
      setIsEditing(false);
    }
  };

  const handleRemoveModule = (index: number) => {
    const newModules = [...editFlow.modules];
    newModules.splice(index, 1);
    setEditFlow({ ...editFlow, modules: newModules });
  };

  const handleAddModule = (moduleId: string) => {
    setEditFlow({ ...editFlow, modules: [...editFlow.modules, moduleId] });
  };

  const getModuleDetails = (id: string) => AVAILABLE_MODULES.find(m => m.id === id);

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'safety': return 'bg-red-100 text-red-700 border-red-200';
      case 'functional': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'comm': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'env': return 'bg-green-100 text-green-700 border-green-200';
      case 'mech': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">测试流程配置</h2>
          <p className="text-sm text-zinc-500 mt-1">模块化业务流管理，内置标准与自定义流程</p>
        </div>
        {selectedFlow && !isEditing && (
          <Button onClick={handleEditFlow} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Settings2 className="w-4 h-4 mr-2" />
            编辑此流程
          </Button>
        )}
        {isEditing && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>取消</Button>
            <Button onClick={handleSaveChanges} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              {editFlow.isStandard ? '另存为个人流程' : '保存更改'}
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Sidebar: Flow Selection */}
        <Card className="w-80 flex flex-col shrink-0 border-zinc-200 shadow-sm">
          <CardHeader className="pb-3 border-b border-zinc-100 bg-zinc-50/50">
            <CardTitle className="text-base font-semibold text-zinc-800">流程库</CardTitle>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-4 pt-4">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="standard">标准流程</TabsTrigger>
                <TabsTrigger value="personal">我的流程</TabsTrigger>
              </TabsList>
            </div>
            
            <ScrollArea className="flex-1 mt-2">
              <TabsContent value="standard" className="m-0 p-4 space-y-2">
                {BUILT_IN_FLOWS.map(flow => (
                  <button
                    key={flow.id}
                    onClick={() => handleSelectFlow(flow.id)}
                    className={`w-full text-left p-3 rounded-md border transition-all ${
                      selectedFlowId === flow.id && !isEditing && activeTab === 'standard'
                        ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-500' 
                        : 'bg-white border-zinc-200 hover:border-blue-300 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="font-medium text-sm text-zinc-900">{flow.name}</div>
                    <div className="text-xs text-zinc-500 mt-1 line-clamp-2">{flow.description}</div>
                    <Badge variant="secondary" className="mt-2 text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-100">内置标准</Badge>
                  </button>
                ))}
              </TabsContent>
              
              <TabsContent value="personal" className="m-0 p-4 space-y-2">
                {personalFlows.length === 0 ? (
                  <div className="text-center py-8 text-sm text-zinc-500">
                    暂无个人流程，请从标准流程另存为或新建。
                  </div>
                ) : (
                  personalFlows.map(flow => (
                    <button
                      key={flow.id}
                      onClick={() => handleSelectFlow(flow.id)}
                      className={`w-full text-left p-3 rounded-md border transition-all ${
                        selectedFlowId === flow.id && !isEditing && activeTab === 'personal'
                          ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-500' 
                          : 'bg-white border-zinc-200 hover:border-blue-300 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="font-medium text-sm text-zinc-900">{flow.name}</div>
                      <div className="text-xs text-zinc-500 mt-1 line-clamp-2">{flow.description}</div>
                      <Badge variant="outline" className="mt-2 text-[10px] text-zinc-600">个人自定义</Badge>
                    </button>
                  ))
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </Card>

        {/* Main Content: Flow Viewer/Editor */}
        <Card className="flex-1 flex flex-col border-zinc-200 shadow-sm min-w-0">
          {selectedFlow ? (
            <>
              <CardHeader className="pb-4 border-b border-zinc-100 bg-white shrink-0">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-zinc-500 mb-1 block">流程名称</label>
                      <Input 
                        value={editFlow.name} 
                        onChange={(e) => setEditFlow({...editFlow, name: e.target.value})}
                        className="font-semibold text-lg"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-500 mb-1 block">流程描述</label>
                      <Input 
                        value={editFlow.description} 
                        onChange={(e) => setEditFlow({...editFlow, description: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2">
                      <GitMerge className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-lg font-semibold text-zinc-800">{selectedFlow.name}</CardTitle>
                      {selectedFlow.isStandard ? (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">标准</Badge>
                      ) : (
                        <Badge variant="outline" className="text-zinc-600">个人</Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2">{selectedFlow.description}</CardDescription>
                  </div>
                )}
              </CardHeader>
              
              <div className="flex-1 flex min-h-0">
                {/* Flow Diagram Area */}
                <ScrollArea className="flex-1 bg-zinc-50/50 p-6">
                  <div className="max-w-2xl mx-auto">
                    <div className="relative">
                      {/* Vertical Line */}
                      <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-zinc-200 z-0"></div>
                      
                      <div className="space-y-4 relative z-10">
                        {selectedFlow.modules.map((moduleId: string, index: number) => {
                          const module = getModuleDetails(moduleId);
                          if (!module) return null;
                          
                          return (
                            <div key={`${moduleId}-${index}`} className="flex items-start group">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm z-10">
                                <span className="font-bold text-sm">{index + 1}</span>
                              </div>
                              <div className="ml-4 flex-1">
                                <div className={`p-4 rounded-lg border bg-white shadow-sm transition-all ${isEditing ? 'hover:border-blue-300' : ''}`}>
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                      {isEditing && (
                                        <GripVertical className="w-4 h-4 text-zinc-400 cursor-grab active:cursor-grabbing" />
                                      )}
                                      <div>
                                        <div className="flex items-center space-x-2">
                                          <Badge variant="outline" className="font-mono text-xs bg-zinc-50">{module.clause}</Badge>
                                          <Badge variant="outline" className={`text-[10px] border ${getTypeColor(module.type)}`}>
                                            {module.type.toUpperCase()}
                                          </Badge>
                                        </div>
                                        <h4 className="font-medium text-zinc-900 mt-1">{module.name}</h4>
                                      </div>
                                    </div>
                                    {isEditing && (
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="text-zinc-400 hover:text-red-600 hover:bg-red-50 -mt-1 -mr-1"
                                        onClick={() => handleRemoveModule(index)}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        
                        {selectedFlow.modules.length === 0 && (
                          <div className="text-center py-12 text-zinc-500 bg-white border border-dashed border-zinc-300 rounded-lg">
                            流程为空，请添加测试模块。
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Right Sidebar: Module Library (Only visible when editing) */}
                {isEditing && (
                  <div className="w-72 border-l border-zinc-200 bg-white flex flex-col shrink-0">
                    <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
                      <h3 className="font-semibold text-sm text-zinc-800 flex items-center">
                        <Library className="w-4 h-4 mr-2 text-zinc-500" />
                        模块库
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1">点击添加模块到当前流程</p>
                    </div>
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-3">
                        {AVAILABLE_MODULES.map(module => (
                          <div 
                            key={module.id} 
                            className="p-3 rounded-md border border-zinc-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-colors group"
                            onClick={() => handleAddModule(module.id)}
                          >
                            <div className="flex justify-between items-start">
                              <Badge variant="outline" className="font-mono text-[10px] bg-zinc-50 mb-1">{module.clause}</Badge>
                              <Plus className="w-4 h-4 text-zinc-400 group-hover:text-blue-600" />
                            </div>
                            <div className="text-sm font-medium text-zinc-800 leading-tight">{module.name}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-500">
              请在左侧选择一个测试流程
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

