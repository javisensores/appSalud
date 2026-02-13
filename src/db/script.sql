-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-01-2026 a las 23:34:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appsalud`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `basculas`
--

CREATE TABLE `basculas` (
  `id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `peso` decimal(5,2) NOT NULL,
  `altura` decimal(3,2) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `basculas`
--

INSERT INTO `basculas` (`id`, `paciente_id`, `peso`, `altura`, `fecha`) VALUES
(12, 9, 84.50, 1.79, '2026-01-10 21:12:25'),
(13, 10, 89.06, 1.70, '2026-01-10 21:12:25'),
(14, 11, 91.67, 1.79, '2026-01-10 21:12:25'),
(15, 12, 70.19, 1.64, '2026-01-10 21:12:25'),
(16, 13, 88.62, 1.82, '2026-01-10 21:12:25'),
(17, 14, 92.08, 1.76, '2026-01-10 21:12:25'),
(18, 15, 81.84, 1.72, '2026-01-10 21:12:25'),
(19, 16, 96.29, 1.64, '2026-01-10 21:12:25'),
(20, 17, 73.04, 1.62, '2026-01-10 21:12:25'),
(21, 18, 71.05, 1.89, '2026-01-10 21:12:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `fechaDeNacimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombre`, `apellidos`, `fechaDeNacimiento`) VALUES
(9, 'Elias Miguel ', 'Jarque', '1984-02-05'),
(10, 'Javier ', 'de la Flor Cuevas ', '2000-11-18'),
(11, 'Ana', 'Martínez González', '1988-03-10'),
(12, 'Pedro', 'López Fernández', '1975-07-25'),
(13, 'Laura', 'Sánchez Ruizz', '1992-11-04'),
(14, 'Diego', 'Hernández Moreno', '1980-01-29'),
(15, 'Carmen', 'García Jiménez', '1995-05-17'),
(16, 'Miguel', 'Rodríguez Díaz', '1970-09-12'),
(17, 'Isabel', 'Pérez Torres', '1987-12-02'),
(18, 'Javier', 'Gómez Navarro', '1983-06-22'),
(19, 'Elena', 'Romero Castro', '1998-02-28'),
(28, 'pepe', 'Lopez', '2026-01-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temperaturas`
--

CREATE TABLE `temperaturas` (
  `id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `temperatura` decimal(4,2) NOT NULL,
  `unidad` enum('celsius','fahrenheit') DEFAULT 'celsius',
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `temperaturas`
--

INSERT INTO `temperaturas` (`id`, `paciente_id`, `temperatura`, `unidad`, `fecha`) VALUES
(1, 9, 37.51, 'celsius', '2026-01-10 21:12:25'),
(2, 10, 37.72, 'celsius', '2026-01-10 21:12:25'),
(3, 11, 36.08, 'celsius', '2026-01-10 21:12:25'),
(4, 12, 37.25, 'celsius', '2026-01-10 21:12:25'),
(5, 13, 36.01, 'celsius', '2026-01-10 21:12:25'),
(6, 14, 36.28, 'celsius', '2026-01-10 21:12:25'),
(7, 15, 37.36, 'celsius', '2026-01-10 21:12:25'),
(8, 16, 37.99, 'celsius', '2026-01-10 21:12:25'),
(9, 17, 37.86, 'celsius', '2026-01-10 21:12:25'),
(10, 18, 37.31, 'celsius', '2026-01-10 21:12:25');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `basculas`
--
ALTER TABLE `basculas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paciente_id` (`paciente_id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `temperaturas`
--
ALTER TABLE `temperaturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paciente_id` (`paciente_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `basculas`
--
ALTER TABLE `basculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `temperaturas`
--
ALTER TABLE `temperaturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `basculas`
--
ALTER TABLE `basculas`
  ADD CONSTRAINT `basculas_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `temperaturas`
--
ALTER TABLE `temperaturas`
  ADD CONSTRAINT `temperaturas_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Tablas de seguridad para autenticación y protección CSRF
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'user',
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `tokens_csrf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tokens_csrf_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
