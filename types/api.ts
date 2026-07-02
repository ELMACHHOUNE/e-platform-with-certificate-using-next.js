import type { CertificateData } from "./certificate";

export interface StudentData extends CertificateData {
  _id: string;
  email: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface StudentsResponse {
  students: StudentData[];
  pagination: PaginationMeta;
}

export interface StudentResponse {
  student: StudentData;
}

export interface CourseData {
  _id: string;
  title: string;
  description: string;
  icon: string;
  students: number;
  instructorName: string;
  color: string;
  iconColor: string;
}

export interface CoursesResponse {
  courses: CourseData[];
}

export interface InstructorData {
  _id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  studentsCount: number;
  coursesCount: number;
}

export interface InstructorsResponse {
  instructors: InstructorData[];
}

export interface StatsData {
  totalStudents: number;
  studentsWithCertificate: number;
  totalCourses: number;
  totalInstructors: number;
  completionRate: number;
}

export interface StatsResponse {
  stats: StatsData;
}

export interface ErrorResponse {
  error: string;
}
