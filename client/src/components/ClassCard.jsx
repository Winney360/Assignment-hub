import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UsersIcon, 
  EyeIcon, 
  PrinterIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';

const ClassCard = ({ classData, isTeacher = false }) => {
  const assignmentCount = classData.assignments?.length || 0;
  const activeAssignments = classData.assignments?.filter(assignment => {
    const now = new Date();
    return new Date(assignment.availableFrom) <= now && 
           new Date(assignment.expiresAt) >= now;
  }).length || 0;

  const handleShare = async () => {
    const classUrl = `${window.location.origin}/class/${classData.passcode}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${classData.name} - AssignmentHub`,
          text: `Join ${classData.name} class with passcode: ${classData.passcode}`,
          url: classUrl
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(classUrl);
        toast.success('Class link copied to clipboard!');
      } catch (error) {
        console.log('Copy failed');
      }
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {classData.name}
            </h3>
            <p className="text-sm text-gray-600">{classData.subject}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {classData.passcode}
            </div>
            <p className="text-xs text-gray-500">Passcode</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Stats */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <AcademicCapIcon className="h-4 w-4" />
            <span>{assignmentCount} assignments</span>
          </div>
          <div className="flex items-center space-x-2 text-accent-600">
            <UsersIcon className="h-4 w-4" />
            <span>{activeAssignments} active</span>
          </div>
        </div>

        {/* Teacher Info (for students) */}
        {!isTeacher && classData.teacher && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Teacher:</span> {classData.teacher.name}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex space-x-2">
          {isTeacher ? (
            <>
              <Link
                to={`/class-view/${classData._id}`}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <EyeIcon className="h-4 w-4" />
                <span>View Class</span>
              </Link>
              <Link
                to={`/print-slip/${classData._id}`}
                className="btn-outline flex items-center space-x-2"
              >
                <PrinterIcon className="h-4 w-4" />
              </Link>
              <button
                onClick={handleShare}
                className="btn-outline flex items-center space-x-2"
              >
                <ShareIcon className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/class/${classData.passcode}`}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <EyeIcon className="h-4 w-4" />
                <span>View Assignments</span>
              </Link>
              <button
                onClick={handleShare}
                className="btn-outline flex items-center space-x-2"
              >
                <ShareIcon className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;