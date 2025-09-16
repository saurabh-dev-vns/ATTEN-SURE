export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  avatar?: string;
  department?: string;
  rollNumber?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  department: string;
  semester: string;
  attendance: AttendanceRecord[];
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
  faculty: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
}

export interface AttendanceStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  attendancePercentage: number;
}