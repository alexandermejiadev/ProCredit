# ProCredit - Prueba Técnica

##🚀 Tecnologías Utilizadas

# Backend:

.NET 8 (C#)

Arquitectura: API REST con Patrón Repositorio

Persistencia: Archivo JSON (Simulación NoSQL)

Validación: FluentValidation

Documentación: Swagger / OpenAPI

# Frontend:

React 19 + Vite

UI Framework: Ant Design

Cliente HTTP: Axios

Diseño: Responsive (Móvil/Escritorio)

📋 Pre-requisitos

Para ejecutar este proyecto localmente necesitas tener instalado:

SDK de .NET 8.0

Node.js (v18 o superior)

# 🛠️ Instrucciones de Instalación y Ejecución

## 1. Levantar el Backend (API)

Abre una terminal y navega a la carpeta del API:
```
cd ApiEmployee
```

Restaura los paquetes y ejecuta el proyecto:

```
dotnet restore
dotnet run
```
Verás un mensaje indicando el puerto: Now listening on: http://localhost:5219

Puedes verificar que funciona entrando a: http://localhost:5219/swagger aqui de igual manera pudes ver la documentacion de la API

Nota: Mantén esta terminal abierta.

## 2. Levantar el Frontend (React)

Abre otra terminal nueva y navega a la carpeta del frontend:
```
cd employee-front
```

Instala las dependencias de Node:
```
npm install
```

**Nota:** Incluyo el archivo `.env` ya configurado con la URL correspondiente únicamente para facilitar la ejecución de la prueba.  

Verificar en el archivo .env que la URL coincida con la que viste en la terminal del Backend:

VITE_API_URL=http://localhost:5219/api/Employees


Ejecuta la aplicación:
```
npm run dev
```
Abre el navegador en la URL que te indique (http://localhost:5173).

✅ Funcionalidades Implementadas

Listado de Empleados: Visualización en tabla con ordenamiento por columnas.

Búsqueda en Vivo: Buscador por departamento con "debounce" (retraso) para optimizar peticiones.

Registro (Modal): Formulario emergente con validaciones.

Diseño Responsivo: Interfaz usando Ant Design.

Arquitectura: Separación de lógica de negocio (Servicios) y UI (Componentes).

🧪 Notas para el Evaluador

La base de datos es un archivo employees.json ubicado en la carpeta del backend. Este archivo se actualiza automáticamente al agregar registros.

