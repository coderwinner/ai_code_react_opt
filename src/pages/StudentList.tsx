import React, { useState } from 'react';
import { Student, StudentFormData } from '../types';
import StudentCard from '../components/StudentCard';
import Modal from '../components/Modal';
import StudentForm from '../components/StudentForm';
import StudentDetail from '../components/StudentDetail';
import Button from '../components/Button';
import { Plus, Search, RefreshCw, ChevronDown } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import { useModal } from '../hooks/useModal';

const StudentList: React.FC = () => {
  const {
    students,
    isLoading,
    searchTerm,
    setSearchTerm,
    sortBy,
    handleSort,
    addStudent,
    updateStudent,
    deleteStudent
  } = useStudents();

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const addModal = useModal();
  const editModal = useModal();
  const viewModal = useModal();
  const deleteModal = useModal();

  // Handle CRUD operations
  const handleAddStudent = async (data: StudentFormData) => {
    setIsSubmitting(true);
    await addStudent(data);
    setIsSubmitting(false);
    addModal.close();
  };

  const handleUpdateStudent = async (data: StudentFormData) => {
    if (!selectedStudent) return;
    setIsSubmitting(true);
    await updateStudent(selectedStudent.id, data);
    setIsSubmitting(false);
    editModal.close();
    setSelectedStudent(null);
  };

  const handleDeleteStudent = async () => {
    if (!selectedStudent) return;
    setIsSubmitting(true);
    await deleteStudent(selectedStudent.id);
    setIsSubmitting(false);
    deleteModal.close();
    setSelectedStudent(null);
  };

  // Modal handlers
  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    editModal.open();
  };

  const openViewModal = (student: Student) => {
    setSelectedStudent(student);
    viewModal.open();
  };

  const openDeleteModal = (student: Student) => {
    setSelectedStudent(student);
    deleteModal.open();
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
            className={`ml-1 transition-transform`}
          />
        )}
      </button>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Management System</h1>
        <Button onClick={addModal.open}>
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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">Sort by:</div>
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
      ) : students.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">No students found.</p>
          <Button variant="secondary" onClick={addModal.open}>
            <Plus size={16} className="mr-1" /> Add Your First Student
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map(student => (
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
        isOpen={addModal.isOpen}
        onClose={addModal.close}
        title="Add New Student"
        size="lg"
      >
        <StudentForm
          onSubmit={handleAddStudent}
          onCancel={addModal.close}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Edit Student Modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        title="Edit Student"
        size="lg"
      >
        {selectedStudent && (
          <StudentForm
            initialData={selectedStudent}
            onSubmit={handleUpdateStudent}
            onCancel={editModal.close}
            isSubmitting={isSubmitting}
          />
        )}
      </Modal>

      {/* View Student Modal */}
      <Modal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        title="Student Details"
        size="md"
      >
        {selectedStudent && <StudentDetail student={selectedStudent} />}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
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
            <Button variant="ghost" onClick={deleteModal.close}>
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

export default StudentList
