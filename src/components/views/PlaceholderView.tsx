import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <Card className="border-zinc-200 shadow-sm rounded-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-zinc-800">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-zinc-400 border-2 border-dashed border-zinc-100 rounded-sm">
            <p>该模块正在开发中...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
