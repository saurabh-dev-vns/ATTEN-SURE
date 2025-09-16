import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockStudents, mockAttendanceData, mockDepartmentData } from '@/data/mockData';
import { Download, TrendingUp, TrendingDown, Users, Award } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];

export function Analytics() {
  const lowAttendanceStudents = mockStudents.filter(s => s.attendancePercentage < 75);
  const highPerformers = mockStudents.filter(s => s.attendancePercentage >= 90);
  
  const attendanceDistribution = [
    { name: '90-100%', value: mockStudents.filter(s => s.attendancePercentage >= 90).length, color: '#10B981' },
    { name: '75-89%', value: mockStudents.filter(s => s.attendancePercentage >= 75 && s.attendancePercentage < 90).length, color: '#3B82F6' },
    { name: '60-74%', value: mockStudents.filter(s => s.attendancePercentage >= 60 && s.attendancePercentage < 75).length, color: '#F59E0B' },
    { name: 'Below 60%', value: mockStudents.filter(s => s.attendancePercentage < 60).length, color: '#EF4444' },
  ];

  const monthlyTrends = [
    { month: 'Jan', present: 145, absent: 15, late: 5 },
    { month: 'Feb', present: 142, absent: 18, late: 7 },
    { month: 'Mar', present: 138, absent: 22, late: 8 },
    { month: 'Apr', present: 148, absent: 12, late: 4 },
    { month: 'May', present: 144, absent: 16, late: 6 },
    { month: 'Jun', present: 150, absent: 10, late: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-muted-foreground">Comprehensive attendance analytics and reports</p>
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
              <Award className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{highPerformers.length}</p>
                <p className="text-sm text-muted-foreground">High Performers (≥90%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <TrendingDown className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">{lowAttendanceStudents.length}</p>
                <p className="text-sm text-muted-foreground">At Risk (&lt;75%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">87.3%</p>
                <p className="text-sm text-muted-foreground">Average Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-purple-600">150</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="present" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="late" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                <Area type="monotone" dataKey="absent" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
            <CardDescription>Student distribution by attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceDistribution.map((entry, index) => (
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
            <CardTitle>Department Comparison</CardTitle>
            <CardDescription>Attendance rates across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockDepartmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
            <CardDescription>Day-wise attendance patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { day: 'Mon', attendance: 92 },
                { day: 'Tue', attendance: 89 },
                { day: 'Wed', attendance: 85 },
                { day: 'Thu', attendance: 88 },
                { day: 'Fri', attendance: 84 },
                { day: 'Sat', attendance: 76 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Students at Risk
            </CardTitle>
            <CardDescription>Students with attendance below 75%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowAttendanceStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">{student.attendancePercentage.toFixed(1)}%</Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {student.attendedClasses}/{student.totalClasses}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              Top Performers
            </CardTitle>
            <CardDescription>Students with excellent attendance (≥90%)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {highPerformers.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500">{student.attendancePercentage.toFixed(1)}%</Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {student.attendedClasses}/{student.totalClasses}
                  </p>
                </div>
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
              <h4 className="font-medium text-green-800 dark:text-green-200">Positive Trend</h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Overall attendance has improved by 3% compared to last month
            </p>
          </div>
          
          <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Action Required</h4>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              2 students need immediate attention for low attendance
            </p>
          </div>
          
          <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Best Department</h4>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Computer Science leads with 88% average attendance
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}