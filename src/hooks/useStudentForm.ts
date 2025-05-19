import { useState, useEffect } from 'react';
import { Student, StudentFormData } from '../types';
import { validateStudentData } from '../utils/helpers';

const emptyFormData: StudentFormData = {
  firstName: '',
  lastName: '',
  email: '',
  grade: '',
  major: '',
  enrollmentDate: new Date().toISOString().split('T')[0],
  status: 'active',
  gender: 'other',
  phoneNumber: '',
  address: ''
};

export const useStudentForm = (initialData?: Student) => {
  const [formData, setFormData] = useState<StudentFormData>(
    initialData || emptyFormData
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const validationErrors = validateStudentData(formData);
    setErrors(validationErrors);
  };

  const validateForm = (): boolean => {
    const validationErrors = validateStudentData(formData);
    setErrors(validationErrors);
    
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    return Object.keys(validationErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(emptyFormData);
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  };
};
