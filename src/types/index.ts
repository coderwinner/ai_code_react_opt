export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  major: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
  gender: 'male' | 'female' | 'other';
  phoneNumber: string;
  address: string;
}

export type StudentFormData = Omit<Student, 'id'>;