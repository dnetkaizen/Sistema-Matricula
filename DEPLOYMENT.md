# Guía de Despliegue - Sistema de Matrícula

## Arquitectura del Sistema

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Frontend      │      │    Backend      │      │   PostgreSQL    │
│   React+Vite    │─────▶│  Spring Boot    │─────▶│   Database      │
│   Port: 3000    │      │   Port: 8082    │      │   Port: 5432    │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## Estructura del Proyecto

```
Proyecto/
├── backend/                 # Spring Boot API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/matricula/
│   │       │   ├── config/          # CORS, configuraciones
│   │       │   ├── exception/       # Manejo global de errores
│   │       │   └── modules/
│   │       │       ├── facultad/    # CRUD Facultad
│   │       │       └── carrera/     # CRUD Carrera
│   │       └── resources/
│   │           └── application.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── Facultad/
│   │   │   └── Carrera/
│   │   └── services/
│   │       ├── api.js              # Axios config
│   │       ├── facultadService.js
│   │       └── carreraService.js
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
│
└── bd/                      # Database & Docker Compose
    ├── init/
    │   ├── 01_create_tables.sql
    │   └── 02_insert_data.sql
    ├── .env
    └── docker-compose.yml
```

## Configuración de Variables de Entorno

### Backend (`bd/.env`)
```env
POSTGRES_USER=dnk_user
POSTGRES_PASSWORD=dnk_pass
POSTGRES_DB=universidad_db

SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/${POSTGRES_DB}
SPRING_DATASOURCE_USERNAME=${POSTGRES_USER}
SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}
```

### Frontend (`.env` para desarrollo local)
```env
# Desarrollo local (backend en host)
VITE_API_URL=http://localhost:8080

# Desarrollo con Docker
# VITE_API_URL=http://localhost:8082
```

## Endpoints del Backend

### Facultad
- `GET    /api/facultades` - Listar todas
- `GET    /api/facultades/{id}` - Obtener por ID
- `POST   /api/facultades` - Crear
- `PUT    /api/facultades/{id}` - Actualizar
- `DELETE /api/facultades/{id}` - Eliminar

### Carrera
- `GET    /api/carreras` - Listar todas
- `GET    /api/carreras/{id}` - Obtener por ID
- `GET    /api/carreras/facultad/{facultadId}` - Por facultad
- `POST   /api/carreras` - Crear
- `PUT    /api/carreras/{id}` - Actualizar
- `DELETE /api/carreras/{id}` - Eliminar

## Despliegue con Docker

### Opción 1: Stack Completo (Recomendado)
```powershell
# En g:/docker/Proyecto/bd
docker compose down
docker compose build --no-cache
docker compose up -d
```

**Acceso:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8082/api/facultades
- PostgreSQL: localhost:5432

### Opción 2: Solo Backend + DB
```powershell
# En g:/docker/Proyecto/bd
docker compose up -d db backend
```

**Frontend local:**
```powershell
# En g:/docker/Proyecto/frontend
cp .env.example .env
# Editar .env: VITE_API_URL=http://localhost:8082
npm install
npm run dev
```

### Opción 3: Todo Local (Sin Docker)
```powershell
# 1. PostgreSQL local (puerto 5432)
# Crear base de datos 'universidad_db'

# 2. Backend
cd g:/docker/Proyecto/backend
# Editar application.properties para localhost
mvn spring-boot:run

# 3. Frontend
cd g:/docker/Proyecto/frontend
cp .env.example .env
# Editar .env: VITE_API_URL=http://localhost:8080
npm install
npm run dev
```

## Comandos Útiles

### Docker
```powershell
# Ver logs
docker compose logs backend
docker compose logs frontend
docker compose logs db

# Rebuild solo un servicio
docker compose build --no-cache frontend
docker compose build --no-cache backend

# Reiniciar un servicio
docker compose restart backend

# Ver estado
docker compose ps

# Limpiar todo
docker compose down -v
docker system prune -a
```

### Base de Datos
```powershell
# Conectar a PostgreSQL en Docker
docker exec -it universidad_db psql -U dnk_user -d universidad_db

# Queries útiles
\dt                           # Listar tablas
SELECT * FROM facultad;
SELECT * FROM carrera;
```

### Maven (Backend)
```powershell
# Compilar
mvn clean package -DskipTests

# Ejecutar local
mvn spring-boot:run

# Tests
mvn test
```

### NPM (Frontend)
```powershell
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview
```

## Troubleshooting

### Error: "Network Error" en Frontend
**Causa:** Frontend no puede conectar al backend.

**Solución:**
1. Verifica que el backend esté corriendo:
   ```powershell
   curl http://localhost:8082/api/facultades
   ```
2. Revisa CORS en `backend/src/main/java/com/matricula/config/CorsConfig.java`
3. Verifica `VITE_API_URL` en el build del frontend
4. Rebuild frontend sin caché:
   ```powershell
   docker compose build --no-cache frontend
   docker compose up -d
   ```

### Error: 500 en Backend
**Causa:** Error interno del servidor.

**Solución:**
1. Ver logs del backend:
   ```powershell
   docker compose logs backend --tail=100
   ```
2. Verificar conexión a BD:
   ```powershell
   docker compose logs db
   ```
3. Validar que las tablas existan en PostgreSQL

### Error: "Cannot find module @rollup/rollup-linux-x64-musl"
**Causa:** Alpine Linux no soporta binarios nativos de Rollup.

**Solución:** Ya corregido en `frontend/Dockerfile` usando `node:18` (no Alpine).

### Frontend llama a `/facultades` en vez de `/api/facultades`
**Causa:** Bundle viejo con rutas incorrectas.

**Solución:**
1. Rebuild sin caché:
   ```powershell
   docker compose build --no-cache frontend
   ```
2. Hard reload en navegador: Ctrl+F5
3. Limpiar cache del navegador

## Verificación del Despliegue

### Checklist
- [ ] Backend responde en `http://localhost:8082/api/facultades`
- [ ] Frontend carga en `http://localhost:3000`
- [ ] Frontend llama a `/api/facultades` (verificar en DevTools > Network)
- [ ] Se pueden listar facultades y carreras
- [ ] Se pueden crear, editar y eliminar registros
- [ ] Los datos persisten tras reiniciar contenedores

### Pruebas con cURL
```powershell
# Listar facultades
curl http://localhost:8082/api/facultades

# Crear facultad
curl -X POST http://localhost:8082/api/facultades `
  -H "Content-Type: application/json" `
  -d '{\"nombre\":\"Medicina\",\"descripcion\":\"Facultad de Medicina\",\"ubicacion\":\"Edificio D\",\"decano\":\"Dr. García\",\"activo\":true}'

# Listar carreras
curl http://localhost:8082/api/carreras
```

## Producción

### Consideraciones
1. **CORS**: Cambiar `CorsConfig.java` para permitir solo orígenes específicos
2. **Variables de entorno**: Usar secrets/vault para credenciales
3. **HTTPS**: Configurar certificados SSL/TLS
4. **Logs**: Configurar agregación de logs (ELK, CloudWatch, etc.)
5. **Monitoreo**: Implementar health checks y métricas
6. **Backup**: Automatizar respaldos de PostgreSQL

### Docker Compose para Producción
```yaml
# Agregar healthchecks, restart policies, resource limits
services:
  backend:
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
```

## Soporte

Para más información, consulta:
- Backend API: `backend/API.md`
- Documentación Spring Boot: https://spring.io/projects/spring-boot
- Documentación Vite: https://vitejs.dev/
- Documentación Docker: https://docs.docker.com/
