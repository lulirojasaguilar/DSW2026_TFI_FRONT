import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthProvider';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import RootRedirect from './modules/auth/components/RootRedirect';
import { ROLES } from './modules/shared/constants';

import AdminLayout from './modules/shared/components/templates/AdminLayout';
import PatientLayout from './modules/shared/components/templates/PatientLayout';

import AccessDeniedPage from './modules/auth/pages/AccessDeniedPage';
import AdminLoginPage from './modules/auth/pages/AdminLoginPage';
import PatientLoginPage from './modules/auth/pages/PatientLoginPage';

import DashboardPage from './modules/dashboard/pages/DashboardPage';

import DoctorsListPage from './modules/doctors/pages/DoctorsListPage';
import DoctorFormPage from './modules/doctors/pages/DoctorFormPage';
import DoctorSchedulePage from './modules/doctors/pages/DoctorSchedulePage';

import SpecialtiesListPage from './modules/specialties/pages/SpecialtiesListPage';
import SpecialtyFormPage from './modules/specialties/pages/SpecialtyFormPage';

import AppointmentDetailPage from './modules/appointments/pages/AppointmentDetailPage';
import AppointmentSearchPage from './modules/appointments/pages/AppointmentSearchPage';
import BookAppointmentPage from './modules/appointments/pages/BookAppointmentPage';
import MyAppointmentsPage from './modules/appointments/pages/MyAppointmentsPage';

const routes = [
  { path: '/', element: <RootRedirect /> },
  { path: '/login', element: <AdminLoginPage /> },
  { path: '/patient/login', element: <PatientLoginPage /> },
  {
    path: '/access-denied',
    element: (
      <ProtectedRoute>
        <AccessDeniedPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'doctors', element: <DoctorsListPage /> },
      { path: 'doctors/new', element: <DoctorFormPage /> },
      { path: 'doctors/schedule', element: <DoctorSchedulePage /> },
      { path: 'doctors/:id/edit', element: <DoctorFormPage /> },
      { path: 'doctors/:id/schedule', element: <DoctorSchedulePage /> },
      { path: 'specialties', element: <SpecialtiesListPage /> },
      { path: 'specialties/new', element: <SpecialtyFormPage /> },
      { path: 'specialties/:id/edit', element: <SpecialtyFormPage /> },
      { path: 'appointments', element: <AppointmentSearchPage /> },
      { path: 'appointments/:id', element: <AppointmentDetailPage /> },
    ],
  },
  {
    path: '/patient',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
        <PatientLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <MyAppointmentsPage /> },
      { path: 'book', element: <BookAppointmentPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
