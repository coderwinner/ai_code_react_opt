import React from 'react';
import { Student } from '../types';
import Badge from './Badge';

interface StudentDetailProps {
  student: Student;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student }) => {
  const statusVariant = {
    active: 'success',
    inactive: 'warning',
    graduated: 'info'
  } as const;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800 text-xl">
            {student.firstName} {student.lastName}
          </h3>
          <p className="text-gray-600">{student.email}</p>
        </div>
        <Badge 
          variant={statusVariant[student.status]} 
          label={student.status.charAt(0).toUpperCase() + student.status.slice(1)} 
        />
      </div>
      
      {/* Personal Information */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
          Personal Information
        </h4>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Phone Number</p>
            <p className="text-sm font-medium text-gray-800">{student.phoneNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Gender</p>
            <p className="text-sm font-medium text-gray-800">
              {student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}
            </p>
          </div>
          <div className="col-span-1 md:col-span-2">
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm font-medium text-gray-800">{student.address}</p>
          </div>
        </div>
      </div>
      
      {/* Academic Information */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
          Academic Information
        </h4>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Major</p>
            <p className="text-sm font-medium text-gray-800">{student.major}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Grade</p>
            <p className="text-sm font-medium text-gray-800">{student.grade}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Enrollment Date</p>
            <p className="text-sm font-medium text-gray-800">
              {new Date(student.enrollmentDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;