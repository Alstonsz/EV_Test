import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, FileText, Activity, Users, Upload, Save, Plus, Clock, RefreshCw, ShieldCheck, Server } from 'lucide-react';

export function SystemConfigView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">系统配置</h2>
        <p className="text-sm text-zinc-500">管理数据库、域控接入、测试标准、报告模板及系统日志</p>
      </div>

      <Tabs defaultValue="ad" className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-zinc-100/50 border border-zinc-200 rounded-sm">
          <TabsTrigger value="ad" className="py-2.5 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600">域控接入 (AD)</TabsTrigger>
          <TabsTrigger value="db" className="py-2.5 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600">数据库配置</TabsTrigger>
          <TabsTrigger value="standards" className="py-2.5 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600">标准与条款</TabsTrigger>
          <TabsTrigger value="templates" className="py-2.5 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600">模板管理</TabsTrigger>
          <TabsTrigger value="stats" className="py-2.5 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600">设备统计与日志</TabsTrigger>
          <TabsTrigger value="users" className="py-2.5 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600">用户登录信息</TabsTrigger>
        </TabsList>

        <TabsContent value="ad" className="mt-6">
          <Card className="border-zinc-200 shadow-sm rounded-sm">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
              <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Active Directory (LDAP) 域控接入配置</span>
              </CardTitle>
              <CardDescription>配置 Linux 服务器与企业内部 Windows 域控制器 (AD) 的连接，实现域账号统一登录 (SSO)。</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>LDAP 服务器地址 (URL)</Label>
                  <Input defaultValue="ldap://dc.corp.local:389" className="rounded-sm font-mono text-sm" />
                  <p className="text-xs text-zinc-500">支持 ldap:// 或 ldaps:// (推荐 636 端口)</p>
                </div>
                <div className="space-y-2">
                  <Label>域名 (Domain Name)</Label>
                  <Input defaultValue="CORP" className="rounded-sm font-mono text-sm" />
                  <p className="text-xs text-zinc-500">例如: CORP 或 corp.local</p>
                </div>
                <div className="space-y-2">
                  <Label>Base DN</Label>
                  <Input defaultValue="DC=corp,DC=local" className="rounded-sm font-mono text-sm" />
                  <p className="text-xs text-zinc-500">用户搜索的根节点</p>
                </div>
                <div className="space-y-2">
                  <Label>用户搜索过滤规则 (Search Filter)</Label>
                  <Input defaultValue="(&(objectCategory=person)(objectClass=user)(sAMAccountName={{username}}))" className="rounded-sm font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <Label>服务账号 (Bind DN)</Label>
                  <Input defaultValue="CN=LDAP_Service,OU=ServiceAccounts,DC=corp,DC=local" className="rounded-sm font-mono text-sm" />
                  <p className="text-xs text-zinc-500">用于查询 AD 目录的服务账号</p>
                </div>
                <div className="space-y-2">
                  <Label>服务账号密码 (Bind Password)</Label>
                  <Input type="password" defaultValue="********" className="rounded-sm font-mono text-sm" />
                </div>
              </div>
              
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm space-y-4">
                <h4 className="text-sm font-medium text-zinc-800 flex items-center">
                  <Server className="w-4 h-4 mr-2 text-zinc-500" />
                  高级认证设置
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="enable-sso" defaultChecked className="w-4 h-4 accent-blue-600 rounded-sm" />
                    <Label htmlFor="enable-sso" className="font-normal cursor-pointer">开启 Windows 集成身份验证 (SSO / NTLM / Kerberos)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="auto-create-user" defaultChecked className="w-4 h-4 accent-blue-600 rounded-sm" />
                    <Label htmlFor="auto-create-user" className="font-normal cursor-pointer">域账号首次登录成功后，自动在本地数据库创建用户档案</Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-zinc-100">
                <Button variant="outline" className="rounded-sm text-zinc-600 border-zinc-300">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  测试连接
                </Button>
                <Button className="rounded-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>保存域控配置</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="db" className="mt-6">
          <Card className="border-zinc-200 shadow-sm rounded-sm">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
              <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-600" />
                <span>测试设备链接数据库配置</span>
              </CardTitle>
              <CardDescription>设置用于自动上传测试数据和设备统计信息的服务器数据库地址。</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>数据库地址 (URL)</Label>
                  <Input defaultValue="mysql://db.evtest.internal:3306/equipment_data" className="rounded-sm" />
                </div>
                <div className="space-y-2">
                  <Label>数据库名称</Label>
                  <Input defaultValue="ev_test_system_db" className="rounded-sm" />
                </div>
                <div className="space-y-2">
                  <Label>用户名</Label>
                  <Input defaultValue="admin_sync" className="rounded-sm" />
                </div>
                <div className="space-y-2">
                  <Label>密码</Label>
                  <Input type="password" defaultValue="********" className="rounded-sm" />
                </div>
                <div className="space-y-2 md:col-span-2 flex items-center space-x-2">
                  <input type="checkbox" id="auto-sync" defaultChecked className="w-4 h-4 accent-blue-600 rounded-sm" />
                  <Label htmlFor="auto-sync" className="font-normal cursor-pointer">开启设备使用次数、时间自动上传服务器数据库</Label>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button className="rounded-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>保存配置</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="mt-6">
          <Card className="border-zinc-200 shadow-sm rounded-sm">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4 flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>各标准具体测试条款配置</span>
                </CardTitle>
                <CardDescription className="mt-1">管理和配置不同测试标准下的具体条款和要求。</CardDescription>
              </div>
              <Button size="sm" className="rounded-sm bg-zinc-900 hover:bg-zinc-800 text-white flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>新增条款</span>
              </Button>
            </CardHeader>
            <CardContent className="pt-0 px-0">
              <Table className="text-sm">
                <TableHeader className="bg-zinc-50 border-b border-zinc-200">
                  <TableRow>
                    <TableHead className="pl-6 w-32">标准名称</TableHead>
                    <TableHead className="w-24">章节号</TableHead>
                    <TableHead className="w-64">测试项目</TableHead>
                    <TableHead>测试要求</TableHead>
                    <TableHead className="w-24 text-center">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">IEC 61851-1</TableCell>
                    <TableCell className="font-mono text-xs">11.4</TableCell>
                    <TableCell>保护接地导体连续性</TableCell>
                    <TableCell className="text-zinc-500 text-xs truncate max-w-xs">接地电阻不应超过0.1Ω...</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2">编辑</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">IEC 61851-23</TableCell>
                    <TableCell className="font-mono text-xs">101.2.1.1</TableCell>
                    <TableCell>输出电压容差</TableCell>
                    <TableCell className="text-zinc-500 text-xs truncate max-w-xs">在额定输出范围内，电压误差≤±1%...</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2">编辑</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <Card className="border-zinc-200 shadow-sm rounded-sm">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
              <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
                <Upload className="w-5 h-5 text-blue-600" />
                <span>TDS、TRF 报告模板上传</span>
              </CardTitle>
              <CardDescription>依据标准分类上传和管理测试数据表 (TDS) 和测试报告格式 (TRF) 模板。</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-end space-x-4 p-4 bg-zinc-50 border border-zinc-200 rounded-sm border-dashed">
                <div className="space-y-2 flex-1">
                  <Label>选择标准分类</Label>
                  <select className="w-full border border-zinc-300 rounded-sm text-sm p-2 bg-white focus:outline-none focus:border-blue-500">
                    <option>IEC 61851-1 (交流充电)</option>
                    <option>IEC 61851-23 (直流充电)</option>
                    <option>ISO 15118 (通信协议)</option>
                  </select>
                </div>
                <div className="space-y-2 flex-1">
                  <Label>模板类型</Label>
                  <select className="w-full border border-zinc-300 rounded-sm text-sm p-2 bg-white focus:outline-none focus:border-blue-500">
                    <option>TDS (测试数据表)</option>
                    <option>TRF (测试报告格式)</option>
                  </select>
                </div>
                <div className="space-y-2 flex-1">
                  <Label>选择文件</Label>
                  <Input type="file" className="rounded-sm bg-white cursor-pointer" />
                </div>
                <Button className="rounded-sm bg-zinc-900 hover:bg-zinc-800 text-white flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>上传模板</span>
                </Button>
              </div>

              <Table className="text-sm border border-zinc-200 rounded-sm">
                <TableHeader className="bg-zinc-50">
                  <TableRow>
                    <TableHead className="pl-4 w-40">标准分类</TableHead>
                    <TableHead className="w-24">类型</TableHead>
                    <TableHead>文件名</TableHead>
                    <TableHead className="w-32">上传时间</TableHead>
                    <TableHead className="w-24 text-center">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-4 font-medium">IEC 61851-1</TableCell>
                    <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">TRF</Badge></TableCell>
                    <TableCell className="text-zinc-600">IEC61851-1_TRF_v2.docx</TableCell>
                    <TableCell className="text-zinc-500 text-xs">2026-03-20</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2">删除</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4 font-medium">IEC 61851-23</TableCell>
                    <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">TDS</Badge></TableCell>
                    <TableCell className="text-zinc-600">IEC61851-23_TDS_Template.xlsx</TableCell>
                    <TableCell className="text-zinc-500 text-xs">2026-03-22</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2">删除</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-zinc-200 shadow-sm rounded-sm">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">总测试次数</p>
                  <h3 className="text-2xl font-bold text-zinc-900">1,284</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="border-zinc-200 shadow-sm rounded-sm">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 rounded-full">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">设备总运行时长</p>
                  <h3 className="text-2xl font-bold text-zinc-900">3,420 <span className="text-sm font-normal text-zinc-500">小时</span></h3>
                </div>
              </CardContent>
            </Card>
            <Card className="border-zinc-200 shadow-sm rounded-sm">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="p-3 bg-indigo-50 rounded-full">
                  <RefreshCw className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">数据库同步状态</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-medium text-emerald-600">实时上传中</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-zinc-200 shadow-sm rounded-sm">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
              <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>设备使用统计与系统日志</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-0">
              <Table className="text-sm">
                <TableHeader className="bg-zinc-50 border-b border-zinc-200">
                  <TableRow>
                    <TableHead className="pl-6">设备名称</TableHead>
                    <TableHead>设备编号</TableHead>
                    <TableHead className="text-right">使用次数</TableHead>
                    <TableHead className="text-right">累计时长 (h)</TableHead>
                    <TableHead>最后使用时间</TableHead>
                    <TableHead>同步状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">示波器</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-500">OSC-01</TableCell>
                    <TableCell className="text-right font-mono">342</TableCell>
                    <TableCell className="text-right font-mono">850.5</TableCell>
                    <TableCell className="text-zinc-500 text-xs">2026-03-26 10:15</TableCell>
                    <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-normal">已同步</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">功率分析仪</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-500">PWR-02</TableCell>
                    <TableCell className="text-right font-mono">289</TableCell>
                    <TableCell className="text-right font-mono">1,204.0</TableCell>
                    <TableCell className="text-zinc-500 text-xs">2026-03-26 09:30</TableCell>
                    <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-normal">已同步</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">电子负载</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-500">ELD-04</TableCell>
                    <TableCell className="text-right font-mono">156</TableCell>
                    <TableCell className="text-right font-mono">420.0</TableCell>
                    <TableCell className="text-zinc-500 text-xs">2026-03-25 16:45</TableCell>
                    <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-normal">已同步</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="border-zinc-200 shadow-sm rounded-sm">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
              <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>用户登录信息记录</span>
              </CardTitle>
              <CardDescription>记录系统用户的登录时间、IP及状态。</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 px-0">
              <Table className="text-sm">
                <TableHeader className="bg-zinc-50 border-b border-zinc-200">
                  <TableRow>
                    <TableHead className="pl-6">用户名</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>登录时间</TableHead>
                    <TableHead>IP 地址</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">张三</TableCell>
                    <TableCell className="text-zinc-500">测试工程师</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-600">2026-03-26 08:30:15</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-500">192.168.1.105</TableCell>
                    <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-normal">成功</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">李四</TableCell>
                    <TableCell className="text-zinc-500">审核员</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-600">2026-03-25 14:20:00</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-500">192.168.1.112</TableCell>
                    <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-normal">成功</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">admin</TableCell>
                    <TableCell className="text-zinc-500">系统管理员</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-600">2026-03-25 09:15:22</TableCell>
                    <TableCell className="font-mono text-xs text-zinc-500">10.0.0.5</TableCell>
                    <TableCell><Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-normal">密码错误</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
