-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2022 at 03:48 PM
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
(19, 15, '[4]', '[149]', 1, 39, 38, '2022-07-02 00:00:00'),
(20, 15, '[2,3,4]', '[150,151,152]', 1, 39, 38, '2022-07-02 00:00:00'),
(21, 15, '[2]', '[153,154,155,156]', 1, 39, 38, '2022-07-02 00:00:00'),
(22, 15, '[\"medicine1\",\"Parisatmol\",\"medicine\"]', '[157,158,159,160,161,162,163,164,165]', 1, 39, 38, '2022-07-02 00:00:00');

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
(2, 'Parisatmol', 154868, '2022-09-24 00:00:00', '2022-12-24 00:00:00', 478451100),
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
(1, 4, 'rehan_shaik', 'Farruboti786', 'Rehan Shaik', 'Tirupati', 'Andhra Pradesh', '+918328512345', 'rehan_shaik@gmail.com', NULL, ''),
(6, 4, 'mohiseen', 'Muni@123', 'mohiseen', 'Tirupati', 'Andhra Pradesh', '+918328514567', 'mohiseen@gmail.com', NULL, ''),
(8, 4, 'kumar', 'Kumar@5544', 'Kumar@', 'Tirupati', 'Andhra Pradesh', '+918328515678', 'kumar55544@gmail.com', NULL, ''),
(10, 1, 'admin', 'admin', 'Admin', 'Tirupati', 'Andhra Pradesh', '+918328599323', 'admin@gmail.com', NULL, ''),
(11, 2, 'executive', 'executive', 'Executive', 'Tirupati', 'Andhra Pradesh', '+918328519901', 'executive@gmail.com', NULL, ''),
(12, 3, 'munikumar', 'Munikumar7868', 'Muni Kumar Ngo', 'Tirupati', 'Andhra Pradesh', '8328519900', '', NULL, ''),
(15, 4, 'Farhan', 'Farruboti786', 'Farhan Shaik', 'Tirupati', 'Andhra Pradesh', '+918328519900', 'farruboti@gmail.com', NULL, 'MS Dhoni'),
(16, 3, 'munikumar123', 'Minukumar786', 'Hello Muni Kumar', 'Tirupati', 'Andhra Pradesh', '+918745963214', 'munikumarngo@gmail.com', NULL, NULL),
(17, 3, 'q4plualpuqdie6yhq1cet', '58mbqgsgj17', 'Muni Kumar Ngo', 'Tirupati', 'Andhra Pradesh', '+918745963215', 'munikumarngo@gmail.com', NULL, NULL),
(18, 3, 'k0bv5pvxflah5mn637qmn4', '1nb7hw75ymj', 'kumar', 'tipt', 'tpt', '+91undefined', 'adamin@gmail.com', NULL, NULL),
(19, 3, 'frknftzqncpoe5pli2p8gi', 'z8md0dzqauj', 'munikumar123', 'tirupati', 'tirupati', '+917418529630', 'admin@gmai.com', NULL, NULL),
(20, 3, 'lrvtsalsfk8hscs8yks43w', '18hgly78u8u', 'Kamlesh', 'Assam', 'assam', '+918523697413', 'kamlesh@takeoff.com', NULL, NULL),
(21, 3, 'e2sz0x42cmu7l53oupje', 'm5e0sxrqcgd', 'you', 'tirupati', 'tirupati', '+918529637410', 'admin@gmai.com', NULL, NULL),
(22, 3, 'iwdvp66ryjpsg45qqdmd8s', 'e4fc0fnc3dr', 'twinkle', 'Chennai', 'tmail nadu', '+918888855555', 'twinkle@twinkle.com', NULL, NULL),
(23, 3, 'n0iqokq3s7okgwy1ca5jf', 'xpu8h70uu1', 'tytrtr', 'titrupati', 'tirupathi', '+919638574152', 'afmdin@gmai.com', NULL, NULL),
(24, 3, 'fao8qzbw19iduck0ylvhj', '3hulkqij0a2', 'iiii', 'ddd', 'ddd', '+917777777777', '.@', NULL, NULL),
(25, 3, 'kuw63et4k4obd5vu745bpn', 'xcxlgy5vsk', 'kumar', 'tirupati', 'tpt', '+917418529685', 'kfjbslk@ail.com', NULL, NULL),
(26, 3, '5uaep95lvmerstoj8isy3', 'l817aznuoz', 'kkk', 'fsdfsdfd', 'fsdfdfsfd', '+914561237890', '.@gmail.com', NULL, NULL),
(27, 3, 'fk3gr93v1tkp8lp6t85b9', 'tb2f15vk7', 'etgfgnfd', 'sfhdgjv', 'fdhjghj', '+913698521470', 'sfgdfc@gmil.com', NULL, NULL),
(28, 3, 'rxvx2r6hxv9hbrif1qxyes', 'cc3sqt21kp7', 'Muniumar23', 'tpt', 'tpt', '+919638527410', 'kumar@gmail.com', NULL, NULL),
(29, 3, 'o16xw77bslsxaazg320si', '3wnvvuwbxoy', 'Kumar987', 'tpt', 'tpt', '+912859634100', 'Kumar@gmail.com', NULL, NULL),
(30, 3, 'db8q2k4wmare8j5ffvky', '7bsn4nfigdv', 'icons ', 'ptp', 'ptp', '+917895461230', 'icon@gmail.com', NULL, NULL),
(31, 3, '4edeh9sar9o7rgvxhdx1mu', 'mieppce81uc', 'Mohseeeeeeen', 'Tirupati', 'Tirupati', '+918521479632', 'm.@gmai.com', NULL, NULL),
(32, 3, 'ndc2wa47o1rdsgrfrlb0u', 'txlndgfpnjq', 'Rehan Shaik Ngo', 'Tirupati', 'Andhra Pradesh', '+918745963275', 'munikumarngo@gmail.com', 1, NULL),
(33, 3, '3eow2tcot6nk0q2jzhl2c', 'rvv18i9jowm', 'newNGO', 'tpt', 'tpt', '+911256347890', 'new@gmail.com', 1, NULL),
(34, 3, 'ba0gyztd7khgtaxw50o8f6', 'jqpo04jhns7', 'fhfghfgh', 'yui', 'jghjgh', '+919786486322', 'fhfdh@gjjh.com', 1, NULL),
(35, 3, 'unkmr0zdvlnagdzbsnjni', 'eybkhw3gee', 'rehan', 'TTP', 'PTT', '+911234569870', 'r.@gmail.com', 1, NULL),
(36, 3, 'y66iu6ubash4z7fhprqwo', 'vtbm169v0h', 'rehanshaik123456789', 'TPT', 'AP', '+911234567898', 'a.@gmail.com', 1, NULL),
(37, 3, '10g67stzegogfy52vpbylg', 'Ayeesha*@9', 'TEMP', 'TPT', 'AP', '+917531592853', 'e.@.com', 0, NULL),
(38, 3, 'easy', 'easy', 'thisNew', 'tptp', 'ttpt', '+917531596248', 'newthis@gmail.com', 0, NULL),
(39, 2, 'm_exec', 'easypassword', 'Munikumar Executive', NULL, NULL, NULL, NULL, NULL, NULL),
(40, 4, 'twinkle123', 'Farruboti786@', 'Twinkle', 'Chennai', 'Tamil Nadu', '+911234567895', 'twinkle@gmail.com', NULL, 'undefined');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
