import { authService } from '../services/api';
import toast from 'react-hot-toast';

export const DEMO_CREDENTIALS = [
  {
    id: 'student',
    role: 'student',
    roleLabel: 'Student Portal',
    shortTitle: 'Student',
    badge: 'STUDENT',
    color: '#2563eb',
    accentColor: '#3b82f6',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    icon: 'fas fa-user-graduate',
    email: 'student@aitm.ac.in',
    password: 'alumni@123',
    secretKey: '',
    name: 'Student User',
    batch: 'Batch 2022-2026',
    dept: 'Computer Science & Engineering',
    destination: (user) => `/student/home/${user._id || user.id}`
  },
  {
    id: 'alumni',
    role: 'alumni',
    roleLabel: 'Alumni Portal',
    shortTitle: 'Alumni',
    badge: 'ALUMNI',
    color: '#c84022',
    accentColor: '#dc2626',
    bgColor: '#fff5f3',
    borderColor: '#fed7d2',
    icon: 'fas fa-user-tie',
    email: 'bharath@aitm.ac.in',
    password: 'alumni@123',
    secretKey: '',
    name: 'Bharath K',
    batch: 'Batch 2020-2024',
    dept: 'Senior Software Engineer (HILIFE AI)',
    destination: (user) => `/alumni/home/${user._id || user.id}`
  },
  {
    id: 'staff',
    role: 'staff',
    roleLabel: 'Staff Portal',
    shortTitle: 'Staff / Faculty',
    badge: 'FACULTY',
    color: '#059669',
    accentColor: '#10b981',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    icon: 'fas fa-chalkboard-teacher',
    email: 'staff@aitm.ac.in',
    password: 'alumni@123',
    secretKey: '',
    name: 'Staff Coordinator',
    batch: 'Placement Cell',
    dept: 'Assistant Professor, Dept of CSE',
    destination: () => '/staff/dashboard'
  },
  {
    id: 'admin',
    role: 'admin',
    roleLabel: 'Admin Control Panel',
    shortTitle: 'Super Admin',
    badge: 'ADMIN',
    color: '#7c3aed',
    accentColor: '#8b5cf6',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    icon: 'fas fa-shield-alt',
    email: 'admin@aitm.ac.in',
    password: 'alumni@123',
    secretKey: 'AITM_ADMIN_2026',
    name: 'Admin User',
    batch: 'AITM Administration',
    dept: 'Central System Administrator',
    destination: (user) => `/admin/home/${user._id || user.id}`
  }
];

/**
 * Perform instant 1-click login for a demo role and navigate to its portal
 */
export async function loginWithDemoCredentials(demo, login, navigate, setLoadingRole) {
  try {
    if (setLoadingRole) setLoadingRole(demo.role);
    const toastId = toast.loading(`Logging in to ${demo.roleLabel}...`);
    
    const res = await authService.login(demo.email, demo.password, demo.role, demo.secretKey);
    const { user, token } = res.data;
    
    login(user, token);
    toast.success(`Welcome ${user.name || demo.name}! Opening ${demo.roleLabel}...`, { id: toastId });
    
    const targetUrl = demo.destination(user);
    setTimeout(() => {
      navigate(targetUrl);
    }, 150);
    return true;
  } catch (err) {
    console.error(`Demo login error for ${demo.role}:`, err);
    toast.error(err.response?.data?.message || `Failed to login to ${demo.roleLabel}`);
    return false;
  } finally {
    if (setLoadingRole) setLoadingRole(null);
  }
}
