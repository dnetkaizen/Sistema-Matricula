# Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema de Matrícula Universitaria! 🎓

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas un ambiente respetuoso y profesional.

## 🤝 ¿Cómo puedo contribuir?

### Reportar Bugs

Si encuentras un bug, por favor:

1. **Verifica** que no exista un issue similar
2. **Crea un nuevo issue** con:
   - Título descriptivo
   - Pasos para reproducir el error
   - Comportamiento esperado vs actual
   - Screenshots (si aplica)
   - Versión de Docker, Java, Node
   - Logs relevantes

### Sugerir Mejoras

Para sugerir nuevas características:

1. **Abre un issue** con la etiqueta `enhancement`
2. **Describe** el problema que resuelve
3. **Propón** una solución
4. **Discute** con la comunidad

### Contribuir con Código

1. **Fork** el repositorio
2. **Crea** una rama desde `main`
3. **Implementa** tus cambios
4. **Prueba** exhaustivamente
5. **Envía** un Pull Request

## 🔄 Proceso de Desarrollo

### 1. Setup Inicial

```bash
# Fork y clonar
git clone https://github.com/TU-USUARIO/Proyecto.git
cd Proyecto

# Crear rama
git checkout -b feature/mi-nueva-feature
```

### 2. Desarrollo

```bash
# Levantar entorno de desarrollo
cd bd
docker compose up -d

# Hacer cambios en backend o frontend
# ...

# Probar cambios
docker compose restart backend  # o frontend
```

### 3. Testing

```bash
# Backend
cd backend
mvn test

# Frontend
cd frontend
npm test
```

### 4. Commit y Push

```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/mi-nueva-feature
```

### 5. Pull Request

- Abre un PR desde tu fork
- Describe los cambios realizados
- Referencia issues relacionados
- Espera revisión

## 📝 Estándares de Código

### Backend (Java/Spring Boot)

#### Convenciones de Nombres
- **Clases**: PascalCase (`FacultadService`)
- **Métodos**: camelCase (`findById`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RESULTS`)
- **Paquetes**: lowercase (`com.matricula.modules`)

#### Estructura
```java
@Service
@RequiredArgsConstructor
public class FacultadServiceImpl implements FacultadService {
    
    private final FacultadRepository repository;
    private final FacultadMapper mapper;
    
    @Override
    public List<FacultadDTO> findAll() {
        // Implementación
    }
}
```

#### Buenas Prácticas
- Usar `@RequiredArgsConstructor` de Lombok
- DTOs para transferencia de datos
- Mappers para conversión Entity ↔ DTO
- Validaciones con `@Valid` y anotaciones
- Manejo de excepciones centralizado
- Logs con SLF4J

### Frontend (React/JavaScript)

#### Convenciones de Nombres
- **Componentes**: PascalCase (`FacultadList.jsx`)
- **Funciones**: camelCase (`handleSubmit`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Archivos CSS**: kebab-case (`facultad-list.css`)

#### Estructura de Componentes
```jsx
import React, { useState, useEffect } from 'react';
import { facultadService } from '../../services/facultadService';

const FacultadList = () => {
  const [facultades, setFacultades] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadFacultades();
  }, []);
  
  const loadFacultades = async () => {
    // Implementación
  };
  
  return (
    <div className="facultad-list">
      {/* JSX */}
    </div>
  );
};

export default FacultadList;
```

#### Buenas Prácticas
- Hooks para estado y efectos
- Componentes funcionales
- Separación de lógica en servicios
- Manejo de errores con try-catch
- Loading states
- PropTypes o TypeScript (futuro)

### Base de Datos

#### Convenciones SQL
- **Tablas**: snake_case singular (`facultad`, `carrera`)
- **Columnas**: snake_case (`facultad_id`, `nombre`)
- **Constraints**: descriptivos (`fk_carrera_facultad`)

#### Migraciones
```sql
-- Siempre incluir comentarios
-- Usar transacciones
-- Rollback plan

BEGIN;

CREATE TABLE IF NOT EXISTS facultad (
    facultad_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    -- más columnas...
);

COMMIT;
```

## 💬 Commits

### Formato

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato, punto y coma, etc.
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### Ejemplos

```bash
feat(backend): agregar endpoint de búsqueda de carreras
fix(frontend): corregir error en formulario de facultad
docs(readme): actualizar instrucciones de instalación
refactor(service): simplificar lógica de validación
```

## 🔍 Pull Requests

### Checklist

Antes de enviar un PR, verifica:

- [ ] El código compila sin errores
- [ ] Los tests pasan
- [ ] Se agregaron tests para nuevas features
- [ ] La documentación está actualizada
- [ ] El código sigue los estándares
- [ ] Los commits son descriptivos
- [ ] No hay conflictos con `main`

### Descripción del PR

```markdown
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo se probó?
Describe las pruebas realizadas

## Screenshots (si aplica)
Agregar capturas de pantalla

## Checklist
- [ ] Mi código sigue los estándares
- [ ] He realizado self-review
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan warnings
- [ ] He agregado tests
- [ ] Los tests pasan localmente
```

## 🐛 Reportar Bugs

### Template de Issue

```markdown
**Descripción del Bug**
Descripción clara y concisa del bug.

**Pasos para Reproducir**
1. Ir a '...'
2. Hacer click en '...'
3. Scroll hasta '...'
4. Ver error

**Comportamiento Esperado**
Qué debería suceder.

**Comportamiento Actual**
Qué sucede actualmente.

**Screenshots**
Si aplica, agregar screenshots.

**Entorno**
- OS: [e.g. Windows 11]
- Docker: [e.g. 24.0.0]
- Java: [e.g. 17]
- Node: [e.g. 18.x]

**Logs**
```
Pegar logs relevantes aquí
```

**Contexto Adicional**
Cualquier otra información relevante.
```

## 💡 Sugerir Mejoras

### Template de Feature Request

```markdown
**¿Tu feature request está relacionado a un problema?**
Descripción clara del problema. Ej: "Siempre me frustra cuando [...]"

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que suceda.

**Describe alternativas que has considerado**
Otras soluciones o features que has considerado.

**Contexto Adicional**
Cualquier otra información, screenshots, etc.
```

## 🎯 Áreas de Contribución

### Backend
- [ ] Agregar módulo de Estudiantes
- [ ] Implementar autenticación JWT
- [ ] Agregar paginación a endpoints
- [ ] Mejorar validaciones
- [ ] Agregar más tests

### Frontend
- [ ] Implementar routing con React Router
- [ ] Agregar formularios de búsqueda
- [ ] Mejorar UI/UX
- [ ] Agregar dark mode
- [ ] Implementar tests con Jest

### DevOps
- [ ] CI/CD con GitHub Actions
- [ ] Kubernetes manifests
- [ ] Monitoring con Prometheus
- [ ] Logging centralizado
- [ ] Backups automáticos

### Documentación
- [ ] Tutoriales en video
- [ ] Guías de arquitectura
- [ ] API documentation con Swagger
- [ ] Ejemplos de uso
- [ ] Traducción a otros idiomas

## 📞 Contacto

¿Preguntas? Abre un issue o contacta a:
- Email: tu-email@example.com
- Discord: [Tu servidor]
- Twitter: [@tu_usuario]

## 🙏 Agradecimientos

Gracias a todos los contribuidores que hacen posible este proyecto:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Aquí se listarán automáticamente los contribuidores -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

**¡Feliz coding! 🚀**
