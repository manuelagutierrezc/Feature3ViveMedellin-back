--CREAR TABLAS MAESTRAS Y JERARQUICAMENTE LAS QUE DEPENDEN DE ELLAS:

--MAESTRAS:

CREATE TABLE tblroles (
	id_rol SERIAL PRIMARY KEY,
	rol VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE tblcategorias (
	id_categoria SERIAL PRIMARY KEY,
	nombre_categoria VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE tbltarifas_evento (
	id_tarifa_evento SERIAL PRIMARY KEY, 
	tarifa_evento VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE tblcomunas_medellin (
	id_comuna SERIAL PRIMARY KEY, 
	nombre_comuna VARCHAR(50) NOT NULL UNIQUE
);

--depende de tblcomunas_medellin
CREATE TABLE tblbarrios_medellin (
	id_barrio SERIAL PRIMARY KEY, 
	nombre_barrio VARCHAR(50) NOT NULL UNIQUE,
	id_comuna INTEGER NOT NULL REFERENCES tblcomunas_medellin(id_comuna)
);

------------------------------------------------------------------------------
--DEPENDIENTES:
--depende de tblroles
CREATE TABLE tblusuarios (
	id_usuario SERIAL PRIMARY KEY,
	nombres VARCHAR(50) NOT NULL, 
	apellidos VARCHAR(50) NOT NULL,
	correo VARCHAR(50) NOT NULL UNIQUE,
	contrasena VARCHAR(50) NOT NULL,
	id_rol INTEGER NOT NULL REFERENCES tblroles(id_rol) DEFAULT 1
);

--depende de tblbarrios_medellin, tbltarifas_evento
CREATE TABLE tbleventos (
	id_evento SERIAL PRIMARY KEY,
	titulo VARCHAR(50) NOT NULL,
	descripcion TEXT NOT NULL,
	fecha TIMESTAMP NOT NULL, 
	id_barrio INTEGER NOT NULL REFERENCES tblbarrios_medellin(id_barrio),
	id_tarifa_evento INTEGER NOT NULL REFERENCES tbltarifas_evento (id_tarifa_evento)
);

--depende de tblusuarios, tbleventos
CREATE TABLE tbleventos_guardadosxusuario (
	id_evento_guardadoxusuario SERIAL PRIMARY KEY, 
	id_usuario INTEGER NOT NULL REFERENCES tblusuarios(id_usuario),
	id_evento INTEGER NOT NULL REFERENCES tbleventos (id_evento)
);

--depende de tblusuarios
CREATE TABLE tblseguidoresxusuario(
	id_seguidorxusuario SERIAL PRIMARY KEY, 
	id_usuario_seguidor INTEGER NOT NULL REFERENCES tblusuarios(id_usuario),
	id_usuario_seguido INTEGER NOT NULL REFERENCES tblusuarios(id_usuario),
	fecha DATE DEFAULT CURRENT_DATE
);

--depende de tblusuarios, tbleventos, tblcomentarios
CREATE TABLE tblcomentarios (
	id_comentario SERIAL PRIMARY KEY, 
	id_usuario INTEGER NOT NULL REFERENCES tblusuarios(id_usuario),
	id_evento INTEGER NOT NULL REFERENCES tbleventos(id_evento),
	id_comentario_padre INTEGER REFERENCES tblcomentarios(id_comentario),
	contenido TEXT NOT NULL
);

--depende de tbleventos, tblcategorias
CREATE TABLE tblcategoriasxevento (
	id_categoriaxevento SERIAL PRIMARY KEY, 
	id_evento INTEGER NOT NULL REFERENCES tbleventos (id_evento),
	id_categoria INTEGER NOT NULL REFERENCES tblcategorias(id_categoria)
);

--depende de tblusuarios, tblcategorias
CREATE TABLE tblinteresesxusuario(
	id_interesxusuario SERIAL PRIMARY KEY,
	id_usuario INTEGER NOT NULL REFERENCES tblusuarios(id_usuario),
	id_categoria INTEGER NOT NULL REFERENCES tblcategorias(id_categoria)
);

--HAY 2 OPCIONES:
--OPCIÓN1
--depende de tblusuarios, tblcomentarios
-- CREATE TABLE tblnotificacionesxusuario(
-- 	id_notificacionxusuario SERIAL PRIMARY KEY, 
-- 	id_usuario INTEGER NOT NULL REFERENCES tblusuarios(id_usuario),
-- 	id_comentario INTEGER NOT NULL REFERENCES tblcomentarios(id_comentario)
-- );
--OPCION2
CREATE TABLE tblnotificaciones (
	id_notificacion SERIAL PRIMARY KEY, 
	id_comentario INTEGER NOT NULL REFERENCES tblcomentarios(id_comentario)
);
CREATE TABLE tblnotificacionesxusuario(
	id_notificacionxusuario SERIAL PRIMARY KEY, 
	id_usuario INTEGER NOT NULL REFERENCES tblusuarios(id_usuario),
	id_notificacion INTEGER NOT NULL REFERENCES tblnotificaciones(id_notificacion)
);




