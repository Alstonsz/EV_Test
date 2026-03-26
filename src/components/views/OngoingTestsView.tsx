import { useState, useRef, useEffect } from 'react';
import { AppState, TestRowData } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Save, ClipboardList, CheckSquare, Zap, ChevronDown } from 'lucide-react';
import { ALL_TEST_ITEMS } from '../../lib/testItems';

const EQUIPMENT_OPTIONS = [
  { id: 'osc', name: '示波器 (OSC-01)' },
  { id: 'pwr', name: '功率分析仪 (PWR-02)' },
  { id: 'dmm', name: '万用表 (DMM-03)' },
  { id: 'load', name: '电子负载 (ELD-04)' },
];

function EquipmentMultiSelect({ selected = [], onChange, disabled }: { selected: string[], onChange: (val: string[]) => void, disabled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (id: string) => {
    if (selected.includes(id)) onChange(selected.filter(x => x !== id));
    else onChange([...selected, id]);
  };

  const displayText = selected.length 
    ? selected.map(id => EQUIPMENT_OPTIONS.find(o => o.id === id)?.name.split(' ')[0]).join(', ') 
    : '选择设备...';

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`w-full border border-zinc-200 rounded-sm text-xs p-1.5 bg-white flex justify-between items-center ${disabled ? 'bg-zinc-50 text-zinc-400 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="truncate select-none">{displayText}</span>
        <ChevronDown className="w-3 h-3 opacity-50 shrink-0" />
      </div>
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-48 bg-white border border-zinc-200 shadow-lg rounded-sm py-1 max-h-48 overflow-y-auto">
          {EQUIPMENT_OPTIONS.map(opt => (
            <label key={opt.id} className="flex items-center px-3 py-2 hover:bg-zinc-50 cursor-pointer text-xs">
              <input type="checkbox" className="mr-2 accent-blue-600" checked={selected.includes(opt.id)} onChange={() => toggle(opt.id)} />
              {opt.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export function OngoingTestsView({ state, setState }: { state: AppState, setState: any }) {
  const [step, setStep] = useState<1 | 2>(1);

  const updateProductInfo = (field: string, value: string) => {
    setState({
      ...state,
      productInfo: { ...state.productInfo, [field]: value }
    });
  };

  const updateRow = (id: string, field: keyof TestRowData, value: any) => {
    const currentRow = state.testRows[id] || {
      selected: false,
      equipment: [],
      tester: state.productInfo.tester,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setState({
      ...state,
      testRows: {
        ...state.testRows,
        [id]: { ...currentRow, [field]: value }
      }
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    const newRows = { ...state.testRows };
    ALL_TEST_ITEMS.forEach(item => {
      const currentRow = newRows[item.id] || {
        equipment: [],
        tester: state.productInfo.tester,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      newRows[item.id] = { 
        ...currentRow, 
        selected: checked,
        tester: state.productInfo.tester,
        date: new Date().toISOString().split('T')[0]
      };
    });
    setState({ ...state, testRows: newRows });
  };

  const handleBatchAutoTest = () => {
    const newRows = { ...state.testRows };
    let hasChanges = false;
    ALL_TEST_ITEMS.forEach(item => {
      if (newRows[item.id]?.selected) {
        newRows[item.id] = {
          ...newRows[item.id],
          status: 'completed',
          result: 'PASS',
          tester: state.productInfo.tester,
          date: new Date().toISOString().split('T')[0]
        };
        hasChanges = true;
      }
    });
    if (hasChanges) setState({ ...state, testRows: newRows });
  };

  const allSelected = ALL_TEST_ITEMS.every(item => state.testRows[item.id]?.selected);
  const someSelected = ALL_TEST_ITEMS.some(item => state.testRows[item.id]?.selected);

  return (
    <div className="space-y-6">
      {/* Stepper Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className={`flex items-center space-x-2 ${step === 1 ? 'text-blue-600' : 'text-zinc-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold ${step === 1 ? 'border-blue-600 bg-blue-50' : 'border-zinc-300'}`}>1</div>
          <span className="font-medium">信息录入</span>
        </div>
        <div className="h-px w-16 bg-zinc-300"></div>
        <div className={`flex items-center space-x-2 ${step === 2 ? 'text-blue-600' : 'text-zinc-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold ${step === 2 ? 'border-blue-600 bg-blue-50' : 'border-zinc-300'}`}>2</div>
          <span className="font-medium">测试项目勾选</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-zinc-200 shadow-sm rounded-sm">
              <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
                <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
                  <ClipboardList className="w-4 h-4 text-blue-600" />
                  <span>测试信息录入</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-600">项目编号</Label>
                  <Input
                    value={state.productInfo.projectNo}
                    onChange={(e) => updateProductInfo('projectNo', e.target.value)}
                    placeholder="例如：PRJ-2026-001"
                    className="rounded-sm border-zinc-300 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-600">测试人员</Label>
                  <Input
                    value={state.productInfo.tester}
                    onChange={(e) => updateProductInfo('tester', e.target.value)}
                    placeholder="姓名"
                    className="rounded-sm border-zinc-300 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-600">样品编号</Label>
                  <Input
                    value={state.productInfo.sampleNo}
                    onChange={(e) => updateProductInfo('sampleNo', e.target.value)}
                    placeholder="例如：SMP-001"
                    className="rounded-sm border-zinc-300 focus-visible:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-200 shadow-sm rounded-sm">
              <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
                <CardTitle className="text-base font-semibold text-zinc-800 flex items-center space-x-2">
                  <ClipboardList className="w-4 h-4 text-blue-600" />
                  <span>项目信息</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-zinc-600">公司名字</Label>
                  <Input
                    value={state.productInfo.company}
                    onChange={(e) => updateProductInfo('company', e.target.value)}
                    placeholder="例如：Tesla"
                    className="rounded-sm border-zinc-300 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-zinc-600">产品型号</Label>
                  <Input
                    value={state.productInfo.model}
                    onChange={(e) => updateProductInfo('model', e.target.value)}
                    placeholder="例如：Supercharger V3"
                    className="rounded-sm border-zinc-300 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-600">额定电压 (V)</Label>
                  <Input
                    value={state.productInfo.voltage}
                    onChange={(e) => updateProductInfo('voltage', e.target.value)}
                    placeholder="230 / 400"
                    className="rounded-sm border-zinc-300 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-600">额定电流 (A)</Label>
                  <Input
                    value={state.productInfo.current}
                    onChange={(e) => updateProductInfo('current', e.target.value)}
                    placeholder="16 / 32"
                    className="rounded-sm border-zinc-300 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-zinc-600">IP等级</Label>
                  <Input
                    value={state.productInfo.ipDegree}
                    onChange={(e) => updateProductInfo('ipDegree', e.target.value)}
                    placeholder="例如：IP54"
                    className="rounded-sm border-zinc-300 focus-visible:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setStep(2)} className="rounded-sm bg-blue-600 hover:bg-blue-700 text-white px-8 flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>保存信息并继续</span>
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex justify-between items-center bg-white p-4 border border-zinc-200 rounded-sm shadow-sm">
            <div>
              <h3 className="text-lg font-semibold text-zinc-800 flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                <span>测试项目勾选</span>
              </h3>
              <p className="text-sm text-zinc-500 mt-1">勾选项目全选时如果不能当天完成，可以暂停，后续进行测试。</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(1)} className="rounded-sm border-zinc-300">
                返回修改信息
              </Button>
              <Button onClick={handleBatchAutoTest} className="rounded-sm bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>批量自动测试</span>
              </Button>
              <Button className="rounded-sm bg-blue-600 hover:bg-blue-700 text-white">
                保存测试计划
              </Button>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-sm shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-[1400px] text-sm">
                <TableHeader className="bg-zinc-50 border-b border-zinc-200">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12 text-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-600 rounded-sm border-zinc-300 cursor-pointer"
                        checked={allSelected}
                        ref={input => {
                          if (input) {
                            input.indeterminate = someSelected && !allSelected;
                          }
                        }}
                        onChange={(e) => toggleSelectAll(e.target.checked)}
                      />
                    </TableHead>
                    <TableHead className="w-20 font-semibold text-zinc-700">章节号</TableHead>
                    <TableHead className="w-48 font-semibold text-zinc-700">测试项目</TableHead>
                    <TableHead className="w-40 font-semibold text-zinc-700">测试要求</TableHead>
                    <TableHead className="w-40 font-semibold text-zinc-700">勾选设备</TableHead>
                    <TableHead className="w-20 font-semibold text-zinc-700">标准工时</TableHead>
                    <TableHead className="w-24 font-semibold text-zinc-700">测试人员</TableHead>
                    <TableHead className="w-32 font-semibold text-zinc-700">测试日期</TableHead>
                    <TableHead className="w-20 font-semibold text-zinc-700">状态</TableHead>
                    <TableHead className="w-20 font-semibold text-zinc-700">测试结果</TableHead>
                    <TableHead className="w-20 font-semibold text-zinc-700 text-center">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ALL_TEST_ITEMS.map((item) => {
                    const rowData = state.testRows[item.id] || {
                      selected: false,
                      equipment: [],
                      tester: state.productInfo.tester,
                      date: new Date().toISOString().split('T')[0],
                      status: 'pending'
                    };
                    const isSelected = rowData.selected;
                    
                    // Logic to show PASS tests from other users as "Untested" for the current user
                    const isTestedByMe = rowData.tester === state.user;
                    const effectiveStatus = (rowData.result === 'PASS' && !isTestedByMe) ? 'pending' : rowData.status;
                    const effectiveResult = (rowData.result === 'PASS' && !isTestedByMe) ? undefined : rowData.result;

                    return (
                      <TableRow key={item.id} className={`${isSelected ? 'bg-blue-50/30' : ''} border-b border-zinc-100 transition-colors`}>
                        <TableCell className="text-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-blue-600 rounded-sm border-zinc-300 cursor-pointer"
                            checked={isSelected}
                            onChange={(e) => updateRow(item.id, 'selected', e.target.checked)}
                          />
                        </TableCell>
                        <TableCell className="font-mono text-xs text-zinc-600">{item.clause}</TableCell>
                        <TableCell className="font-medium text-zinc-800">{item.name}</TableCell>
                        <TableCell className="text-zinc-500 text-xs">{item.requirement}</TableCell>
                        <TableCell>
                          <EquipmentMultiSelect 
                            selected={rowData.equipment || []} 
                            onChange={(val) => updateRow(item.id, 'equipment', val)} 
                            disabled={!isSelected} 
                          />
                        </TableCell>
                        <TableCell className="font-mono text-xs text-zinc-600">{item.standardHours}</TableCell>
                        <TableCell>
                          <span className={`text-xs ${!isSelected ? 'text-zinc-400' : 'text-zinc-700'}`}>
                            {state.productInfo.tester || '未指定'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <input
                            type="date"
                            disabled={!isSelected}
                            className="w-full border border-zinc-200 rounded-sm text-xs p-1.5 bg-white disabled:bg-zinc-50 disabled:text-zinc-400 focus:outline-none focus:border-blue-500"
                            value={rowData.date}
                            onChange={(e) => updateRow(item.id, 'date', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          {effectiveStatus === 'pending' && <Badge variant="outline" className="text-zinc-500 border-zinc-200 bg-zinc-50 font-normal">待测试</Badge>}
                          {effectiveStatus === 'running' && <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 font-normal">进行中</Badge>}
                          {effectiveStatus === 'paused' && <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 font-normal">已暂停</Badge>}
                          {effectiveStatus === 'completed' && <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 font-normal">已完成</Badge>}
                        </TableCell>
                        <TableCell>
                          {effectiveResult === 'PASS' && <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-normal">PASS</Badge>}
                          {effectiveResult === 'FAIL' && <Badge className="bg-red-500 hover:bg-red-600 text-white font-normal">FAIL</Badge>}
                          {(!effectiveResult || effectiveResult === 'NT') && <span className="text-zinc-400 text-xs">-</span>}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-blue-600 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-30"
                              disabled={!isSelected || effectiveStatus === 'completed'}
                              onClick={() => {
                                if (effectiveStatus === 'running') {
                                  updateRow(item.id, 'status', 'paused');
                                } else {
                                  updateRow(item.id, 'status', 'running');
                                }
                              }}
                              title={effectiveStatus === 'running' ? '暂停测试' : '开始测试'}
                            >
                              {effectiveStatus === 'running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
