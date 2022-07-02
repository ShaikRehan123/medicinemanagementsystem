-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2022 at 05:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicion_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `medicineIDS` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`medicineIDS`)),
  `donatedMedicines` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`donatedMedicines`)),
  `status` int(1) NOT NULL,
  `execID` int(11) DEFAULT NULL,
  `ngoID` int(11) DEFAULT NULL,
  `dateOfDonation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `userID`, `medicineIDS`, `donatedMedicines`, `status`, `execID`, `ngoID`, `dateOfDonation`) VALUES
(19, 15, '[4]', '[149]', 2, 39, 38, '2022-07-02 00:00:00'),
(20, 15, '[2,3,4]', '[150,151,152]', 2, 39, 38, '2022-07-02 00:00:00'),
(21, 15, '[2]', '[153,154,155,156]', 2, 39, 38, '2022-07-02 00:00:00'),
(22, 15, '[\"medicine1\",\"Parisatmol\",\"medicine\"]', '[157,158,159,160,161,162,163,164,165]', 2, 39, 38, '2022-07-02 00:00:00'),
(23, 44, '[\"Parisatmol\"]', '[166]', 2, 39, 38, '2022-07-02 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `price` int(11) NOT NULL,
  `mfg_date` datetime NOT NULL,
  `exp_date` datetime NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `name`, `price`, `mfg_date`, `exp_date`, `quantity`) VALUES
(1, 'Saridon', 1548, '2022-06-24 00:00:00', '2022-07-24 00:00:00', 0),
(2, 'Parisatmol', 154868, '2022-09-24 00:00:00', '2022-12-24 00:00:00', 478450600),
(3, 'medicine', 54543, '2022-06-29 18:30:00', '2022-08-03 18:30:00', 53078),
(4, 'medicine1', 1, '2022-06-29 18:30:00', '2022-06-30 18:30:00', 27399),
(5, 'Paresatmol', 5, '2022-07-29 18:30:00', '2022-08-17 18:30:00', 0),
(6, 'cosin', 50, '2022-07-20 18:30:00', '2022-07-29 18:30:00', 10);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `medID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `medQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `city` varchar(250) DEFAULT NULL,
  `state` varchar(250) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(350) DEFAULT NULL,
  `is_firstime` tinyint(1) DEFAULT NULL,
  `question_answer` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `username`, `password`, `name`, `city`, `state`, `mobile`, `email`, `is_firstime`, `question_answer`) VALUES
(10, 1, 'admin', 'admin', 'Admin', '', '', '0', '', NULL, ''),
(12, 3, 'munikumar', 'Munikumar7868', 'Muni Kumar Ngo', '', '', '0', '', NULL, ''),
(15, 4, 'Farhan', 'Farruboti786', 'Farhan Shaik', 'Tirupati', 'Andhra Pradesh', '+918328519900', 'farruboti@gmail.com', NULL, 'MS Dhoni'),
(38, 3, 'easy', 'easy', 'thisNew', 'tptp', 'ttpt', '+917531596248', 'newthis@gmail.com', 0, NULL),
(39, 2, 'm_exec', 'easypassword', 'Munikumar Executive', NULL, NULL, NULL, NULL, NULL, NULL),
(44, 4, 'karthika15987', 'karthikanewpassword', 'karthikanewname', 'karthikanewcity', 'karthikanewcity123', '4445556662', 'karthikanew@gmail.com', NULL, 'hardik pandya');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `role` varchar(55) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `role`, `description`) VALUES
(1, 'admin', 'admin role'),
(2, 'executive', 'executive role'),
(3, 'ngo', 'ngo role'),
(4, 'user', 'user role');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
