import React, { useState, useEffect } from 'react';
import { Student, StudentFormData } from '../types';
import Button from './Button';
import { validateStudentData } from '../utils/helpers';

interface StudentFormProps {
  initialData?: Student;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

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

const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const validationErrors = validateStudentData(formData);
    setErrors(validationErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateStudentData(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      // Mark all fields as touched to show all errors
      const allTouched = Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      setTouched(allTouched);
    }
  };

  const getInputClasses = (fieldName: string) => {
    const baseClasses = 'w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 transition-all';
    return touched[fieldName] && errors[fieldName]
      ? `${baseClasses} border-red-300 focus:border-red-300 focus:ring-red-200`
      : `${baseClasses} border-gray-300 focus:border-blue-300 focus:ring-blue-200`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('firstName')}
            placeholder="First Name"
          />
          {touched.firstName && errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('lastName')}
            placeholder="Last Name"
          />
          {touched.lastName && errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('email')}
            placeholder="Email"
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('phoneNumber')}
            placeholder="Phone Number"
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('gender')}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        {/* Academic Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Major
          </label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('major')}
            placeholder="Major"
          />
          {touched.major && errors.major && (
            <p className="mt-1 text-sm text-red-600">{errors.major}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grade
          </label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('grade')}
            placeholder="Grade (e.g., A, B+, C)"
          />
          {touched.grade && errors.grade && (
            <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enrollment Date
          </label>
          <input
            type="date"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('enrollmentDate')}
          />
          {touched.enrollmentDate && errors.enrollmentDate && (
            <p className="mt-1 text-sm text-red-600">{errors.enrollmentDate}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('status')}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={3}
          className={getInputClasses('address')}
          placeholder="Address"
        />
        {touched.address && errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
        )}
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;