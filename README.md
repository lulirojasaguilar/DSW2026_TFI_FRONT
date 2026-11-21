# MedPortal – Frontend

Trabajo Práctico Integrador de Desarrollo de Software 2026 (UTN-FRT).
Sistema de turnos médicos: panel del administrador y portal del paciente.

## Integrantes

| Integrante               | Legajo |
| ------------------------ | ------ |
| Campos, Ana Sofía        | 60240  |
| Risso Vergés, Ornella    | 60465  |
| Rojas Aguilar, Luz María | 60566  |

## Tecnologías

React 19, Vite 7, Tailwind CSS 4, react-router-dom 7, react-hook-form, axios y lucide-react (íconos).
Calidad de código con ESLint y Prettier.

## Cómo ejecutarlo

1. Levantar el backend (`Dsw2026Tpi.Api`). Por defecto corre en `http://localhost:5278`.
2. Si el backend usa otro puerto, cambiar `VITE_BACKEND_URL` en `.env.development` (el modelo está en `.env.example`).
3. En esta carpeta, instalar las dependencias y arrancar:

```bash
npm install
npm run dev
```

La aplicación queda en `http://localhost:5173`. El proxy de Vite (`vite.config.js`) reenvía `/api` al backend.

Otros scripts: `npm run build`, `npm run lint`, `npm run format` y `npm run format:check`.

## Cuentas para probar

- **Administrador:** es único y se crea al iniciar el backend con los datos de la sección `Admin` de su
  `appsettings.Development.json`. Ingresa por `/login` con correo y contraseña.
- **Paciente:** no se registra aparte. Ingresa por `/patient/login` con cualquier correo válido y un DNI de
  7 u 8 dígitos; si es la primera vez, el sistema lo da de alta automáticamente.

## Pantallas y rutas

| Ruta                                                              | Pantalla                                                | Acceso        |
| ----------------------------------------------------------------- | ------------------------------------------------------- | ------------- |
| `/login`                                                          | Administrador – Login                                   | público       |
| `/patient/login`                                                  | Paciente – Login (alta automática en el primer ingreso) | público       |
| `/access-denied`                                                  | Acceso denegado                                         | autenticado   |
| `/app`                                                            | Administrador – Tablero                                 | ADMINISTRADOR |
| `/app/doctors`, `/new`, `/:id/edit`, `/schedule`, `/:id/schedule` | Doctores: listado, alta y edición, disponibilidad       | ADMINISTRADOR |
| `/app/specialties`, `/new`, `/:id/edit`                           | Especialidades: listado, alta y edición                 | ADMINISTRADOR |
| `/app/appointments`, `/:id`                                       | Administrador – Búsqueda avanzada de citas y detalle    | ADMINISTRADOR |
| `/patient`                                                        | Paciente – Mis turnos y cancelación                     | PACIENTE      |
| `/patient/book`                                                   | Paciente – Reservar turno (con versión para celular)    | PACIENTE      |

La semana de la reserva va de lunes a domingo: el administrador puede cargar disponibilidad cualquier día de la semana,
excepto los feriados que excluye el backend.

## Endpoints del backend que usa el front

Todos van por `/api` y, salvo los dos logins, llevan el token JWT en el encabezado `Authorization`.

| Módulo         | Endpoints                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Autenticación  | `POST /auth/admin/login`, `POST /auth/patient/login`                                                                                       |
| Especialidades | `GET /specialties` (con `pageSize`, `pageIndex` y `name`), `POST /specialties`, `PUT /specialties/{id}`, `DELETE /specialties/{id}`        |
| Doctores       | `GET /doctors`, `POST /doctors`, `PUT /doctors/{id}`, `DELETE /doctors/{id}`, `GET /specialties/{id}/doctors`                              |
| Disponibilidad | `GET /doctors/{id}/availabilities`, `POST /availabilities`, `PUT /availabilities`, `GET /doctors/{id}/slots?from=&to=` (turnos libres)     |
| Turnos         | `POST /appointments`, `GET /appointments/patient?dni=`, `DELETE /appointments/{id}`, `GET /appointments?date=`, `GET /appointments/search` |

Los errores del backend (`errorCode`, `message` y `details`) se muestran al usuario con su mensaje. Si se supera el
límite de solicitudes (429), se avisa que hay que esperar un minuto.

## Control de acceso

`ProtectedRoute` recibe la lista de roles permitidos (`allowedRoles`) y se aplica a los dos layouts (`/app` y `/patient`).
El rol se consulta solo con `hasRole(...)` de `useAuth`. La sesión se descarta si el token venció o si el rol guardado
no coincide con el que declara el token, y ante un 401 se cierra y se redirige al login sin recargar la página.
El front solo decide qué pantallas mostrar: la autorización real la hace el backend en cada request (401 sin token,
403 con otro rol).

## Estructura

Organizado por funcionalidad (Screaming Architecture): `src/modules/<módulo>/{pages,components,services,hook}`.

- Módulos: `auth`, `dashboard`, `doctors`, `specialties`, `appointments` y `shared` (componentes de UI reutilizables).
- Los componentes siguen Atomic Design (`atoms`, `molecules`, `organisms`, `templates`).
- Las páginas solo componen componentes; la lógica vive en hooks y las llamadas HTTP en `services/`.
- `src/core` reúne lo que no es UI: cliente HTTP (`api/axiosInstance.js`), sesión (`session/session.js`), constantes,
  hooks genéricos (`useApi`, `useDebounce`, `useDeleteItem`) y utilidades de fechas.
