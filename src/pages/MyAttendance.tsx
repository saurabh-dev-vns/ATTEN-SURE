import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockAttendanceData } from '@/data/mockData';
import {
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Target
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

export function MyAttendance() {
  const attendanceData = [
    { subject: 'Data Structures', attended: 28, total: 30, percentage: 93.3 },
    { subject: 'Database Systems', attended: 22, total: 30, percentage: 73.3 },
    { subject: 'Computer Networks', attended: 25, total: 30, percentage: 83.3 },
    { subject: 'Software Engineering', attended: 27, total: 30, percentage: 90.0 },
    { subject: 'Machine Learning', attended: 20, total: 30, percentage: 66.7 }
  ];

  const monthlyData = [
    { month: 'Jan', percentage: 85 },
    { month: 'Feb', percentage: 88 },
    { month: 'Mar', percentage: 82 },
    { month: 'Apr', percentage: 79 },
    { month: 'May', percentage: 77 },
    { month: 'Jun', percentage: 79 }
  ];

  const overallStats = {
    totalClasses: 150,
    attendedClasses: 122,
    percentage: 81.3,
    status: 'Good'
  };

  const statusDistribution = [
    { name: 'Present', value: 122, color: '#10B981' },
    { name: 'Absent', value: 28, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Attendance</h1>
        <p className="text-muted-foreground">Track your personal attendance and academic progress</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Target className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{overallStats.percentage}%</p>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{overallStats.attendedClasses}</p>
                <p className="text-sm text-muted-foreground">Classes Attended</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{overallStats.totalClasses - overallStats.attendedClasses}</p>
                <p className="text-sm text-muted-foreground">Classes Missed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{overallStats.totalClasses}</p>
                <p className="text-sm text-muted-foreground">Total Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Status Alert */}
      {overallStats.percentage < 75 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Attendance Warning</h3>
                <p className="text-red-700 dark:text-red-300 mb-3">
                  Your attendance is {overallStats.percentage}%, which is below the required 75% minimum.
                  You need to attend at least {Math.ceil((75 * overallStats.totalClasses - 100 * overallStats.attendedClasses) / 25)} more classes to reach 75%.
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">Action Required:</p>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    <li>• Attend all upcoming classes without fail</li>
                    <li>• Meet with your academic advisor immediately</li>
                    <li>• Review the college attendance policy</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
            <CardDescription>Your attendance percentage over the semester</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Attendance']} />
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
            <CardDescription>Present vs Absent classes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${(percent * 1).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
          <CardDescription>Detailed breakdown by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((subject, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{subject.subject}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={subject.percentage >= 75 ? 'default' : 'destructive'}>
                      {subject.percentage.toFixed(1)}%
                    </Badge>
                    {subject.percentage < 75 && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{subject.attended}/{subject.total} classes attended</span>
                  <span>{subject.total - subject.attended} classes missed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className={`h-2 rounded-full ${subject.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${subject.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Your latest class attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: '2024-01-15', subject: 'Data Structures', status: 'present', time: '9:00 AM' },
              { date: '2024-01-14', subject: 'Database Systems', status: 'absent', time: '11:00 AM' },
              { date: '2024-01-13', subject: 'Computer Networks', status: 'present', time: '2:00 PM' },
              { date: '2024-01-12', subject: 'Software Engineering', status: 'present', time: '10:00 AM' },
              { date: '2024-01-11', subject: 'Machine Learning', status: 'late', time: '3:00 PM' }
            ].map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    record.status === 'present' ? 'bg-green-500' :
                    record.status === 'absent' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{record.subject}</p>
                    <p className="text-sm text-muted-foreground">{record.date} at {record.time}</p>
                  </div>
                </div>
                <Badge variant={
                  record.status === 'present' ? 'default' :
                  record.status === 'absent' ? 'destructive' : 'secondary'
                }>
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}