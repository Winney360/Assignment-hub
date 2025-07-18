import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ClassCard from '../components/ClassCard';
import AssignmentCard from '../components/AssignmentCard';
import { 
  PlusIcon, 
  AcademicCapIcon, 
  ClipboardListIcon,
  UsersIcon,
  TrendingUpIcon 
} from '@heroicons/react/outline';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: classes, isLoading: classesLoading } = useQuery(
    'classes',
    () => axios.get(`${process.env.REACT_APP_API_URL}/api/classes`).then(res => res.data)
  );

  const { data: assignments, isLoading: assignmentsLoading } = useQuery(
    'assignments',
    () => axios.get(`${process.env.REACT_APP_API_URL}/api/assignments`).then(res => res.data)
  );

  if (classesLoading || assignmentsLoading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  const totalClasses = classes?.length || 0;
  const totalAssignments = assignments?.length || 0;
  const activeAssignments = assignments?.filter(assignment => {
    const now = new Date();
    return new Date(assignment.availableFrom) <= now && 
           new Date(assignment.expiresAt) >= now;
  }).length || 0;

  const recentAssignments = assignments?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your classes and assignments from your dashboard
          </p>
        </div>
        <div className="flex space-x-4">
          <Link to="/create-class" className="btn-primary">
            <PlusIcon className="h-5 w-5 mr-2" />
            New Class
          </Link>
          <Link to="/create-assignment" className="btn-secondary">
            <ClipboardListIcon className="h-5 w-5 mr-2" />
            New Assignment
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg">
              <AcademicCapIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{totalClasses}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-secondary-100 rounded-lg">
              <ClipboardListIcon className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{totalAssignments}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-accent-100 rounded-lg">
              <TrendingUpIcon className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{activeAssignments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Classes Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Your Classes</h2>
            <Link to="/create-class" className="text-primary-600 hover:text-primary-700 font-medium">
              Create New Class
            </Link>
          </div>

          {totalClasses === 0 ? (
            <div className="card text-center">
              <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No classes yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first class to start sharing assignments with students
              </p>
              <Link to="/create-class" className="btn-primary">
                Create Your First Class
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {classes.map((classData) => (
                <ClassCard key={classData._id} classData={classData} isTeacher={true} />
              ))}
            </div>
          )}
        </div>

        {/* Recent Assignments Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Assignments</h2>
            <Link to="/create-assignment" className="text-primary-600 hover:text-primary-700 font-medium">
              Create New Assignment
            </Link>
          </div>

          {totalAssignments === 0 ? (
            <div className="card text-center">
              <ClipboardListIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No assignments yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first assignment to share with students
              </p>
              <Link to="/create-assignment" className="btn-primary">
                Create Your First Assignment
              </Link>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentAssignments.map((assignment) => (
                <AssignmentCard key={assignment._id} assignment={assignment} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/create-class" className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200">
            <AcademicCapIcon className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p className="font-medium text-primary-900">Create Class</p>
              <p className="text-sm text-primary-600">Add new class</p>
            </div>
          </Link>
          
          <Link to="/create-assignment" className="flex items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-200">
            <ClipboardListIcon className="h-8 w-8 text-secondary-600 mr-3" />
            <div>
              <p className="font-medium text-secondary-900">Create Assignment</p>
              <p className="text-sm text-secondary-600">Add new assignment</p>
            </div>
          </Link>
          
          <Link to="/classes" className="flex items-center p-4 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors duration-200">
            <UsersIcon className="h-8 w-8 text-accent-600 mr-3" />
            <div>
              <p className="font-medium text-accent-900">Public Classes</p>
              <p className="text-sm text-accent-600">View all classes</p>
            </div>
          </Link>
          
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <TrendingUpIcon className="h-8 w-8 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Analytics</p>
              <p className="text-sm text-gray-600">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;