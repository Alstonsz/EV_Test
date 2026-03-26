import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wrench, Search, Plus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const EQUIPMENT_DATA = [
  { id: 'OSC-01', name: '数字示波器', model: 'Tektronix MDO3000', status: 'available', lastCal: '2025-10-15', nextCal: '2026-10-14' },
  { id: 'PWR-02', name: '高精度功率分析仪', model: 'Yokogawa WT3000E', status: 'in-use', lastCal: '2025-11-20', nextCal: '2026-11-19' },
  { id: 'DMM-03', name: '台式万用表', model: 'Keysight 34461A', status: 'available', lastCal: '2025-08-05', nextCal: '2026-08-04' },
  { id: 'ELD-04', name: '可编程直流电子负载', model: 'Chroma 63200A', status: 'maintenance', lastCal: '2025-05-12', nextCal: '2026-05-11' },
  { id: 'AC-05', name: '交流电源', model: 'Chroma 61500', status: 'available', lastCal: '2025-12-01', nextCal: '2026-11-30' },
  { id: 'TH-06', name: '温湿度试验箱', model: 'ESPEC Platinous', status: 'in-use', lastCal: '2025-09-18', nextCal: '2026-09-17' },
];

export function EquipmentSelectionView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">测试设备管理</h2>
          <p className="text-sm text-zinc-500 mt-1">查看、管理和选择可用于测试的仪器设备</p>
        </div>
        <Button className="rounded-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>添加新设备</span>
        </Button>
      </div>

      <Card className="border-zinc-200 shadow-sm rounded-sm">
        <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
              <Wrench className="w-5 h-5 text-blue-600" />
              <span>设备台账</span>
            </CardTitle>
            <div className="flex space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="搜索设备名称或编号..."
                  className="pl-9 rounded-sm border-zinc-300 h-9 text-sm focus-visible:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-sm border-zinc-300 h-9 w-9">
                <Filter className="w-4 h-4 text-zinc-500" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1000px] text-sm">
              <TableHeader className="bg-zinc-50 border-b border-zinc-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-32 font-semibold text-zinc-700 pl-6">设备编号</TableHead>
                  <TableHead className="w-48 font-semibold text-zinc-700">设备名称</TableHead>
                  <TableHead className="w-48 font-semibold text-zinc-700">型号规格</TableHead>
                  <TableHead className="w-32 font-semibold text-zinc-700">上次校准日期</TableHead>
                  <TableHead className="w-32 font-semibold text-zinc-700">下次校准日期</TableHead>
                  <TableHead className="w-24 font-semibold text-zinc-700">当前状态</TableHead>
                  <TableHead className="w-24 font-semibold text-zinc-700 text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EQUIPMENT_DATA.map((item) => (
                  <TableRow key={item.id} className="border-b border-zinc-100">
                    <TableCell className="font-mono text-xs text-zinc-600 pl-6">{item.id}</TableCell>
                    <TableCell className="font-medium text-zinc-800">{item.name}</TableCell>
                    <TableCell className="text-zinc-600">{item.model}</TableCell>
                    <TableCell className="text-zinc-600">{item.lastCal}</TableCell>
                    <TableCell className="text-zinc-600">{item.nextCal}</TableCell>
                    <TableCell>
                      {item.status === 'available' && <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 font-normal">空闲可用</Badge>}
                      {item.status === 'in-use' && <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 font-normal">使用中</Badge>}
                      {item.status === 'maintenance' && <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 font-normal">维护/校准中</Badge>}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 h-8 px-2">详情</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
