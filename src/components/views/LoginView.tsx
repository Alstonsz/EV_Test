import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Zap, ShieldCheck, Server, UserCircle } from 'lucide-react';

interface LoginViewProps {
  onLogin: (username: string) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(false);

  // Simulate Windows Integrated Authentication (SSO)
  const handleAutoLogin = () => {
    setIsAutoLoggingIn(true);
    // Simulate a network request to check Kerberos/NTLM token
    setTimeout(() => {
      onLogin('CORP\\Administrator'); // Mock domain user
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      // Ensure it looks like a domain account if they didn't type the domain
      const finalUsername = username.includes('\\') || username.includes('@') ? username : `CORP\\${username}`;
      onLogin(finalUsername);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-50 blur-3xl opacity-50"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-zinc-100 blur-3xl opacity-50"></div>
      </div>

      <Card className="w-full max-w-md border-zinc-200 shadow-xl z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-blue-600 rounded-xl shadow-inner">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">EV 测试系统</CardTitle>
          <div className="flex items-center justify-center space-x-1.5 text-emerald-600 bg-emerald-50 w-fit mx-auto px-3 py-1 rounded-full border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">已接入企业域控 (Active Directory)</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Auto Login Section */}
          <div className="space-y-3">
            <Button 
              onClick={handleAutoLogin} 
              disabled={isAutoLoggingIn}
              className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center space-x-2 text-base shadow-sm"
            >
              {isAutoLoggingIn ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>正在验证 Windows 凭据...</span>
                </div>
              ) : (
                <>
                  <Server className="w-5 h-5 opacity-80" />
                  <span>Windows 域账号自动登录 (SSO)</span>
                </>
              )}
            </Button>
            <p className="text-xs text-center text-zinc-500">
              系统将自动读取当前登录的 Windows 域账户信息
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-400 font-medium">或手动输入域账号</span>
            </div>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-700">域账号 (Domain\User)</Label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  id="username"
                  placeholder="例如: CORP\zhangsan"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-9 bg-zinc-50/50 border-zinc-200 focus-visible:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-700">域密码</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="请输入域账户密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-50/50 border-zinc-200 focus-visible:ring-blue-500"
                required
              />
            </div>
            <Button type="submit" variant="outline" className="w-full border-zinc-300 hover:bg-zinc-50 text-zinc-700">
              手动登录
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
