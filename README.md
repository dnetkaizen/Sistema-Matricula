# 🎓 Sistema de Matrícula Universitaria

Sistema completo de gestión de matrículas universitarias desarrollado con **Spring Boot**, **React + Vite** y **PostgreSQL**, completamente dockerizado para fácil despliegue.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Variables de Entorno](#-variables-de-entorno)
- [Desarrollo](#-desarrollo)
- [Troubleshooting](#-troubleshooting)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- ✅ **CRUD completo** de Facultades y Carreras
- ✅ **API RESTful** con Spring Boot
- ✅ **Frontend moderno** con React + Vite
- ✅ **Base de datos** PostgreSQL con persistencia
- ✅ **Dockerizado** para fácil despliegue
- ✅ **CORS configurado** para desarrollo
- ✅ **Validaciones** en backend y frontend
- ✅ **Manejo global de errores**
- ✅ **Scripts de inicialización** de BD

## 🛠 Tecnologías

### Backend
- **Java 21**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **Lombok**

### Frontend
- **React 18**
- **Vite**
- **Axios**
- **CSS Modules**

### DevOps
- **Docker**
- **Docker Compose**
- **Nginx** (para servir frontend)

## 🏗 Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Network                           │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Frontend   │    │   Backend    │    │  PostgreSQL  │ │
│  │  React+Vite  │───▶│ Spring Boot │───▶│   Database   │ │
│  │  Port: 3000  │    │  Port: 8082  │    │  Port: 5432  │ │
│  │   (Nginx)    │    │              │    │              │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
         ▲                      ▲                    ▲
         │                      │                    │
    localhost:3000         localhost:8082       localhost:5432
```

## 📦 Requisitos Previos

- **Docker Desktop** instalado y corriendo
- **Git** para clonar el repositorio
- **Puertos disponibles**: 3000, 8082, 5432

## 🚀 Instalación y Ejecución

### Opción 1: Docker Compose (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/dnetkaizen/Sistema-Matricula.git
cd Sistema-Matricula

# 2. Navegar a la carpeta de Docker
cd bd

# 3. Levantar todos los servicios
docker compose up -d

# 4. Verificar que los contenedores estén corriendo
docker compose ps
```

**¡Listo!** Accede a:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8082/api/facultades
- **PostgreSQL**: localhost:5432

### Opción 2: Rebuild Completo (Si hay cambios)

```bash
cd bd

# Detener servicios
docker compose down

# Rebuild sin caché
docker compose build --no-cache

# Levantar servicios
docker compose up -d
```

### Opción 3: Desarrollo Local (Sin Docker)

#### Backend
```bash
# Requiere PostgreSQL local en puerto 5432
cd backend

# Editar application.properties para localhost
# spring.datasource.url=jdbc:postgresql://localhost:5432/universidad_db

mvn clean install
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend

# Copiar variables de entorno
cp .env.example .env

# Editar .env
# VITE_API_URL=http://localhost:8080

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 📁 Estructura del Proyecto

```
Proyecto/
├── backend/                          # API Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/com/matricula/
│   │       │   ├── config/
│   │       │   │   ├── CorsConfig.java
│   │       │   │   └── GlobalExceptionHandler.java
│   │       │   └── modules/
│   │       │       ├── facultad/
│   │       │       │   ├── controller/
│   │       │       │   ├── dto/
│   │       │       │   ├── entity/
│   │       │       │   ├── mapper/
│   │       │       │   ├── repository/
│   │       │       │   └── service/
│   │       │       └── carrera/
│   │       │           └── [misma estructura]
│   │       └── resources/
│   │           └── application.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                         # React + Vite
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Facultad/
│   │   │   │   ├── FacultadList.jsx
│   │   │   │   ├── FacultadItem.jsx
│   │   │   │   └── FacultadForm.jsx
│   │   │   └── Carrera/
│   │   │       └── [misma estructura]
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── facultadService.js
│   │   │   └── carreraService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
│
├── bd/                               # Docker Compose & DB
│   ├── init/
│   │   ├── 01_create_tables.sql     # Schema
│   │   └── 02_insert_data.sql       # Datos iniciales
│   ├── .env                          # Variables de entorno
│   └── docker-compose.yml            # Orquestación
│
├── README.md                         # Este archivo
└── DEPLOYMENT.md                     # Guía detallada de despliegue
```

## 🔌 API Endpoints

### Facultad

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/facultades` | Listar todas las facultades |
| GET | `/api/facultades/{id}` | Obtener facultad por ID |
| POST | `/api/facultades` | Crear nueva facultad |
| PUT | `/api/facultades/{id}` | Actualizar facultad |
| DELETE | `/api/facultades/{id}` | Eliminar facultad |

### Carrera

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/carreras` | Listar todas las carreras |
| GET | `/api/carreras/{id}` | Obtener carrera por ID |
| GET | `/api/carreras/facultad/{facultadId}` | Listar carreras por facultad |
| POST | `/api/carreras` | Crear nueva carrera |
| PUT | `/api/carreras/{id}` | Actualizar carrera |
| DELETE | `/api/carreras/{id}` | Eliminar carrera |

### Ejemplos de Uso

#### Listar Facultades
```bash
curl http://localhost:8082/api/facultades
```

#### Crear Facultad
```bash
curl -X POST http://localhost:8082/api/facultades \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ingeniería",
    "descripcion": "Facultad de Ingeniería",
    "ubicacion": "Edificio A",
    "decano": "Dr. Juan Pérez",
    "activo": true
  }'
```

#### Listar Carreras de una Facultad
```bash
curl http://localhost:8082/api/carreras/facultad/1
```

## 🔐 Variables de Entorno

### Backend (`bd/.env`)
```env
POSTGRES_USER=dnk_user
POSTGRES_PASSWORD=dnk_pass
POSTGRES_DB=universidad_db

SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/${POSTGRES_DB}
SPRING_DATASOURCE_USERNAME=${POSTGRES_USER}
SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}
```

### Frontend (`.env` - solo para desarrollo local)
```env
# Backend en Docker
VITE_API_URL=http://localhost:8082

# Backend local
# VITE_API_URL=http://localhost:8080
```

## 💻 Desarrollo

### Comandos Útiles

#### Docker
```bash
# Ver logs
docker compose logs backend
docker compose logs frontend
docker compose logs db

# Logs en tiempo real
docker compose logs -f backend

# Reiniciar un servicio
docker compose restart backend

# Detener todo
docker compose down

# Detener y eliminar volúmenes
docker compose down -v
```

#### Base de Datos
```bash
# Conectar a PostgreSQL
docker exec -it universidad_db psql -U dnk_user -d universidad_db

# Dentro de psql
\dt                    # Listar tablas
\d facultad           # Describir tabla
SELECT * FROM facultad;
SELECT * FROM carrera;
```

#### Backend (Maven)
```bash
# Compilar
mvn clean package -DskipTests

# Ejecutar tests
mvn test

# Ejecutar aplicación
mvn spring-boot:run
```

#### Frontend (NPM)
```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Hot Reload

- **Backend**: Spring Boot DevTools habilitado (reinicio automático)
- **Frontend**: Vite HMR (Hot Module Replacement) activado

## 🐛 Troubleshooting

### Error: "Network Error" en Frontend

**Síntoma**: Frontend no puede conectar al backend.

**Solución**:
```bash
# 1. Verificar que el backend esté corriendo
curl http://localhost:8082/api/facultades

# 2. Ver logs del backend
docker compose logs backend

# 3. Rebuild del frontend sin caché
docker compose build --no-cache frontend
docker compose up -d

# 4. Hard reload en navegador (Ctrl+F5)
```

### Error: Puerto ya en uso

**Síntoma**: `Error: bind: address already in use`

**Solución**:
```bash
# Windows (PowerShell)
# Encontrar proceso en puerto 3000
netstat -ano | findstr :3000

# Matar proceso
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: 500 Internal Server Error

**Síntoma**: Backend responde con error 500.

**Solución**:
```bash
# Ver logs detallados
docker compose logs backend --tail=100

# Verificar conexión a BD
docker compose logs db

# Reiniciar servicios
docker compose restart backend db
```

### Error: Base de datos no inicializada

**Síntoma**: Tablas no existen.

**Solución**:
```bash
# Recrear volúmenes
docker compose down -v
docker compose up -d

# Verificar scripts de inicialización
docker compose logs db | grep "init"
```

### Frontend llama a `/facultades` en vez de `/api/facultades`

**Síntoma**: Rutas incorrectas en Network tab.

**Solución**:
```bash
# Rebuild sin caché
docker compose down
docker compose build --no-cache frontend
docker compose up -d

# Limpiar caché del navegador (Ctrl+Shift+Delete)
```

## 📊 Datos de Prueba

Al iniciar el sistema, se cargan automáticamente:

### Facultades
- Ingeniería
- Ciencias
- Medicina

### Carreras
- Ingeniería de Sistemas
- Ingeniería Civil
- Matemáticas
- Física
- Medicina General
- Enfermería

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 🚢 Despliegue en Producción

Para despliegue en producción, consulta [DEPLOYMENT.md](./DEPLOYMENT.md) para:
- Configuración de CORS específica
- Manejo de secrets
- HTTPS/SSL
- Monitoreo y logs
- Backups automáticos
- Resource limits

## 📝 Notas Importantes

- **Puertos**: Asegúrate de que los puertos 3000, 8082 y 5432 estén disponibles
- **Docker Desktop**: Debe estar corriendo antes de ejecutar `docker compose`
- **Persistencia**: Los datos de PostgreSQL persisten en un volumen Docker
- **CORS**: Configurado para desarrollo; ajustar para producción
- **Variables**: Nunca subas archivos `.env` con credenciales reales a Git

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [Tu GitHub](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- Spring Boot Team
- React Team
- Vite Team
- PostgreSQL Community

---

**⭐ Si este proyecto te fue útil, dale una estrella en GitHub!**

Para más información detallada sobre despliegue y troubleshooting, consulta [DEPLOYMENT.md](./DEPLOYMENT.md).
