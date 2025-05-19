import React from 'react';
import { Student } from '../types';
import Badge from './Badge';
import Button from './Button';
import { Edit, Trash2, Eye } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onView: (student: Student) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  onView
}) => {
  const statusVariant = {
    active: 'success',
    inactive: 'warning',
    graduated: 'info'
  } as const;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {student.firstName} {student.lastName}
            </h3>
            <p className="text-gray-600 text-sm">{student.email}</p>
          </div>
          <Badge 
            variant={statusVariant[student.status]} 
            label={student.status.charAt(0).toUpperCase() + student.status.slice(1)} 
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-xs text-gray-500">Major</p>
            <p className="text-sm text-gray-800">{student.major}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Grade</p>
            <p className="text-sm text-gray-800">{student.grade}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Enrollment Date</p>
            <p className="text-sm text-gray-800">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm text-gray-800">{student.phoneNumber}</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onView(student)}
            aria-label="View student details"
          >
            <Eye size={16} className="mr-1" /> View
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => onEdit(student)}
            aria-label="Edit student"
          >
            <Edit size={16} className="mr-1" /> Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => onDelete(student)}
            aria-label="Delete student"
          >
            <Trash2 size={16} className="mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;