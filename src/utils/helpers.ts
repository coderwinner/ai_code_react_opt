import { Student, StudentFormData } from '../types';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const generateMockStudents = (): Student[] => {
  return [
    {
      id: generateId(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      grade: 'A',
      major: 'Computer Science',
      enrollmentDate: '2023-09-01',
      status: 'active',
      gender: 'male',
      phoneNumber: '123-456-7890',
      address: '123 University Ave, College Town, CT 12345'
    },
    {
      id: generateId(),
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      grade: 'B+',
      major: 'Business Administration',
      enrollmentDate: '2022-09-01',
      status: 'active',
      gender: 'female',
      phoneNumber: '123-456-7891',
      address: '456 College St, University City, UC 67890'
    },
    {
      id: generateId(),
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.j@example.com',
      grade: 'A-',
      major: 'Mathematics',
      enrollmentDate: '2023-01-15',
      status: 'active',
      gender: 'male',
      phoneNumber: '123-456-7892',
      address: '789 Academy Rd, Learning Heights, LH 23456'
    },
    {
      id: generateId(),
      firstName: 'Emily',
      lastName: 'Williams',
      email: 'emily.w@example.com',
      grade: 'A',
      major: 'Biology',
      enrollmentDate: '2022-01-15',
      status: 'graduated',
      gender: 'female',
      phoneNumber: '123-456-7893',
      address: '321 Science Blvd, Research Park, RP 34567'
    },
    {
      id: generateId(),
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.b@example.com',
      grade: 'C',
      major: 'Psychology',
      enrollmentDate: '2023-09-01',
      status: 'inactive',
      gender: 'male',
      phoneNumber: '123-456-7894',
      address: '654 Mind St, Psychology Town, PT 45678'
    }
  ];
};

export const sortStudents = (
  students: Student[], 
  sortBy: keyof Student, 
  sortOrder: 'asc' | 'desc'
): Student[] => {
  return [...students].sort((a, b) => {
    const valueA = a[sortBy].toString().toLowerCase();
    const valueB = b[sortBy].toString().toLowerCase();
    
    if (sortOrder === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
};

export const filterStudents = (
  students: Student[],
  searchTerm: string
): Student[] => {
  const term = searchTerm.toLowerCase();
  
  return students.filter(student => 
    student.firstName.toLowerCase().includes(term) ||
    student.lastName.toLowerCase().includes(term) ||
    student.email.toLowerCase().includes(term) ||
    student.major.toLowerCase().includes(term)
  );
};

export const validateStudentData = (data: StudentFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required';
  }
  
  if (!data.major.trim()) errors.major = 'Major is required';
  if (!data.grade.trim()) errors.grade = 'Grade is required';
  if (!data.enrollmentDate.trim()) errors.enrollmentDate = 'Enrollment date is required';
  if (!data.address.trim()) errors.address = 'Address is required';
  
  return errors;
};