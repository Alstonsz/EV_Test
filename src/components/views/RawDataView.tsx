import { AppState } from '../../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, Download, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ALL_TEST_ITEMS } from '../../lib/testItems';

export function RawDataView({ state }: { state: AppState }) {
  // Only show tests that have been started (not pending)
  const activeTests = ALL_TEST_ITEMS.filter(item => {
    const rowData = state.testRows[item.id];
    return rowData && rowData.status !== 'pending';
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">原始测试数据</h2>
          <p className="text-sm text-zinc-500 mt-1">查看、检索和导出所有测试项目的原始数据记录</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="rounded-sm border-zinc-300 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>筛选</span>
          </Button>
          <Button className="rounded-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>导出全部数据 (CSV)</span>
          </Button>
        </div>
      </div>

      <Card className="border-zinc-200 shadow-sm rounded-sm">
        <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-600" />
              <span>数据记录列表</span>
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="搜索测试项目或章节号..."
                className="pl-9 rounded-sm border-zinc-300 h-9 text-sm focus-visible:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          {activeTests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
              <Database className="w-12 h-12 mb-4 opacity-20" />
              <p>暂无测试数据记录</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[1200px] text-sm">
                <TableHeader className="bg-zinc-50 border-b border-zinc-200">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-24 font-semibold text-zinc-700 pl-6">章节号</TableHead>
                    <TableHead className="w-64 font-semibold text-zinc-700">测试项目</TableHead>
                    <TableHead className="w-32 font-semibold text-zinc-700">测试人员</TableHead>
                    <TableHead className="w-32 font-semibold text-zinc-700">测试日期</TableHead>
                    <TableHead className="w-48 font-semibold text-zinc-700">使用设备</TableHead>
                    <TableHead className="w-24 font-semibold text-zinc-700">状态</TableHead>
                    <TableHead className="w-24 font-semibold text-zinc-700">结果</TableHead>
                    <TableHead className="w-24 font-semibold text-zinc-700 text-center">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeTests.map((item) => {
                    const rowData = state.testRows[item.id];
                    const equipmentList = rowData.equipment || [];
                    
                    return (
                      <TableRow key={item.id} className="border-b border-zinc-100">
                        <TableCell className="font-mono text-xs text-zinc-600 pl-6">{item.clause}</TableCell>
                        <TableCell className="font-medium text-zinc-800">{item.name}</TableCell>
                        <TableCell className="text-zinc-600">{rowData.tester}</TableCell>
                        <TableCell className="text-zinc-600">{rowData.date}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {equipmentList.length > 0 ? (
                              equipmentList.map(eq => (
                                <Badge key={eq} variant="secondary" className="text-[10px] font-normal bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
                                  {eq.toUpperCase()}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-zinc-400 text-xs">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {rowData.status === 'running' && <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 font-normal">进行中</Badge>}
                          {rowData.status === 'paused' && <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 font-normal">已暂停</Badge>}
                          {rowData.status === 'completed' && <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 font-normal">已完成</Badge>}
                        </TableCell>
                        <TableCell>
                          {rowData.result === 'PASS' && <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 font-normal">PASS</Badge>}
                          {rowData.result === 'FAIL' && <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 font-normal">FAIL</Badge>}
                          {(!rowData.result || rowData.result === 'NT') && <span className="text-zinc-400 text-xs">-</span>}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 h-8 px-2">查看详情</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
