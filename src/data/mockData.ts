import { Student, AttendanceRecord, Faculty, AttendanceStats } from '@/types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    rollNumber: 'CS21001',
    email: 'aarav.sharma@college.edu',
    department: 'Computer Science',
    semester: '6',
    attendance: [],
    totalClasses: 120,
    attendedClasses: 95,
    attendancePercentage: 79.2
  },
  {
    id: '2',
    name: 'Ishaan Verma',
    rollNumber: 'CS21002',
    email: 'ishaan.verma@college.edu',
    department: 'Computer Science',
    semester: '6',
    attendance: [],
    totalClasses: 120,
    attendedClasses: 110,
    attendancePercentage: 91.7
  },
  {
    id: '3',
    name: 'Diya Iyer',
    rollNumber: 'CS21003',
    email: 'diya.iyer@college.edu',
    department: 'Computer Science',
    semester: '6',
    attendance: [],
    totalClasses: 120,
    attendedClasses: 85,
    attendancePercentage: 70.8
  },
  {
    id: '4',
    name: 'Rohan Nair',
    rollNumber: 'CS21004',
    email: 'rohan.nair@college.edu',
    department: 'Computer Science',
    semester: '6',
    attendance: [],
    totalClasses: 120,
    attendedClasses: 100,
    attendancePercentage: 83.3
  },
  {
    id: '5',
    name: 'Kavya Reddy',
    rollNumber: 'CS21005',
    email: 'kavya.reddy@college.edu',
    department: 'Computer Science',
    semester: '6',
    attendance: [],
    totalClasses: 120,
    attendedClasses: 88,
    attendancePercentage: 73.3
  }
];

export const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Prof. Meera Krishnan',
    email: 'meera.krishnan@college.edu',
    department: 'Computer Science',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems']
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kulkarni',
    email: 'rajesh.kulkarni@college.edu',
    department: 'Computer Science',
    subjects: ['Machine Learning', 'AI', 'Neural Networks']
  }
];

export const mockAttendanceStats: AttendanceStats = {
  totalStudents: 150,
  presentToday: 135,
  absentToday: 15,
  attendancePercentage: 90
};

export const mockAttendanceData = [
  { month: 'Jan', percentage: 85 },
  { month: 'Feb', percentage: 88 },
  { month: 'Mar', percentage: 82 },
  { month: 'Apr', percentage: 90 },
  { month: 'May', percentage: 87 },
  { month: 'Jun', percentage: 91 }
];

export const mockDepartmentData = [
  { department: 'Computer Science', attendance: 88 },
  { department: 'Electronics', attendance: 85 },
  { department: 'Mechanical', attendance: 82 },
  { department: 'Civil', attendance: 86 }
];
