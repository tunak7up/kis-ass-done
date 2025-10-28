CREATE DATABASE  IF NOT EXISTS `sale` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sale`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: sale
-- ------------------------------------------------------
-- Server version	8.0.42

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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Thanh Hoa 1',1),(2,'Cầu Giấy',1),(3,'Hoàng Mai',1),(4,'Hải Phòng',1),(5,'Quảng Ninh',1),(6,'Đà Nẵng',2),(7,'Huế',2),(8,'Quảng Nam',2),(9,'TP. Hồ Chí Minh - Quận 1',3),(10,'TP. Hồ Chí Minh - Bình Thạnh',3),(11,'Bình Dương',3),(12,'Đồng Nai',3);
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
  PRIMARY KEY (`detail_id`),
  KEY `totalDetail_id` (`totalDetail_id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`totalDetail_id`) REFERENCES `totaldetail` (`totalDetail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail`
--

LOCK TABLES `detail` WRITE;
/*!40000 ALTER TABLE `detail` DISABLE KEYS */;
INSERT INTO `detail` VALUES (1,'2025-09-01 17:00:00',1,1,58),(2,'2025-09-02 17:00:00',1,1,16),(3,'2025-09-03 17:00:00',1,1,40),(4,'2025-09-04 17:00:00',1,1,45),(5,'2025-09-05 17:00:00',1,1,97),(6,'2025-09-06 17:00:00',1,1,90),(7,'2025-09-07 17:00:00',1,1,29),(8,'2025-09-08 17:00:00',1,1,68),(9,'2025-09-09 17:00:00',1,1,51),(10,'2025-09-10 17:00:00',1,1,100),(11,'2025-09-11 17:00:00',1,1,69),(12,'2025-09-12 17:00:00',1,1,49),(13,'2025-09-13 17:00:00',1,1,27),(14,'2025-09-14 17:00:00',1,1,8),(15,'2025-09-15 17:00:00',1,1,4),(16,'2025-09-16 17:00:00',1,1,61),(17,'2025-09-17 17:00:00',1,1,49),(18,'2025-09-18 17:00:00',1,1,100),(19,'2025-09-19 17:00:00',1,1,69),(20,'2025-09-20 17:00:00',1,1,44),(21,'2025-09-21 17:00:00',1,1,28),(22,'2025-09-22 17:00:00',1,1,45),(23,'2025-09-23 17:00:00',1,1,9),(24,'2025-09-24 17:00:00',1,1,39),(25,'2025-09-25 17:00:00',1,1,17),(26,'2025-09-26 17:00:00',1,1,53),(27,'2025-09-27 17:00:00',1,1,5),(28,'2025-09-28 17:00:00',1,1,58),(29,'2025-09-29 17:00:00',1,1,36),(30,'2025-09-30 17:00:00',1,1,15);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpi`
--

LOCK TABLES `kpi` WRITE;
/*!40000 ALTER TABLE `kpi` DISABLE KEYS */;
INSERT INTO `kpi` VALUES (1,'MCP overview',1),(2,'Kế hoạch MCP mới',1),(3,'MCP 3T không giao dịch',1),(4,'Doanh số',2),(5,'ASO',2),(6,'ĐHTC',2),(7,'SKU/ĐH',2),(8,'Phân tích chỉ số viếng thăm',3),(9,'Phân tích thời gian viếng thăm',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `npp`
--

LOCK TABLES `npp` WRITE;
/*!40000 ALTER TABLE `npp` DISABLE KEYS */;
INSERT INTO `npp` VALUES (1,'NPP Hà Nội A',1),(2,'NPP Hà Nội B',1),(3,'NPP Cầu Giấy A',2),(4,'NPP Hoàng Mai A',3),(5,'NPP Hải Phòng A',4),(6,'NPP Quảng Ninh A',5),(7,'NPP Đà Nẵng A',6),(8,'NPP Huế A',7),(9,'NPP Quảng Nam A',8),(10,'NPP HCM Quận 1 A',9),(11,'NPP HCM Bình Thạnh A',10),(12,'NPP Bình Dương A',11),(13,'NPP Đồng Nai A',12);
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
  PRIMARY KEY (`region_id`),
  UNIQUE KEY `region_name` (`region_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'Miền Bắc'),(3,'Miền Nam'),(2,'Miền Trung'),(4,'Test Region');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'Route 1',1),(16,'Route HN-BT-01',1),(17,'Route HN-BT-02',1),(18,'Route HN-BT-03',2),(19,'Route HN-CG-01',3),(20,'Route HN-HM-01',4),(21,'Route HN-HM-02',4),(22,'Route HP-01',5),(23,'Route QN-01',6),(24,'Route DN-01',7),(25,'Route HUE-01',8),(26,'Route QNA-01',9),(27,'Route HCM-Q1-01',10),(28,'Route HCM-BT-01',11),(29,'Route BD-01',12),(30,'Route DN-01',13);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
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
  `kpi_id` int NOT NULL,
  `total_formula` text COMMENT 'Công thức tổng hợp tháng hoặc route',
  `day_formula` text COMMENT 'Công thức tính giá trị mỗi ngày',
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
INSERT INTO `totaldetail` VALUES (1,'Tổng số MCP trong tháng',1,'SUM(detail_value WHERE route_id = X AND MONTH(detail_date) = 9)','value(kpi_id=1, date) + value(kpi_id=2, date)'),(2,'Số MCP hoạt động',1,'COUNT(detail_value WHERE active = 1)','value(kpi_id=1, date)'),(3,'Tỷ lệ hoạt động',1,'totalDetail(2) / totalDetail(1)','value(kpi_id=2) / value(kpi_id=3)'),(4,'Số MCP kế hoạch',2,'SUM(detail_value WHERE plan = 1)','value(kpi_id=4, date)'),(5,'Số MCP hoàn thành',2,'SUM(detail_value WHERE done = 1)','value(kpi_id=5, date)'),(6,'Tỷ lệ hoàn thành',2,'totalDetail(5) / totalDetail(4)','value(kpi_id=5) / value(kpi_id=4)'),(7,'Tổng MCP 3T',3,'SUM(detail_value)','value(kpi_id=6, date)'),(8,'Tổng MCP có giao dịch',3,'SUM(detail_value WHERE traded = 1)','value(kpi_id=7, date)'),(9,'Tỷ lệ không giao dịch',3,'1 - (totalDetail(8) / totalDetail(7))','1 - (value(kpi_id=7) / value(kpi_id=6))');
/*!40000 ALTER TABLE `totaldetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-28 23:22:37
