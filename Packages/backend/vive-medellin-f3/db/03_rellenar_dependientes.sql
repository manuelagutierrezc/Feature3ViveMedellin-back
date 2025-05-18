-- 1. Usuarios
INSERT INTO tblusuarios (nombres, apellidos, correo, contrasena, id_rol) VALUES
('Juan',   'Pérez',     'juan.perez@example.com',       'juanito',    1),
('María',  'Gómez',     'maria.gomez@example.com',      'maria',      1),
('Andrés', 'Rodríguez', 'andres.rodriguez@empresa.com', 'andresito',  2),
('Laura',  'Ramírez',   'laura.ramirez@example.com',    'laurita',    1),
('Pedro',  'Martínez',  'pedro.martinez@example.com',   'pedrito',    1);

-- 2. Eventos
INSERT INTO tbleventos (titulo, descripcion, fecha, id_barrio, id_tarifa_evento) VALUES
('Concierto Rock',       'Noche de rock en vivo',         '2025-06-10 20:00:00', 14, 2),
('Taller de Pintura',    'Aprende acuarela desde cero',    '2025-05-25 15:00:00', 11, 1),
('Maratón Estudiantil',  'Corre 5K por la Universidad',   '2025-07-05 07:00:00', 3, 1),
('Feria de Tecnología',  'Expo de startups y gadgets',     '2025-06-20 10:00:00', 7, 2),
('Clínica de Volleyball','Mejora tu saque y bloqueo',      '2025-05-30 09:00:00', 1, 1);

-- 3. Eventos guardados por usuarios
INSERT INTO tbleventos_guardadosxusuario (id_usuario, id_evento) VALUES
(1, 1),
(1, 3),
(2, 2),
(2, 5),
(4, 1),
(5, 4);

-- 4. Seguidores entre usuarios
INSERT INTO tblseguidoresxusuario (id_usuario_seguidor, id_usuario_seguido) VALUES
(1, 2),  -- Juan sigue a María
(2, 1),  -- María sigue a Juan
(3, 2),  -- Andrés sigue a María
(4, 1),  -- Laura sigue a Juan
(5, 3);  -- Pedro sigue a Andrés

-- 5. Categorías por evento
INSERT INTO tblcategoriasxevento (id_evento, id_categoria) VALUES
(1, 1), -- Rock -> Música
(1, 3), -- Rock -> Deporte (p.ej. carrera previa)
(2, 2), -- Pintura -> Arte
(3, 4), -- Maratón -> Académico (evento universitario)
(3, 3), -- Maratón -> Deporte
(4, 4), -- Tecnología -> Académico
(5, 3); -- Volleyball -> Deporte

-- 6. Intereses de usuario
INSERT INTO tblinteresesxusuario (id_usuario, id_categoria) VALUES
(1, 1), -- Juan interesado en Música
(1, 3), -- Juan interesado en Deporte
(2, 2), -- María interesado en Arte
(3, 4), -- Andrés interesado en Académico
(4, 3), -- Laura interesada en Deporte
(5, 2), -- Pedro interesado en Arte
(5, 1); -- Pedro interesado en Música

