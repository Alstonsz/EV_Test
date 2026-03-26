import { AppState } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { ALL_TEST_ITEMS } from '../../lib/testItems';

export function CompletedTestsView({ state }: { state: AppState }) {
  // Filter for tests that are completed and PASS, and were tested by the current user
  const completedTests = ALL_TEST_ITEMS.filter(item => {
    const rowData = state.testRows[item.id];
    return rowData && rowData.result === 'PASS' && rowData.tester === state.user;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-zinc-200 shadow-sm rounded-sm">
        <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
          <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>已完成测试项目 ({completedTests.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          {completedTests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
              <CheckCircle2 className="w-12 h-12 mb-4 opacity-20" />
              <p>暂无已完成的测试项目</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[1000px] text-sm">
                <TableHeader className="bg-zinc-50 border-b border-zinc-200">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-24 font-semibold text-zinc-700 pl-6">章节号</TableHead>
                    <TableHead className="w-64 font-semibold text-zinc-700">测试项目</TableHead>
                    <TableHead className="w-40 font-semibold text-zinc-700">测试要求</TableHead>
                    <TableHead className="w-32 font-semibold text-zinc-700">测试人员</TableHead>
                    <TableHead className="w-40 font-semibold text-zinc-700">测试日期</TableHead>
                    <TableHead className="w-24 font-semibold text-zinc-700">测试结果</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedTests.map((item) => {
                    const rowData = state.testRows[item.id];
                    return (
                      <TableRow key={item.id} className="border-b border-zinc-100">
                        <TableCell className="font-mono text-xs text-zinc-600 pl-6">{item.clause}</TableCell>
                        <TableCell className="font-medium text-zinc-800">{item.name}</TableCell>
                        <TableCell className="text-zinc-500 text-xs">{item.requirement}</TableCell>
                        <TableCell className="text-zinc-700">{rowData.tester}</TableCell>
                        <TableCell className="text-zinc-700">{rowData.date}</TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-normal">
                            {rowData.result}
                          </Badge>
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
