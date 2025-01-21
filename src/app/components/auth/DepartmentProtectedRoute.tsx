'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface DepartmentProtectedRouteProps {
  children: React.ReactNode;
  allowedDepartments: string[];
}

const DepartmentProtectedRoute: React.FC<DepartmentProtectedRouteProps> = ({
  children,
  allowedDepartments,
}) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const checkDepartmentAccess = () => {
      if (typeof window === 'undefined') return;

      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const userType = localStorage.getItem('userType');
      
      // if (!isLoggedIn) {
      //   router.push('/login');
      //   return;
      // }

      // if (userType !== 'admin') {
      //   router.push('/dashboard/user');
      //   return;
      // }

      const department = userData.department;
      
      if (!department || !allowedDepartments.includes(department)) {
        // Redirect to appropriate dashboard based on department
        const departmentRoutes: { [key: string]: string } = {
          'CL': '/dashboard/circular-level',
          'RL': '/dashboard/regional-level',
          'HL': '/dashboard/admin',
          'SL': '/dashboard/sub-divisional-level'
        };

        const correctPath = departmentRoutes[department];
  
          router.push(correctPath);
      
          
       
      }
    };

    checkDepartmentAccess();
  }, []);

  return <>{children}</>;
};

export default DepartmentProtectedRoute;
