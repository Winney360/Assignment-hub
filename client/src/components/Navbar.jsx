import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  BookOpenIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  PowerIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/classes', label: 'Public Classes' },
  ];

  const authItems = isAuthenticated ? [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/create-class', label: 'Create Class' },
    { path: '/create-assignment', label: 'Create Assignment' },
  ] : [
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: {
        duration: 0.2
      }
    }
  };

  const navLinkVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: { scale: 0.98 }
  };

  const themeButtonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      rotate: 15,
      transition: {
        duration: 0.2
      }
    },
    tap: { scale: 0.9 }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className="flex-shrink-0"
          >
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
            >
              <motion.div
                animate={{ 
                  rotate: isHoveringLogo ? 10 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <BookOpenIcon className="h-6 w-6 text-purple-600 dark:text-purple-500" />
              </motion.div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Assignment
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Hub
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={navLinkVariants}
                >
                  <Link
                    to={item.path}
                    className="px-3 py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 relative"
                  >
                    {item.label}
                    <motion.span 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                      initial={{ width: 0 }}
                      whileHover={{ width: '60%' }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            ))}

            {authItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + navItems.length) * 0.05, duration: 0.2 }}
              >
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={navLinkVariants}
                >
                  <Link
                    to={item.path}
                    className="px-3 py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 relative"
                  >
                    {item.label}
                    <motion.span 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                      initial={{ width: 0 }}
                      whileHover={{ width: '60%' }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            ))}

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (navItems.length + authItems.length) * 0.05 }}
              whileHover="hover"
              whileTap="tap"
              variants={themeButtonVariants}
            >
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? 'sun' : 'moon'}
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <SunIcon className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <MoonIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </motion.div>

            {/* User Menu */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + authItems.length + 1) * 0.05 }}
                className="flex items-center space-x-3"
              >
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center space-x-1.5 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
                >
                  <UserIcon className="h-3.5 w-3.5 text-gray-700 dark:text-gray-200" />
                  <span className="text-xs text-gray-700 dark:text-gray-200 truncate max-w-[80px]">{user?.name}</span>
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 text-xs text-gray-700 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <XMarkIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Bars3Icon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              <div className="py-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-1">
                  {[...navItems, ...authItems].map((item, index) => (
                    <motion.div
                      key={item.path}
                      variants={mobileItemVariants}
                    >
                      <Link
                        to={item.path}
                        className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-200 block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Theme Toggle Mobile */}
                  <motion.button
                    variants={mobileItemVariants}
                    onClick={toggleTheme}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-200"
                  >
                    <div className="mr-2">
                      {isDark ? (
                        <SunIcon className="h-4 w-4 text-yellow-400" />
                      ) : (
                        <MoonIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      )}
                    </div>
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </motion.button>

                  {/* User Menu Mobile */}
                  {isAuthenticated && (
                    <>
                      <motion.div 
                        variants={mobileItemVariants}
                        className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700"
                      >
                        Signed in as {user?.name}
                      </motion.div>
                      <motion.button
                        variants={mobileItemVariants}
                        onClick={handleLogout}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center px-3 py-2 text-sm text-danger-600 dark:text-red-400 hover:bg-danger-50 dark:hover:bg-red-900 rounded transition-colors duration-200"
                      >
                        <PowerIcon className="h-4 w-4 mr-2" />
                        Logout
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;