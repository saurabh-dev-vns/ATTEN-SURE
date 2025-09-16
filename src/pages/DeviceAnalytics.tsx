import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Wifi, AlertTriangle, Smartphone, Cpu, BarChart3, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function DeviceAnalytics() {
  const deviceStatus = [
    { name: 'Online', value: 120, color: '#10B981' },
    { name: 'Offline', value: 15, color: '#EF4444' },
    { name: 'Idle', value: 30, color: '#F59E0B' },
  ];

  const deviceTypes = [
    { type: 'Smartphones', count: 80 },
    { type: 'Tablets', count: 45 },
    { type: 'IoT Sensors', count: 30 },
    { type: 'Other', count: 10 },
  ];

  const usageTrends = [
    { month: 'Jan', usage: 1200 },
    { month: 'Feb', usage: 1350 },
    { month: 'Mar', usage: 1420 },
    { month: 'Apr', usage: 1550 },
    { month: 'May', usage: 1490 },
    { month: 'Jun', usage: 1625 },
  ];

  const errorLogs = [
    { id: 1, device: 'Sensor-01', message: 'Temperature spike detected', severity: 'High' },
    { id: 2, device: 'Tablet-12', message: 'Battery low', severity: 'Medium' },
    { id: 3, device: 'Phone-09', message: 'Lost connection', severity: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Device Analytics</h1>
          <p className="text-muted-foreground">Monitor device health, usage, and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Wifi className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">120</p>
                <p className="text-sm text-muted-foreground">Active Devices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">15</p>
                <p className="text-sm text-muted-foreground">Devices Offline</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">85%</p>
                <p className="text-sm text-muted-foreground">Network Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Cpu className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-purple-600">65%</p>
                <p className="text-sm text-muted-foreground">Avg CPU Load</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Device Status</CardTitle>
            <CardDescription>Current status of all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={deviceStatus} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {deviceStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Usage Trend</CardTitle>
            <CardDescription>Monthly data usage (GB)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Types</CardTitle>
            <CardDescription>Distribution of devices by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Device Errors</CardTitle>
            <CardDescription>Most recent alerts from devices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{log.device}</p>
                  <p className="text-sm text-muted-foreground">{log.message}</p>
                </div>
                <Badge variant={log.severity === 'High' ? 'destructive' : log.severity === 'Medium' ? 'secondary' : 'outline'}>
                  {log.severity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Insights</CardTitle>
          <CardDescription>Key findings and recommendations</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-800 dark:text-green-200">Improved Uptime</h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Network uptime improved by 5% compared to last month.
            </p>
          </div>

          <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="h-5 w-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">High Mobile Load</h4>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Smartphone devices are using 70% of total bandwidth.
            </p>
          </div>

          <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h4 className="font-medium text-red-800 dark:text-red-200">Offline Devices</h4>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">
              15 devices are offline. Investigate connectivity issues.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
