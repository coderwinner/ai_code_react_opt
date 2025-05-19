import { useState, useEffect, useCallback } from 'react';
import { Student, StudentFormData } from '../types';
import { generateId, generateMockStudents, sortStudents, filterStudents } from '../utils/helpers';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Student>('lastName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Load initial data
  useEffect(() => {
    const loadStudents = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockStudents = generateMockStudents();
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
        setIsLoading(false);
      }, 800);
    };
    
    loadStudents();
  }, []);

  // Filter and sort students
  useEffect(() => {
    let result = [...students];
    
    if (searchTerm.trim() !== '') {
      result = filterStudents(result, searchTerm);
    }
    
    result = sortStudents(result, sortBy, sortOrder);
    setFilteredStudents(result);
  }, [searchTerm, students, sortBy, sortOrder]);

  const handleSort = useCallback((key: keyof Student) => {
    setSortBy(key);
    setSortOrder(prev => (sortBy === key && prev === 'asc' ? 'desc' : 'asc'));
  }, [sortBy]);

  const addStudent = useCallback((data: StudentFormData): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent: Student = {
          id: generateId(),
          ...data
        };
        setStudents(prev => [...prev, newStudent]);
        resolve();
      }, 600);
    });
  }, []);

  const updateStudent = useCallback((id: string, data: StudentFormData): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setStudents(prev =>
          prev.map(student => student.id === id ? { ...student, ...data } : student)
        );
        resolve();
      }, 600);
    });
  }, []);

  const deleteStudent = useCallback((id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setStudents(prev => prev.filter(student => student.id !== id));
        resolve();
      }, 600);
    });
  }, []);

  return {
    students: filteredStudents,
    isLoading,
    searchTerm,
    setSearchTerm,
    sortBy,
    sortOrder,
    handleSort,
    addStudent,
    updateStudent,
    deleteStudent
  };
};
