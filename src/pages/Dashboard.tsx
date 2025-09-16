import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/ui/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAttendanceStats, mockAttendanceData, mockDepartmentData } from '@/data/mockData';
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Calendar,
  AlertTriangle
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

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export function Dashboard() {
  const { user } = useAuth();

  if (user?.role === 'student') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Track your attendance and academic progress</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Overall Attendance"
            value="79.2%"
            description="Current semester"
            icon={UserCheck}
            trend={{ value: 2, label: "from last month" }}
            className="border-l-4 border-l-blue-500"
          />
          <StatsCard
            title="Classes Attended"
            value="95/120"
            description="Total this semester"
            // icon={Calendar}
            icon={Users}
          />
          <StatsCard
            title="Warning Status"
            value="Alert"
            description="Below 75% threshold"
            icon={AlertTriangle}
            className="border-l-4 border-l-red-500"
          />
          <StatsCard
            title="Next Class"
            value="2:00 PM"
            description="Database Systems"
            icon={Calendar}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Trend</CardTitle>
              <CardDescription>Your attendance percentage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="percentage" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Alert</CardTitle>
              <CardDescription>Important notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20 dark:border-red-800">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800 dark:text-red-200">Attendance Warning</p>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    Your current attendance is 79.2%, which is below the required 75% minimum. Please attend classes regularly to avoid academic issues.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Recommendations:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Attend all upcoming classes</li>
                  <li>• Meet with your academic advisor</li>
                  <li>• Review attendance policy</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          {user?.role === 'admin' ? 'System overview and analytics' : 'Your classes and student attendance'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={mockAttendanceStats.totalStudents}
          description="Enrolled this semester"
          icon={Users}
          trend={{ value: 5, label: "from last month" }}
        />
        <StatsCard
          title="Present Today"
          value={mockAttendanceStats.presentToday}
          description="Out of total students"
          icon={UserCheck}
          trend={{ value: 2, label: "from yesterday" }}
          className="border-l-4 border-l-green-500"
        />
        <StatsCard
          title="Absent Today"
          value={mockAttendanceStats.absentToday}
          description="Students not present"
          icon={UserX}
          trend={{ value: -1, label: "from yesterday" }}
          className="border-l-4 border-l-red-500"
        />
        <StatsCard
          title="Attendance Rate"
          value={`${mockAttendanceStats.attendancePercentage}%`}
          description="Overall performance"
          icon={TrendingUp}
          trend={{ value: 3, label: "from last week" }}
          className="border-l-4 border-l-blue-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance percentage overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="percentage" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Wise Attendance</CardTitle>
            <CardDescription>Attendance comparison across departments</CardDescription>
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
      </div>

      {user?.role === 'admin' && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                <div className="font-medium">Generate Reports</div>
                <div className="text-sm text-muted-foreground">Create attendance reports</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                <div className="font-medium">Add New User</div>
                <div className="text-sm text-muted-foreground">Register student or faculty</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                <div className="font-medium">System Settings</div>
                <div className="text-sm text-muted-foreground">Configure system preferences</div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Attendance Alerts</CardTitle>
              <CardDescription>Students below 75% attendance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="font-medium text-sm">Carol Davis (70.8%)</p>
                  <p className="text-xs text-muted-foreground">CS21003</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="font-medium text-sm">Emma Brown (73.3%)</p>
                  <p className="text-xs text-muted-foreground">CS21005</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Attendance marked for CS-A</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New student registered</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Faculty updated profile</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}