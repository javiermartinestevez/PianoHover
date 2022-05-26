-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2022 a las 09:40:48
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pianohover`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asientos`
--

CREATE TABLE `asientos` (
  `id` int(11) NOT NULL,
  `letra` varchar(11) NOT NULL,
  `fila` int(11) NOT NULL,
  `idConcierto` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha_crt` timestamp NOT NULL DEFAULT current_timestamp(),
  `idTransaccion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `asientos`
--

INSERT INTO `asientos` (`id`, `letra`, `fila`, `idConcierto`, `idUsuario`, `fecha_crt`, `idTransaccion`) VALUES
(1, 'e', 3, 3, 2, '2022-05-26 07:18:00', '53W453075S017242C'),
(2, 'd', 3, 3, 2, '2022-05-26 07:18:00', '53W453075S017242C'),
(3, 'i', 3, 3, 2, '2022-05-26 07:18:00', '53W453075S017242C'),
(4, 'k', 4, 3, 2, '2022-05-26 07:18:00', '53W453075S017242C');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conciertos`
--

CREATE TABLE `conciertos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` varchar(10000) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `imagen` varchar(1000) NOT NULL DEFAULT 'https://static.designboom.com/wp-content/uploads/2022/03/new-york-philharmonic-rebrand-lincoln-center-designboom-01.jpg',
  `precioNormal` decimal(10,2) NOT NULL DEFAULT 49.99,
  `precioVip` decimal(10,2) NOT NULL DEFAULT 79.99,
  `asientos` int(50) NOT NULL DEFAULT 98,
  `fecha_crt` timestamp NOT NULL DEFAULT current_timestamp(),
  `eliminado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `conciertos`
--

INSERT INTO `conciertos` (`id`, `titulo`, `descripcion`, `fecha`, `imagen`, `precioNormal`, `precioVip`, `asientos`, `fecha_crt`, `eliminado`) VALUES
(2, 'L. LIEBERMANN, R. STRAUSS', 'Lowell Liebermann nació en la ciudad de Nueva York el 22 de febrero de 1961. A los ocho años empezó sus estudios de piano y a los catorce los de composición. Posteriormente ingresa en la prestigiosa Juilliard School of Music donde se gradúa en 1987 para terminar realizando su máster y doctorado en dicha institución. Su Concierto para flauta, arpa y orquesta, Op.48 tiene un único movimiento que se desarrolla en una doble dirección a partir del tema inicial en bloques alternados rápidos y lentos que terminan fusionándose liderados por los instrumentos solistas llegando ambas tensiones a serenarse con cierta gracia.\nEstas palabras del compositor reflejan el sentido descriptivo del poema sinfónico Muerte y transfiguración de Richard Strauss: \"Se me ocurrió la idea de representar en un poema sinfónico la muerte de una persona que había luchado en pos de los más altos ideales, por lo tanto muy posiblemente un artista\".\nTill Eulenspiegel toma la forma de un rondó por el retorno periódico de u', '2022-06-22 22:00:00', 'https://www.teatrocervantes.com/public/images/content/espectaculos/896/4efcc74ceec8f2d3f9ab49c50f3efbca.jpg?t=625d46b004420', '49.99', '79.99', 98, '2022-04-18 07:37:54', 0),
(3, 'J. HAYDN, J. BRAHMS, A. DVORÁK', 'La obertura del oratorio La creación de Franz Joseph Haydn es una representación introductoria del caos existente anterior al universo de poco más de cincuenta compases, estéticamente muy significativa en el contexto de la música de su tiempo y dentro de la obra de Haydn. Los pulsos de vida aparecen dentro de las armonías cambiantes, sugiriendo lo que está por venir. Refleja unas visiones sonoras de un imaginado paisaje primitivo que deriva a un desolado silencio final antes de que se manifieste la acción del Creador.\nFue a través del bibliotecario de la Gesellschaft der Musikfreunde de Viena, Karl Ferdinand Pohl, cómo Brahms conoció una pequeña pieza de Haydn escrita para banda. Esta fue la fuente inmediata de sus Variaciones sobre un tema de Haydn. De hecho, el tema era de origen más antiguo; un himno a los peregrinos en honor a San Antonio, utilizado por Haydn durante su empleo en Bohemia como músico en la casa del Conde Morzin.\nA diferencia de sus dos anteriores sinfonías, que tení', '2022-06-06 22:00:00', 'https://www.teatrocervantes.com/public/images/content/espectaculos/896/e8c67ae0842b39ed16b26a9af42c9844.jpg?t=625d61c24b821', '49.99', '79.99', 98, '2022-04-18 10:03:08', 0),
(5, 'A. DVORÁK, A. BRUCKNER', 'Tres aspectos hay que considerar en el Dvořák sinfonista: en primer lugar su formación como viola durante su juventud en la Orquesta del Teatro Provisional Bohemio y posteriormente en los diez años que estuvo en la Orquesta del Teatro Nacional de Praga; en segundo lugar, su aceptación y reflejo en el repertorio sinfónico de Schubert como vehículo que habría de determinar el camino expresivo que tendrían sus sinfonías y, por último, la cristalización de influencias populares y nacionalistas en la inspiración de sus composiciones, todo ello fusionado en su gran talento.\nEn el compositor austriaco Anton Bruckner encontramos a uno de los más destacados sinfonistas de la historia. Una marcada tendencia a la monumentalidad en sus obras orquestales se demuestra por sus grandes dimensiones, en las que se multiplican temas y desarrollos desde una amplia instrumentación, siendo esto último lo que produce su característica densidad de volumen sonoro, donde busca la exaltación del acorde perfecto ', '2022-06-10 22:00:00', 'https://www.teatrocervantes.com/public/images/content/espectaculos/896/4e5e0c0a301c823823c8b04fd6b77aa0.jpg?t=62723c9185232', '49.99', '79.99', 98, '2022-04-18 11:10:57', 0),
(6, 'P. MIRALLES, G. MAHLER', 'Según la compositora Pilar Miralles, su obra Cuaderno de bitácora está integrada por pequeñas piezas basadas cada una en las siete notas de la escala diatónica en sentido ascendente que mantienen una narrativa de principio a fin aunque sin conexión motívica entre ellas. No tiene una intención programática y sí un sentido abstracto para el oyente al dejar que éste le dé el significado que determinen su percepción y propias emociones.\nCon claras influencias liederísticas, la Primera sinfonía de Gustav Mahler albergó como primera intención ser un poema sinfónico de elevadas abstracciones, hasta la primera edición aparecida en 1898, en las que la naturaleza está siempre presente. El sobrenombre de ‘Titán’ viene motivado por la admiración que tenía el músico de la novela del mismo título perteneciente a gran escritor alemán conocido popularmente por Jean Paul (Johann Paul Friedrich Richter), por quien sentía una gran afinidad, dada su fantasía, extraño humor y emotividad. Una especie de guí', '2022-06-17 22:00:00', 'https://www.teatrocervantes.com/public/images/content/espectaculos/896/484cdcfe6b7f54e714dbcb2c013616f3.jpg?t=625d4747e6b3c', '49.99', '79.99', 98, '2022-04-18 11:11:41', 0),
(7, 'L. BOULANGER, M. RAVEL, C. DEBUSSY', 'Escrito en 1918, D\'un matin de printemps de Lili Boulanger es un pequeño poema sinfónico de magistral factura que transmite la fragancia de una mañana de primavera. Una sutil tristeza impregna la obra en sus diferentes líneas musicales que, desde una portentosa instrumentación, recuerdan el estilo de Debussy y Ravel.\nLe tombeau de Couperin es una suite en seis partes para piano compuesta por Maurice Ravel entre 1914 y 1917. Cuatro de ellas fueron orquestadas en 1919 por el mismo compositor. La palabra \"tombeau\" (tumba) del título hace referencia a los homenajes musicales, fúnebres o no, a ilustres personalidades durante la época barroca. La obra fue casi por completo compuesta en 1917 cuando Ravel, enfermo, había sido apartado del frente durante la Primera Guerra Mundial. Cada una de las piezas está dedicada a un amigo del músico, muerto en tal conflagración.\nEn 1905 se publica su ciclo de cinco piezas para piano bajo el título de Miroirs (Espejos). Cada una de estas reflexiones sonora', '2022-06-24 22:00:00', 'https://www.teatrocervantes.com/public/images/content/espectaculos/896/cdc1cb8285991b5d08bb6157be0a2dd2.jpg?t=625d47e123ff5', '49.99', '79.99', 98, '2022-04-18 11:14:09', 0),
(8, 'G. BUSSI, R. SCHUMANN, N. RIMSKY-KORSAKOV', 'Los tres episodios de la suite orquestal La tribuna derivan de algunos destacados pasajes de la ópera homónima escrita entre 2012 y 2017 por el compositor de origen uruguayo Gabriel Bussi, a su vez profesor de violín de la Orquesta Sinfónica de Galicia desde 2002. Es un drama musical en tres actos con libreto de Javier Ozores Marchesi basado en la novela del mismo título de Emilia Pardo Bazán, gran figura literaria de nuestro siglo XIX. Ha sido compuesta con motivo de cumplirse el centenario de su fallecimiento el 12 de mayo de 2021.\nEl borrador del Concierto para violonchelo y orquesta, Op.129 de Robert Schumann fue terminado en Düsseldorf entre el 10 y el 24 de octubre de 1850 siendo estrenado en Oldenburg el 23 de abril de 1860 por el gran chelista checo Ludwig Ebert. Sus tres movimientos son interpretados sin solución de continuidad.\nSe puede afirmar que la suite sinfónica Scheherazade es la obra por la que Nikolái Rimsky-Korsakov es conocido universalmente. En ella se encuentran todas las cualidades artísticas de este gran maestro de la instrumentación orquestal, disciplina en la que brilla en paridad de rango con Berlioz, R. Strauss, Stravinsky, Debussy o Ravel. En este sentido, solía afirmar que le gustaba más instrumentar que componer, llegando a interesarse por los trabajos de sus colegas, especialmente Mussorgsky, a los que dotaba de un suntuoso lenguaje formal de enorme color sonoro.', '2022-07-02 07:07:40', 'https://www.teatrocervantes.com/public/images/content/espectaculos/896/f4a5885c962365a33c4c6fe6ec63fea0.jpg?', '49.99', '79.99', 98, '2022-05-19 13:28:52', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(50) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rol` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `usuario`, `password`, `rol`) VALUES
(1, 'Javier Martín Estévez', 'admin@admin.com', 'javime', '123123', 1),
(2, 'Miguel Serrano López', 'user@user.com', 'prueba', '123123', 0),
(3, 'Antonio Salas', 'asdasd@gmail.com', 'PruebaAntonio', '123123', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asientos`
--
ALTER TABLE `asientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idConcierto` (`idConcierto`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `conciertos`
--
ALTER TABLE `conciertos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asientos`
--
ALTER TABLE `asientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `conciertos`
--
ALTER TABLE `conciertos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asientos`
--
ALTER TABLE `asientos`
  ADD CONSTRAINT `asientos_ibfk_1` FOREIGN KEY (`idConcierto`) REFERENCES `conciertos` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `asientos_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
