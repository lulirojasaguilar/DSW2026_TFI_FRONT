# MedPortal – Frontend (TPI DSW 2026) · DESARROLLO_FRONT_IDEAL

Frontend del Sistema de Turnos Médicos construido sobre el boilerplate de la cátedra
(`dsw-frt-utn/unidad5-boilerplate`) usando **solo lo visto en las Unidades 4 y 5**:
React + Vite + TailwindCSS + react-router-dom + react-hook-form + axios, con ESLint + Prettier.
Los iconos son de `lucide-react`. Todo es local (sin repositorio git).

## Cómo ejecutarlo

1. Levantar el backend (`Dsw2026Tpi.Api`, por defecto `http://localhost:5278`).
2. Ajustar `VITE_BACKEND_URL` en `.env.development` si el backend usa otro puerto.
3. En esta carpeta:

```bash
npm install
npm run dev
```

Otros scripts: `npm run build`, `npm run lint`, `npm run format`.
El proxy de Vite (`vite.config.js`) reenvía `/api` al backend, así que no hay problemas de CORS.

## Pantallas y rutas

| Ruta                                                              | Pantalla                                                | Rol           |
| ----------------------------------------------------------------- | ------------------------------------------------------- | ------------- |
| `/login`                                                          | Admin – Login                                           | público       |
| `/patient/login`                                                  | Paciente – Login (alta automática en el primer ingreso) | público       |
| `/access-denied`                                                  | Acceso denegado                                         | público       |
| `/app`                                                            | Admin – Panel                                           | ADMINISTRADOR |
| `/app/doctors`, `/new`, `/:id/edit`, `/schedule`, `/:id/schedule` | Doctores: listado, alta/edición, disponibilidad horaria | ADMINISTRADOR |
| `/app/specialties`, `/new`, `/:id/edit`                           | Especialidades: listado, alta/edición                   | ADMINISTRADOR |
| `/app/appointments`                                               | Admin – Búsqueda Avanzada                               | ADMINISTRADOR |
| `/patient`                                                        | Paciente – Mis turnos y cancelación                     | PACIENTE      |
| `/patient/book`                                                   | Paciente – Reservar turno (con versión mobile)          | PACIENTE      |

Admin de desarrollo: el definido en `appsettings.Development.json` del backend.

## Arquitectura

- **Screaming Architecture** (como el boilerplate): `src/modules/<funcionalidad>/{pages,components,services,hook,context,helpers}`.
  Módulos: `auth`, `dashboard`, `doctors`, `specialties`, `appointments` y `shared`.
- **Atomic Design** en `src/modules/shared/components`: `atoms` (Button, Badge, Switch, Avatar…),
  `molecules` (FormField, SearchInput, Pagination, Alert…), `organisms` (Sidebar, Table),
  `templates` (AdminLayout, PatientLayout) y `pages` dentro de cada módulo.
- **SOLID**:
  - SRP: cada página (máx. ~100 líneas) solo compone componentes. La lógica vive en hooks del módulo (`useBookAppointment`, `useDoctorsList`, `useSpecialtiesList`, `useDoctorSchedule`, `useAppointmentSearch`, `useMyAppointments`, `useDoctorForm`, `useSpecialtyForm`, `useAdminLogin`...) y las llamadas HTTP en `services/`.
  - OCP: `Table` recibe `columns` (ej. `doctorColumns`, `specialtyColumns`, `searchColumns`), `Button`/`SlotButton` tienen variantes y `useLoginForm` recibe lo que cambia por rol, sin modificarse.
  - LSP/ISP: componentes con props mínimas y variantes intercambiables (`SlotButton` desktop/mobile, `MetricCard`/`StatCard`).
  - DIP: las páginas dependen de hooks (abstracciones), no de `axios` ni de `localStorage`; `axiosInstance` es el único cliente HTTP y `session.js` el único acceso a `localStorage`.
- **Rutas privadas**: `AuthProvider` + `useAuth` + `ProtectedRoute` (por rol) y rutas hijas con `Outlet`.

## Pendiente en el backend

La reserva de turnos necesita `GET /api/doctors/{id}/slots?from=&to=` (turnos libres con su `id`), que el backend actual no tiene.
Sin ese endpoint la pantalla de reserva muestra el calendario pero avisa que todavía no se puede reservar.
