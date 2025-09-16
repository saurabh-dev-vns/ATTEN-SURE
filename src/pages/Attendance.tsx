import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockStudents } from '@/data/mockData';
import { Search, Filter, QrCode, Users, UserCheck, UserX, Download } from 'lucide-react';
import { toast } from 'sonner';

export function Attendance() {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
    
    if (statusFilter === 'all') return matchesSearch && matchesDepartment;
    if (statusFilter === 'low') return matchesSearch && matchesDepartment && student.attendancePercentage < 75;
    if (statusFilter === 'good') return matchesSearch && matchesDepartment && student.attendancePercentage >= 75;
    
    return matchesSearch && matchesDepartment;
  });

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({
      ...student,
      attendedClasses: Math.min(student.attendedClasses + 1, student.totalClasses),
      attendancePercentage: Math.min(((student.attendedClasses + 1) / student.totalClasses) * 100, 100)
    })));
    toast.success('Marked all students as present');
  };

  const markAllAbsent = () => {
    toast.success('Marked all students as absent for today');
  };

  const toggleStudentAttendance = (id: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id === id) {
        const newAttended = student.attendedClasses === student.totalClasses 
          ? student.attendedClasses - 1 
          : student.attendedClasses + 1;
        return {
          ...student,
          attendedClasses: newAttended,
          attendancePercentage: (newAttended / student.totalClasses) * 100
        };
      }
      return student;
    }));
    toast.success('Attendance updated');
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 90) return <Badge className="bg-green-500">Excellent</Badge>;
    if (percentage >= 75) return <Badge className="bg-blue-500">Good</Badge>;
    if (percentage >= 60) return <Badge variant="secondary">Average</Badge>;
    return <Badge variant="destructive">Poor</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">Mark and track student attendance</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600">
              <QrCode className="mr-2 h-4 w-4" />
              QR Scanner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>QR Code Scanner</DialogTitle>
              <DialogDescription>
                Use QR code to mark attendance automatically
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
              <div className="text-center">
                <QrCode className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">QR Scanner would be integrated here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Students can scan their ID cards or use mobile app
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{filteredStudents.length}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <UserCheck className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredStudents.filter(s => s.attendancePercentage >= 75).length}
                </p>
                <p className="text-sm text-muted-foreground">Good Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <UserX className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredStudents.filter(s => s.attendancePercentage < 75).length}
                </p>
                <p className="text-sm text-muted-foreground">Low Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Download className="h-8 w-8 text-purple-500" />
              <div>
                <Button variant="outline" size="sm" className="h-8">
                  Export CSV
                </Button>
                <p className="text-sm text-muted-foreground mt-1">Download Report</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Student Attendance</CardTitle>
              <CardDescription>Manage daily attendance for all students</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllAbsent}>
                Mark All Absent
              </Button>
              <Button onClick={markAllPresent}>
                Mark All Present
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or roll number..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="good">Good (≥75%)</SelectItem>
                <SelectItem value="low">Low (&lt;75%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-foreground">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{student.rollNumber}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{student.attendancePercentage.toFixed(1)}%</p>
                        <p className="text-sm text-muted-foreground">
                          {student.attendedClasses}/{student.totalClasses}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(student.attendancePercentage)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleStudentAttendance(student.id)}
                      >
                        Toggle
                      </Button>
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