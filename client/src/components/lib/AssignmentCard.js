import React from 'react';
import { format, isAfter, isBefore } from 'date-fns';
import { 
  ClockIcon, 
  DocumentDownloadIcon, 
  ExclamationIcon,
  CheckCircleIcon
} from '@heroicons/react/outline';
import CountdownTimer from './CountdownTimer';

const AssignmentCard = ({ assignment, isStudent = false }) => {
  const now = new Date();
  const deadline = new Date(assignment.deadline);
  const isExpired = isAfter(now, deadline);
  const isActive = !isExpired && isBefore(now, new Date(assignment.expiresAt));

  const getStatusBadge = () => {
    if (isExpired) {
      return <span className="status-expired">Expired</span>;
    }
    if (isActive) {
      return <span className="status-active">Active</span>;
    }
    return <span className="status-pending">Pending</span>;
  };

  const handleDownload = () => {
    if (assignment.file) {
      const fileUrl = `${process.env.REACT_APP_API_URL}/uploads/${assignment.file.filename}`;
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {assignment.title}
            </h3>
            <p className="text-sm text-gray-600">{assignment.subject}</p>
          </div>
          {getStatusBadge()}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">{assignment.description}</p>

        {/* Deadline Info */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ClockIcon className="h-4 w-4" />
          <span>Due: {format(deadline, 'PPP p')}</span>
        </div>

        {/* Countdown Timer */}
        {!isExpired && (
          <CountdownTimer deadline={deadline} />
        )}

        {/* File Download */}
        {assignment.file && (
          <div className="flex items-center space-x-2">
            <DocumentDownloadIcon className="h-5 w-5 text-primary-600" />
            <button
              onClick={handleDownload}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Download {assignment.file.originalName}
            </button>
          </div>
        )}

        {/* Submission Instructions */}
        {assignment.submissionInstructions && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Submission Instructions:
            </h4>
            <p className="text-blue-800 text-sm">
              {assignment.submissionInstructions}
            </p>
          </div>
        )}

        {/* Teacher Notes (only for teachers) */}
        {!isStudent && assignment.teacherNotes && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">
              Teacher Notes:
            </h4>
            <p className="text-yellow-800 text-sm">
              {assignment.teacherNotes}
            </p>
          </div>
        )}

        {/* Warning for expired assignments */}
        {isExpired && (
          <div className="flex items-center space-x-2 text-danger-600 bg-danger-50 p-3 rounded-lg">
            <ExclamationIcon className="h-5 w-5" />
            <span className="text-sm font-medium">
              This assignment has expired
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;