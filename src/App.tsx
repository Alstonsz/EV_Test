import React, { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export interface TestRowData {
  selected: boolean;
  equipment: string[];
  tester: string;
  date: string;
  status: 'pending' | 'running' | 'paused' | 'completed';
  result?: 'PASS' | 'FAIL' | 'NT';
}

export interface AppState {
  isLoggedIn: boolean;
  user: string;
  productInfo: {
    projectNo: string;
    tester: string;
    sampleNo: string;
    company: string;
    model: string;
    voltage: string;
    current: string;
    ipDegree: string;
  };
  testRows: Record<string, TestRowData>;
}

const initialState: AppState = {
  isLoggedIn: false,
  user: '',
  productInfo: {
    projectNo: '',
    tester: '',
    sampleNo: '',
    company: '',
    model: '',
    voltage: '',
    current: '',
    ipDegree: '',
  },
  testRows: {},
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    setState({ 
      ...state, 
      isLoggedIn: true, 
      user: username || '测试工程师',
      productInfo: {
        ...state.productInfo,
        tester: username || '测试工程师'
      }
    });
  };

  const handleLogout = () => {
    // Preserve test data, just log out
    setState(prev => ({ ...prev, isLoggedIn: false, user: '' }));
  };

  if (!state.isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans">
        <Card className="w-full max-w-md border-zinc-200 shadow-sm rounded-sm">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-zinc-900 rounded-sm">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">EV 测试系统</CardTitle>
            <CardDescription className="text-zinc-500">电动汽车充电测试报告系统</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input name="username" placeholder="账号 (例如：张三)" required className="rounded-sm border-zinc-300 focus-visible:ring-zinc-900" />
              </div>
              <div className="space-y-2">
                <Input type="password" placeholder="密码" required className="rounded-sm border-zinc-300 focus-visible:ring-zinc-900" />
              </div>
              <Button type="submit" className="w-full rounded-sm bg-zinc-900 hover:bg-zinc-800 text-white">
                登录系统
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <MainLayout state={state} setState={setState} onLogout={handleLogout} />;
}
