CREATE DATABASE  IF NOT EXISTS `sale` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sale`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: sale
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `area_id` int NOT NULL AUTO_INCREMENT,
  `area_name` varchar(255) NOT NULL,
  `region_id` int NOT NULL,
  PRIMARY KEY (`area_id`),
  KEY `region_id` (`region_id`),
  CONSTRAINT `area_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `region` (`region_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `content_id` int NOT NULL AUTO_INCREMENT,
  `content_name` varchar(255) NOT NULL,
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (1,'Thiết lập tuyến'),(2,'Chỉ số nền tảng'),(3,'Chỉ số viếng thăm');
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail`
--

DROP TABLE IF EXISTS `detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `detail_date` datetime NOT NULL,
  `totalDetail_id` int NOT NULL,
  `route_id` int NOT NULL,
  `detail_value` float NOT NULL,
  `formula` text COMMENT 'Ví dụ: value(kpi_id=2, date=''2025-10-01'') / value(kpi_id=3, date=''2025-10-01'')',
  PRIMARY KEY (`detail_id`),
  KEY `totalDetail_id` (`totalDetail_id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_11` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_13` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_15` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_17` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_19` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_20` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`),
  CONSTRAINT `detail_ibfk_3` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_5` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_7` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_9` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail`
--

LOCK TABLES `detail` WRITE;
/*!40000 ALTER TABLE `detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpi`
--

DROP TABLE IF EXISTS `kpi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kpi` (
  `kpi_id` int NOT NULL AUTO_INCREMENT,
  `kpi_name` varchar(255) NOT NULL,
  `content_id` int NOT NULL,
  PRIMARY KEY (`kpi_id`),
  KEY `content_id` (`content_id`),
  CONSTRAINT `kpi_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpi`
--

LOCK TABLES `kpi` WRITE;
/*!40000 ALTER TABLE `kpi` DISABLE KEYS */;
INSERT INTO `kpi` VALUES (1,'MCP overview',1),(2,'Kế hoạch MCP mới',1),(3,'MCP 3T không giao dịch',1),(4,'MCP overview',2),(5,'Kế hoạch MCP mới',2),(6,'MCP 3T không giao dịch',2),(7,'MCP overview',3);
/*!40000 ALTER TABLE `kpi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `npp`
--

DROP TABLE IF EXISTS `npp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `npp` (
  `npp_id` int NOT NULL AUTO_INCREMENT,
  `npp_name` varchar(255) NOT NULL,
  `area_id` int NOT NULL,
  PRIMARY KEY (`npp_id`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `npp_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `area` (`area_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `npp`
--

LOCK TABLES `npp` WRITE;
/*!40000 ALTER TABLE `npp` DISABLE KEYS */;
/*!40000 ALTER TABLE `npp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `region_id` int NOT NULL AUTO_INCREMENT,
  `region_name` varchar(255) NOT NULL,
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `route_id` int NOT NULL AUTO_INCREMENT,
  `route_name` varchar(255) NOT NULL,
  `npp_id` int NOT NULL,
  PRIMARY KEY (`route_id`),
  KEY `npp_id` (`npp_id`),
  CONSTRAINT `route_ibfk_1` FOREIGN KEY (`npp_id`) REFERENCES `npp` (`npp_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20251024042653-create-content.js'),('20251024043556-create-kpi.js'),('20251024044215-create-detail.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `totaldetail`
--

DROP TABLE IF EXISTS `totaldetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `totaldetail` (
  `totalDetail_id` int NOT NULL AUTO_INCREMENT,
  `totalDetail_name` varchar(255) NOT NULL,
  `formula` text NOT NULL,
  `kpi_id` int NOT NULL,
  PRIMARY KEY (`totalDetail_id`),
  KEY `kpi_id` (`kpi_id`),
  CONSTRAINT `totaldetail_ibfk_1` FOREIGN KEY (`kpi_id`) REFERENCES `kpi` (`kpi_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `totaldetail`
--

LOCK TABLES `totaldetail` WRITE;
/*!40000 ALTER TABLE `totaldetail` DISABLE KEYS */;
INSERT INTO `totaldetail` VALUES (1,'Kế hoạch VT tháng','SUM(detail_value WHERE MONTH(detail_date)=MONTH(CURRENT_DATE()) AND kpi_id = this.kpi_id)',1),(2,'Viếng thăm thực tế tháng','SUM(detail_value WHERE MONTH(detail_date)=MONTH(CURRENT_DATE()) AND kpi_id = this.kpi_id)',1),(3,'% VT/KH','(value(totalDetail_name=\'Viếng thăm thực tế tháng\') / value(totalDetail_name=\'Kế hoạch VT tháng\')) * 100',1),(4,'Kế hoạch VT tháng','SUM(detail_value WHERE MONTH(detail_date)=MONTH(CURRENT_DATE()) AND kpi_id = this.kpi_id)',2),(5,'Viếng thăm thực tế tháng','SUM(detail_value WHERE MONTH(detail_date)=MONTH(CURRENT_DATE()) AND kpi_id = this.kpi_id)',2),(6,'% VT/KH','(value(totalDetail_name=\'Viếng thăm thực tế tháng\') / value(totalDetail_name=\'Kế hoạch VT tháng\')) * 100',2),(7,'Kế hoạch VT tháng','SUM(detail_value WHERE MONTH(detail_date)=MONTH(CURRENT_DATE()) AND kpi_id = this.kpi_id)',3),(8,'Viếng thăm thực tế tháng','SUM(detail_value WHERE MONTH(detail_date)=MONTH(CURRENT_DATE()) AND kpi_id = this.kpi_id)',4),(9,'% VT/KH','(value(totalDetail_name=\'Viếng thăm thực tế tháng\') / value(totalDetail_name=\'Kế hoạch VT tháng\')) * 100',5);
/*!40000 ALTER TABLE `totaldetail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-27 11:59:22
