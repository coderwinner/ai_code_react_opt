import React, { useState, useEffect } from 'react';
import { Student, StudentFormData } from '../types';
import StudentCard from '../components/StudentCard';
import Modal from '../components/Modal';
import StudentForm from '../components/StudentForm';
import StudentDetail from '../components/StudentDetail';
import Button from '../components/Button';
import { Plus, Search, RefreshCw, ChevronDown } from 'lucide-react';
import { generateId, generateMockStudents, sortStudents, filterStudents } from '../utils/helpers';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // Sorting states
  const [sortBy, setSortBy] = useState<keyof Student>('lastName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Load mock data
  useEffect(() => {
    const loadStudents = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockStudents = generateMockStudents();
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
        setIsLoading(false);
      }, 800); // Simulate loading
    };
    
    loadStudents();
  }, []);
  
  // Filter students when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = filterStudents(students, searchTerm);
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sorting
  const handleSort = (key: keyof Student) => {
    const newSortOrder = sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(key);
    setSortOrder(newSortOrder);
    setFilteredStudents(sortStudents(filteredStudents, key, newSortOrder));
  };
  
  // CRUD operations
  const handleAddStudent = (data: StudentFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newStudent: Student = {
        id: generateId(),
        ...data
      };
      
      setStudents(prev => [...prev, newStudent]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
    }, 600);
  };
  
  const handleUpdateStudent = (data: StudentFormData) => {
    if (!selectedStudent) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedStudents = students.map(student => 
        student.id === selectedStudent.id ? { ...student, ...data } : student
      );
      
      setStudents(updatedStudents);
      setIsSubmitting(false);
      setIsEditModalOpen(false);
      setSelectedStudent(null);
    }, 600);
  };
  
  const handleDeleteStudent = () => {
    if (!selectedStudent) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredStudents = students.filter(
        student => student.id !== selectedStudent.id
      );
      
      setStudents(filteredStudents);
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
      setSelectedStudent(null);
    }, 600);
  };
  
  // Modal handlers
  const openAddModal = () => setIsAddModalOpen(true);
  
  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };
  
  const openViewModal = (student: Student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };
  
  const openDeleteModal = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };
  
  // Render sort button
  const renderSortButton = (key: keyof Student, label: string) => {
    return (
      <button
        onClick={() => handleSort(key)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        {label}
        {sortBy === key && (
          <ChevronDown
            size={16}
            className={`ml-1 ${sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform`}
          />
        )}
      </button>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Management System</h1>
        <Button onClick={openAddModal}>
          <Plus size={16} className="mr-1" /> Add Student
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Sort by:
            </div>
            <div className="flex space-x-4">
              {renderSortButton('lastName', 'Name')}
              {renderSortButton('major', 'Major')}
              {renderSortButton('enrollmentDate', 'Date')}
              {renderSortButton('status', 'Status')}
            </div>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw size={24} className="animate-spin text-blue-500 mr-2" />
          <span className="text-gray-600">Loading students...</span>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">No students found.</p>
          <Button variant="secondary" onClick={openAddModal}>
            <Plus size={16} className="mr-1" /> Add Your First Student
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onView={openViewModal}
            />
          ))}
        </div>
      )}
      
      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student"
        size="lg"
      >
        <StudentForm
          onSubmit={handleAddStudent}
          onCancel={() => setIsAddModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
      
      {/* Edit Student Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student"
        size="lg"
      >
        {selectedStudent && (
          <StudentForm
            initialData={selectedStudent}
            onSubmit={handleUpdateStudent}
            onCancel={() => setIsEditModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </Modal>
      
      {/* View Student Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Student Details"
        size="md"
      >
        {selectedStudent && (
          <StudentDetail student={selectedStudent} />
        )}
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Student"
        size="sm"
      >
        <div className="text-center">
          <p className="mb-4">
            Are you sure you want to delete{' '}
            <span className="font-semibold">
              {selectedStudent?.firstName} {selectedStudent?.lastName}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteStudent}
              isLoading={isSubmitting}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentList;