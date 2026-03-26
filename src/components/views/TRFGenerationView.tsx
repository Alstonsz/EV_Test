import { AppState } from '../../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, FileCheck, AlertCircle } from 'lucide-react';
import { ALL_TEST_ITEMS } from '../../lib/testItems';

export function TRFGenerationView({ state }: { state: AppState }) {
  // Calculate test progress
  const totalTests = ALL_TEST_ITEMS.length;
  const completedTests = ALL_TEST_ITEMS.filter(item => {
    const rowData = state.testRows[item.id];
    return rowData && rowData.status === 'completed';
  }).length;
  
  const passedTests = ALL_TEST_ITEMS.filter(item => {
    const rowData = state.testRows[item.id];
    return rowData && rowData.result === 'PASS';
  }).length;

  const failedTests = ALL_TEST_ITEMS.filter(item => {
    const rowData = state.testRows[item.id];
    return rowData && rowData.result === 'FAIL';
  }).length;

  const progressPercentage = Math.round((completedTests / totalTests) * 100) || 0;
  const isReadyForReport = progressPercentage === 100 && failedTests === 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">TRF 报告生成</h2>
          <p className="text-sm text-zinc-500 mt-1">基于测试数据自动生成标准格式的测试报告 (Test Report Format)</p>
        </div>
        <Button 
          className={`rounded-sm flex items-center space-x-2 ${isReadyForReport ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-zinc-200 text-zinc-500 cursor-not-allowed'}`}
          disabled={!isReadyForReport}
        >
          <Download className="w-4 h-4" />
          <span>生成并下载 TRF 报告</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-zinc-200 shadow-sm rounded-sm md:col-span-2">
          <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
            <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <span>测试进度与状态</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-zinc-700">总体测试进度</span>
                <span className="font-bold text-blue-600">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-zinc-50 rounded-sm border border-zinc-100 text-center">
                <p className="text-xs text-zinc-500 mb-1">总测试项</p>
                <p className="text-2xl font-bold text-zinc-800">{totalTests}</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-sm border border-emerald-100 text-center">
                <p className="text-xs text-emerald-600 mb-1">已通过 (PASS)</p>
                <p className="text-2xl font-bold text-emerald-700">{passedTests}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-sm border border-red-100 text-center">
                <p className="text-xs text-red-600 mb-1">未通过 (FAIL)</p>
                <p className="text-2xl font-bold text-red-700">{failedTests}</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-sm border border-amber-100 text-center">
                <p className="text-xs text-amber-600 mb-1">待测试/进行中</p>
                <p className="text-2xl font-bold text-amber-700">{totalTests - completedTests}</p>
              </div>
            </div>

            {!isReadyForReport && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-sm flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">无法生成报告</h4>
                  <p className="text-xs text-amber-700 mt-1">
                    {failedTests > 0 
                      ? "存在未通过 (FAIL) 的测试项，请修复问题并重新测试后再生成报告。" 
                      : "测试尚未全部完成，请完成所有测试项后再生成报告。"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-zinc-200 shadow-sm rounded-sm">
          <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
            <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>报告基础信息</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <p className="text-xs text-zinc-500 mb-1">项目编号</p>
              <p className="text-sm font-medium text-zinc-800">{state.productInfo.projectNo || '未填写'}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">公司名称</p>
              <p className="text-sm font-medium text-zinc-800">{state.productInfo.company || '未填写'}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">产品型号</p>
              <p className="text-sm font-medium text-zinc-800">{state.productInfo.model || '未填写'}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">测试标准</p>
              <p className="text-sm font-medium text-zinc-800">IEC 61851-1</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">主测试员</p>
              <p className="text-sm font-medium text-zinc-800">{state.productInfo.tester || '未填写'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-200 shadow-sm rounded-sm">
        <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
          <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-blue-600" />
            <span>测试结果概览</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[800px] text-sm">
              <TableHeader className="bg-zinc-50 border-b border-zinc-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-24 font-semibold text-zinc-700 pl-6">章节号</TableHead>
                  <TableHead className="w-64 font-semibold text-zinc-700">测试项目</TableHead>
                  <TableHead className="w-32 font-semibold text-zinc-700">测试人员</TableHead>
                  <TableHead className="w-32 font-semibold text-zinc-700">测试日期</TableHead>
                  <TableHead className="w-24 font-semibold text-zinc-700 text-center">结果</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ALL_TEST_ITEMS.map((item) => {
                  const rowData = state.testRows[item.id];
                  const result = rowData?.result;
                  
                  return (
                    <TableRow key={item.id} className="border-b border-zinc-100">
                      <TableCell className="font-mono text-xs text-zinc-600 pl-6">{item.clause}</TableCell>
                      <TableCell className="font-medium text-zinc-800">{item.name}</TableCell>
                      <TableCell className="text-zinc-600">{rowData?.tester || '-'}</TableCell>
                      <TableCell className="text-zinc-600">{rowData?.date || '-'}</TableCell>
                      <TableCell className="text-center">
                        {result === 'PASS' ? (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 font-normal">PASS</Badge>
                        ) : result === 'FAIL' ? (
                          <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 font-normal">FAIL</Badge>
                        ) : (
                          <Badge variant="outline" className="text-zinc-400 border-zinc-200 font-normal">未完成</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
