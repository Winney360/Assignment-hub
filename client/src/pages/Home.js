import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  ClockIcon, 
  DeviceMobileIcon,
  PrinterIcon,
  ShareIcon 
} from '@heroicons/react/outline';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: BookOpenIcon,
      title: 'Easy Assignment Management',
      description: 'Teachers can create and manage assignments with deadlines, files, and instructions.'
    },
    {
      icon: UserGroupIcon,
      title: 'Student Access via Passcode',
      description: 'Students access classes using simple passcodes - no registration required.'
    },
    {
      icon: ClockIcon,
      title: 'Deadline Tracking',
      description: 'Built-in countdown timers help students stay aware of assignment deadlines.'
    },
    {
      icon: DeviceMobileIcon,
      title: 'Mobile Friendly',
      description: 'Works perfectly on smartphones and tablets for on-the-go access.'
    },
    {
      icon: PrinterIcon,
      title: 'Printable Slips',
      description: 'Generate printable assignment slips with QR codes for easy sharing.'
    },
    {
      icon: ShareIcon,
      title: 'Easy Sharing',
      description: 'Share class links and passcodes with students through SMS or other means.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Welcome to{' '}
            <span className="gradient-bg bg-clip-text text-transparent">
              AssignmentHub
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, offline-friendly platform for Kenyan high school teachers 
            to share assignments with students during holidays. No complicated 
            sign-ups for students - just enter a passcode and get started!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
              <Link to="/create-class" className="btn-outline">
                Create New Class
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn-primary">
                Get Started as Teacher
              </Link>
              <Link to="/classes" className="btn-outline">
                View Public Classes
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose AssignmentHub?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built specifically for the Kenyan education system, focusing on 
            simplicity and accessibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Simple steps to get started with AssignmentHub
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* For Teachers */}
          <div>
            <h3 className="text-2xl font-semibold text-primary-600 mb-6">
              For Teachers
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Register & Login</h4>
                  <p className="text-gray-600">Create your teacher account and log in</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Create Classes</h4>
                  <p className="text-gray-600">Set up classes with unique passcodes</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Post Assignments</h4>
                  <p className="text-gray-600">Add assignments with files, deadlines, and instructions</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Share with Students</h4>
                  <p className="text-gray-600">Print slips or send passcodes via SMS</p>
                </div>
              </div>
            </div>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-2xl font-semibold text-secondary-600 mb-6">
              For Students
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                  <span className="text-secondary-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Get Passcode</h4>
                  <p className="text-gray-600">Receive class passcode from your teacher</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                  <span className="text-secondary-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Enter Passcode</h4>
                  <p className="text-gray-600">Type the passcode to access your class</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                  <span className="text-secondary-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">View Assignments</h4>
                  <p className="text-gray-600">See all available assignments and deadlines</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                  <span className="text-secondary-600 font-semibold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Download & Complete</h4>
                  <p className="text-gray-600">Download files and complete assignments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center gradient-bg rounded-2xl p-8 md:p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of teachers and students already using AssignmentHub 
          to make education more accessible.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {isAuthenticated ? (
            <Link 
              to="/dashboard" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link 
                to="/register" 
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Register as Teacher
              </Link>
              <Link 
                to="/classes" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Browse Classes
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;