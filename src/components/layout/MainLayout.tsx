import { useState } from 'react';
import { AppState } from '../../App';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LogOut,
  PlayCircle,
  CheckCircle2,
  FileText,
  Database,
  Wrench,
  GitMerge,
  Settings,
  Zap
} from 'lucide-react';
import { OngoingTestsView } from '../views/OngoingTestsView';
import { CompletedTestsView } from '../views/CompletedTestsView';
import { SystemConfigView } from '../views/SystemConfigView';
import { TRFGenerationView } from '../views/TRFGenerationView';
import { RawDataView } from '../views/RawDataView';
import { EquipmentSelectionView } from '../views/EquipmentSelectionView';
import { TestFlowView } from '../views/TestFlowView';
import { PlaceholderView } from '../views/PlaceholderView';

interface MainLayoutProps {
  state: AppState;
  setState: (state: AppState) => void;
  onLogout: () => void;
}

type NavItem = 'ongoing' | 'completed' | 'trf' | 'raw_data' | 'equipment' | 'flow' | 'config';

export function MainLayout({ state, setState, onLogout }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState<NavItem>('ongoing');

  const navItems = [
    { id: 'ongoing', label: '进行中测试', icon: PlayCircle },
    { id: 'completed', label: '已完成测试', icon: CheckCircle2 },
    { id: 'trf', label: 'TRF生成', icon: FileText },
    { id: 'raw_data', label: '原始测试数据', icon: Database },
    { id: 'equipment', label: '测试设备选择', icon: Wrench },
    { id: 'flow', label: '测试流程', icon: GitMerge },
    { id: 'config', label: '系统配置', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 text-zinc-300 flex flex-col shadow-xl z-10 relative">
        <div className="p-6 flex items-center space-x-3 border-b border-zinc-800/50">
          <div className="p-2 bg-blue-600 rounded-sm shadow-inner">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">EV 测试系统</span>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as NavItem)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-400 font-medium border-l-2 border-blue-500'
                      : 'hover:bg-zinc-800/50 hover:text-zinc-100 border-l-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/50">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <span className="text-xs font-medium text-zinc-300">
                  {state.user.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-200">{state.user}</span>
                <span className="text-xs text-zinc-500">在线</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-sm h-8 w-8"
              title="退出登录"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-zinc-50/50">
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center px-8 shadow-sm z-0">
          <h1 className="text-xl font-semibold text-zinc-800 tracking-tight">
            {navItems.find((item) => item.id === activeTab)?.label}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'ongoing' && <OngoingTestsView state={state} setState={setState} />}
            {activeTab === 'completed' && <CompletedTestsView state={state} />}
            {activeTab === 'trf' && <TRFGenerationView state={state} />}
            {activeTab === 'raw_data' && <RawDataView state={state} />}
            {activeTab === 'equipment' && <EquipmentSelectionView />}
            {activeTab === 'flow' && <TestFlowView />}
            {activeTab === 'config' && <SystemConfigView />}
          </div>
        </main>
      </div>
    </div>
  );
}
