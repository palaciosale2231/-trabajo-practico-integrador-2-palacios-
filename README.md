# Sistema de gestión de bienes patrimoniales

Frontend del Trabajo Práctico Integrador N.º II, desarrollado con React, Vite y
Tailwind CSS para conectarse con el sistema del Trabajo Práctico Integrador
N.º I.

## Repositorios y servicios

- Repositorio del frontend: https://github.com/palaciosale2231/-trabajo-practico-integrador-2-palacios-
- URL local de la API: `http://localhost:3000/api`
- Origen del frontend en desarrollo: `http://localhost:5173`

La URL de la API se puede cambiar en `VITE_API_URL` (ver `.env.example`). El
backend debe aceptar solicitudes con credenciales desde
`http://localhost:5173` y exponer estos endpoints:

- `GET /api/articles`: devuelve artículos con `title`, `excerpt` y `author`.
- `POST /api/auth/login`: inicia sesión.
- `POST /api/auth/register`: registra una cuenta.
- `POST /api/auth/logout`: cierra la sesión.

## Requisitos

- Node.js 18 o superior.
- El backend del TPI I en ejecución.

## Instalación y ejecución

En PowerShell, desde la raíz del proyecto:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Abrí la dirección que muestra Vite (por defecto,
`http://localhost:5173`). Ajustá `VITE_API_URL` en `.env` si tu backend usa
otra URL y reiniciá el servidor de desarrollo.

Para generar una versión de producción:

```powershell
npm run build
npm run preview
```

## Ramas

- `main`: versión principal.
- `develop`: rama de integración.
- `desarrollo-pantallas`: componentes, hooks y páginas.
- `proteccion-rutas`: rutas públicas y privadas y control de sesión.
