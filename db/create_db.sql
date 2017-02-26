-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 26, 2017 at 09:55 PM
-- Server version: 5.6.33
-- PHP Version: 7.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `hacktheconstitution`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `title` varchar(1024) NOT NULL,
  `date` varchar(20) NOT NULL,
  `comments` longtext NOT NULL,
  `directory` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`title`, `date`, `comments`, `directory`) VALUES
('City_of_Cape_Town_Water_By_law_2010', '17-02-2017', '[{"user":"Denver","date":"25-02-17 19:52","comment":"sadsadsa","section":"section-1"},{"user":"Denver","date":"25-02-17 19:52","comment":"asdsadsaq321312312312312l312k312esafsdafldsaksdfkdsfsdfsfasfsdfsdfsdf","section":"section-1"},{"user":"Denver","date":"25-02-17 20:02","comment":"asdlsadpasoidpsad09sd09asd09asd0asdasdaspdapsodpsaddasdasdas9dsa0dasdasdasdasd9sa8d09as0d9sadsadas90d9sad0","section":"section-1"},{"user":"Denver","date":"25-02-17 20:12","comment":"lkkl","section":"section-16"},{"user":"Denver","date":"25-02-17 20:13","comment":"lkasdklaskdasdsadsadasdasdsaasdasdasdasdasdasdasdasda","section":"section-1"},{"user":"Denver","date":"25-02-17 20:14","comment":"asdsald sakdlskdl ksa    sadas","section":"section-1"},{"user":"Denver","date":"25-02-17 20:14","comment":"kklskdlsakdl klksdalkd asasdsadasdasdasasdsadas","section":"section-1"},{"user":"Denver","date":"26-02-17 16:12","comment":"sadsadas","section":"section-5"},{"user":"Denver","date":"26-02-17 16:12","comment":"asdsa","section":"section-4"},{"user":"Denver","date":"26-02-17 16:17","comment":"Jsjskndnsssjsjsns","section":"section-1"},{"user":"Denver","date":"26-02-17 16:17","comment":"Test this out","section":"section-1"},{"user":"user1","date":"26-02-17 22:25","comment":"asdsadasd","section":"section-1"},{"user":"user1","date":"26-02-17 22:25","comment":"asdsa","section":"section-1"},{"user":"user1","date":"26-02-17 22:30","comment":"test","section":"section-1"}]', 'docs/City_of_Cape_Town_Water_By_law_2010.html'),
('City_of_Cape_Town_City_Ombudsman_By_law_2015', '17-02-2017', '[{"user":"Denver","date":"25-02-17 20:08","comment":"asdasd","section":"section-1"},{"user":"Denver","date":"25-02-17 20:08","comment":"sadksalkdasasdsadasd","section":"section-1"},{"user":"Denver","date":"25-02-17 20:14","comment":"sadklaskdlsakdlkkklklklksadsadasdasdasdasdassadasdlkasldsadsadsadasd","section":"section-1"},{"user":"Denver","date":"25-02-17 20:30","comment":"ljlmlk","section":"section-1"},{"user":"Denver","date":"25-02-17 20:30","comment":"laslald aldasdsald sal dlsadald asld   sadsadas dasd ","section":"section-1"},{"user":"Denver","date":"25-02-17 20:30","comment":"asdsadlk saldkls dassad sadsad sad","section":"section-6"},{"user":"Denver","date":"25-02-17 20:31","comment":"lklklk","section":"section-7"},{"user":"Denver","date":"25-02-17 20:31","comment":"sadsadsad","section":"section-9"},{"user":"Denver","date":"25-02-17 20:32","comment":"askdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldk askdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkvvvvaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldkaskdlksalk sldk askdlsakd lskadlksaldk","section":"section-1"}]', 'docs/City_of_Cape_Town_City_Ombudsman_By_law_2015.html');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `site_roles` varchar(255) NOT NULL,
  `profession` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `site_roles`, `profession`) VALUES
(5, 'Denver', 'test', 'admin', 'amateur'),
(6, 'user1', 'test', 'admin', 'test'),
(14, 'asdas', 'sadas', '', ''),
(15, 'dnaicker@gmail.com', 'test', '', ''),
(16, 'asd', 'asd', '', ''),
(17, 'test', 'test2', '', ''),
(18, 'asdsa', 'asda', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;