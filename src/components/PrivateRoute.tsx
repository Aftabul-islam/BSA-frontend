// // filepath: /Users/aftabul/Documents/web development/projects/BSA/src/components/PrivateRoute.tsx
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// interface PrivateRouteProps {
//   element: React.ComponentType;
//   path: string;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem('adminToken');

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Component /> : <Navigate to="/admin/login" />}
//     />
//   );
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectPath = '/admin/login' }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken');

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoute;