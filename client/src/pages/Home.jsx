import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  ClockIcon, 
  DevicePhoneMobileIcon,
  PrinterIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

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
      icon: DevicePhoneMobileIcon,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    },
    tap: { scale: 0.95 }
  };

  const gradientTextAnimation = {
    hidden: { 
      opacity: 0,
      backgroundSize: "200% 200%"
    },
    visible: {
      opacity: 1,
      backgroundSize: "100% 100%",
      transition: {
        opacity: { duration: 1 },
        backgroundSize: {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center space-y-8"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
          >
            Welcome to{' '}
            <motion.span 
              variants={gradientTextAnimation}
              animate={isMounted ? "visible" : "hidden"}
              className="bg-gradient-to-r from-blue-600 to-purple-600 via-blue-500 bg-clip-text text-transparent bg-[length:200%_200%]"
              style={{
                backgroundSize: "200% 200%",
                animation: isMounted ? "gradientShift 3s ease infinite" : "none"
              }}
            >
              AssignmentHub
            </motion.span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            A simple, offline-friendly platform for Kenyan high school teachers 
            to share assignments with students during holidays. No complicated 
            sign-ups for students - just enter a passcode and get started!
          </motion.p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          {isAuthenticated ? (
            <>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/dashboard" className="btn-primary dark:bg-primary-600 dark:hover:bg-primary-700 dark:text-white">
                  Go to Dashboard
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/create-class" className="btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  Create New Class
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/register" className="btn-primary dark:bg-primary-600 dark:hover:bg-primary-700 dark:text-white">
                  Get Started as Teacher
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/classes" className="btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  View Public Classes
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="space-y-12"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose AssignmentHub?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built specifically for the Kenyan education system, focusing on 
            simplicity and accessibility.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureCardVariants}
              whileHover="hover"
              className="card bg-gray-100 dark:bg-gray-800"
            >
              <div className="flex items-center space-x-4 mb-4">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg"
                >
                  <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Simple steps to get started with AssignmentHub
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* For Teachers */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-primary-600 dark:text-gray-400 mb-6">
              For Teachers
            </h3>
            <div className="space-y-4">
              {[
                'Register & Login',
                'Create Classes',
                'Post Assignments',
                'Share with Students'
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  variants={stepVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{i + 1}</span>
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{step}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {[
                        'Create your teacher account and log in',
                        'Set up classes with unique passcodes',
                        'Add assignments with files, deadlines, and instructions',
                        'Print slips or send passcodes via SMS'
                      ][i]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* For Students */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-secondary-600 dark:text-gray-400 mb-6">
              For Students
            </h3>
            <div className="space-y-4">
              {[
                'Get Passcode',
                'Enter Passcode',
                'View Assignments',
                'Download & Complete'
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  variants={stepVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 w-8 h-8 bg-secondary-100 dark:bg-secondary-900/50 rounded-full flex items-center justify-center"
                  >
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">{i + 1}</span>
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{step}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {[
                        'Receive class passcode from your teacher',
                        'Type the passcode to access your class',
                        'See all available assignments and deadlines',
                        'Download files and complete assignments'
                      ][i]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-700 dark:text-gray-300 mb-8 opacity-90"
        >
          Join thousands of teachers and students already using AssignmentHub 
          to make education more accessible.
        </motion.p>
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          {isAuthenticated ? (
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link 
                to="/dashboard" 
                className="bg-blue-600 dark:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-primary-700 transition-colors duration-200"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link 
                  to="/register" 
                  className="bg-blue-600 dark:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-primary-700 transition-colors duration-200"
                >
                  Register as Teacher
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link 
                  to="/classes" 
                  className="border-2 border-blue-600 dark:border-primary-600 text-blue-600 dark:text-primary-400 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-primary-900/30 transition-colors duration-200"
                >
                  Browse Classes
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Home;