# API REST - Matricula Backend

- **Base URL (Docker Compose):** `http://localhost:8082`
- **Base URL (App local):** `http://localhost:8080`
- **Formato:** JSON
- **Autenticación:** No requerida

## Estructura de error
```json
{
  "timestamp": "2025-01-01T12:00:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Facultad no encontrada"
}
```

## Validaciones (400)
- Se devuelve un objeto con mapa de errores por campo.
```json
{
  "timestamp": "...",
  "status": 400,
  "error": "Validation Failed",
  "message": {
    "nombre": "El nombre es obligatorio"
  }
}
```

---

# Endpoints

## Facultad
Recurso: `/api/facultades`

### GET /api/facultades
- **Descripción:** Lista todas las facultades.
- **Respuesta 200:** `FacultadDTO[]`
```json
[
  {
    "facultadId": 1,
    "nombre": "Ingeniería",
    "descripcion": "...",
    "ubicacion": "...",
    "decano": "...",
    "activo": true
  }
]
```

### GET /api/facultades/{id}
- **Descripción:** Obtiene una facultad por ID.
- **Respuesta 200:** `FacultadDTO`
- **404:** Si no existe.

### POST /api/facultades
- **Descripción:** Crea una facultad.
- **Body (FacultadDTO):**
```json
{
  "nombre": "Ingeniería",
  "descripcion": "Facultad de Ingeniería",
  "ubicacion": "Bloque A",
  "decano": "Dr. Pérez",
  "activo": true
}
```
- **Respuestas:**
  - 201 Created + recurso creado
  - 400 Validation Failed

### PUT /api/facultades/{id}
- **Descripción:** Actualiza una facultad.
- **Body (FacultadDTO):** igual a POST.
- **Respuestas:** 200 OK | 404 Not Found | 400 Validation Failed

### DELETE /api/facultades/{id}
- **Descripción:** Elimina una facultad.
- **Respuestas:** 204 No Content | 404 Not Found

---

## Carrera
Recurso: `/api/carreras`

### GET /api/carreras
- **Descripción:** Lista todas las carreras.
- **Respuesta 200:** `CarreraDTO[]`

### GET /api/carreras/{id}
- **Descripción:** Obtiene una carrera por ID.
- **Respuestas:** 200 OK | 404 Not Found

### GET /api/carreras/facultad/{facultadId}
- **Descripción:** Lista carreras por `facultadId`.
- **Respuestas:** 200 OK (array, vacío si no hay)

### POST /api/carreras
- **Descripción:** Crea una carrera.
- **Body (CarreraDTO):**
```json
{
  "facultadId": 1,
  "nombre": "Ingeniería de Sistemas",
  "descripcion": "...",
  "duracionSemestres": 10,
  "tituloOtorgado": "Ingeniero de Sistemas",
  "activo": true
}
```
- **Respuestas:**
  - 201 Created
  - 400 Validation Failed
  - 404 Not Found (si `facultadId` no existe)

### PUT /api/carreras/{id}
- **Descripción:** Actualiza una carrera.
- **Body:** igual a POST.
- **Respuestas:** 200 OK | 400 | 404

### DELETE /api/carreras/{id}
- **Descripción:** Elimina una carrera.
- **Respuestas:** 204 No Content | 404 Not Found

---

# Esquemas (DTOs)

## FacultadDTO
```ts
{
  facultadId?: number,
  nombre: string,           // @NotBlank, max 100
  descripcion?: string,
  ubicacion?: string,       // max 100
  decano?: string,          // max 100
  activo?: boolean
}
```

## CarreraDTO
```ts
{
  carreraId?: number,
  facultadId: number,       // @NotNull
  nombre: string,           // @NotBlank, max 100
  descripcion?: string,
  duracionSemestres: number,// @NotNull, @Positive
  tituloOtorgado?: string,  // max 100
  activo?: boolean
}
```

---

# Ejemplos

## cURL (Docker Compose puerto 8082)
```bash
# Crear Facultad
curl -X POST http://localhost:8082/api/facultades \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ingeniería","descripcion":"Facultad","ubicacion":"A","decano":"Dr. Pérez","activo":true}'

# Listar Carreras por Facultad
curl http://localhost:8082/api/carreras/facultad/1
```

## Axios (React)
```ts
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8082' });

// Facultades
export const getFacultades = () => api.get('/api/facultades');
export const getFacultad = (id: number) => api.get(`/api/facultades/${id}`);
export const createFacultad = (data: any) => api.post('/api/facultades', data);
export const updateFacultad = (id: number, data: any) => api.put(`/api/facultades/${id}`, data);
export const deleteFacultad = (id: number) => api.delete(`/api/facultades/${id}`);

// Carreras
export const getCarreras = () => api.get('/api/carreras');
export const getCarrera = (id: number) => api.get(`/api/carreras/${id}`);
export const getCarrerasByFacultad = (facultadId: number) => api.get(`/api/carreras/facultad/${facultadId}`);
export const createCarrera = (data: any) => api.post('/api/carreras', data);
export const updateCarrera = (id: number, data: any) => api.put(`/api/carreras/${id}`, data);
export const deleteCarrera = (id: number) => api.delete(`/api/carreras/${id}`);
```

---

# Notas
- Si ejecutas local sin Docker, usa `http://localhost:8080` como `baseURL`.
- `spring.jpa.hibernate.ddl-auto=update` crea/ajusta tablas, pero los scripts SQL en `bd/init/` (montados por Docker) insertan datos de ejemplo.
- Respuestas siguen el patrón de `GlobalExceptionHandler` en `backend/src/main/java/com/matricula/exception/GlobalExceptionHandler.java`.
