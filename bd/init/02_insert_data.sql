-- ============================================
-- 02_insert_data.sql
-- Datos de prueba para las tablas facultad y carrera
-- Idempotente: usa ON CONFLICT DO NOTHING
-- ============================================

-- === FACULTADES ===
INSERT INTO facultad (nombre, descripcion, ubicacion, decano, activo)
VALUES
('Ingeniería', 'Facultad de Ingeniería y Tecnología', 'Campus Central - Bloque A', 'Dr. Juan Pérez', true),
('Ciencias Sociales', 'Facultad de Ciencias Sociales y Humanidades', 'Campus Central - Bloque C', 'Dra. Marta Gómez', true),
('Administración', 'Facultad de Ciencias Empresariales', 'Campus Norte - Edificio B', 'Dr. Luis Romero', true)
ON CONFLICT (nombre) DO NOTHING;


-- === CARRERAS ===
-- Usamos SELECT para obtener facultad_id según el nombre de la facultad.
INSERT INTO carrera (facultad_id, nombre, descripcion, duracion_semestres, titulo_otorgado, activo)
VALUES
(
  (SELECT facultad_id FROM facultad WHERE nombre = 'Ingeniería'),
  'Ingeniería de Sistemas',
  'Formación en análisis, diseño y desarrollo de software y sistemas.',
  10,
  'Ingeniero de Sistemas',
  true
),
(
  (SELECT facultad_id FROM facultad WHERE nombre = 'Ingeniería'),
  'Ingeniería Mecatrónica',
  'Integra mecánica, electrónica y control para sistemas automatizados.',
  10,
  'Ingeniero Mecatrónico',
  true
),
(
  (SELECT facultad_id FROM facultad WHERE nombre = 'Ciencias Sociales'),
  'Psicología',
  'Estudio científico del comportamiento humano y la salud mental.',
  10,
  'Licenciado en Psicología',
  true
),
(
  (SELECT facultad_id FROM facultad WHERE nombre = 'Administración'),
  'Administración de Empresas',
  'Gestión, finanzas y liderazgo para organizaciones.',
  8,
  'Administrador',
  true
)
ON CONFLICT (nombre) DO NOTHING;


-- OPTIONAL: verificar que las inserciones se realizaron (puedes comentar estas SELECT si no quieres salida)
-- SELECT * FROM facultad ORDER BY facultad_id;
-- SELECT * FROM carrera ORDER BY carrera_id;
