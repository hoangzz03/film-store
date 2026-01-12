-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: camera_store
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `productId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a3647bd11aed3cf968c9ce9b835` (`productId`),
  KEY `FK_ede5a8019944c072dfb8eaf23ee` (`userId`),
  CONSTRAINT `FK_a3647bd11aed3cf968c9ce9b835` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `FK_ede5a8019944c072dfb8eaf23ee` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (26,1,1,17),(27,1,1,17),(57,1,1,16),(61,1,1,10);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('pending','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'pending');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `payUrl` varchar(255) NOT NULL,
  `resultCode` int NOT NULL,
  `userId` int DEFAULT NULL,
  `orderId` varchar(255) NOT NULL,
  `createat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_d35cb3c13a18e1ea1705b2817b1` (`userId`),
  CONSTRAINT `FK_d35cb3c13a18e1ea1705b2817b1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,37000000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0Mzk3MTE4NDc4Nw&s=bb52ac55e0a2346067f8e24f554c6f4a8c1b6f8f4d4f6023515b86fd7b5d0cd6',1005,10,'MOMO1743971184787','2025-04-11 18:31:07'),(3,40000000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0Mzk3MTI4MTE2MA&s=bacb94134a79e1562b27f9eec0f00eb1abfb1a82d857d3f98eed9ea30ef4f5e9',1005,10,'MOMO1743971281160','2025-04-11 18:31:07'),(4,40000000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0Mzk3MTI5NzI3Nw&s=d2fa3d24506add887ff42abec25c2f287abf9b95bc0932bfc070d18b71f99d25',1005,10,'MOMO1743971297277','2025-04-11 18:31:07'),(5,56000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0Mzk3MTM2NjM2Mw&s=e534dcca65b977410ef497bbbb353a91658d00b21309a372bfb371d49f16b85e',1005,10,'MOMO1743971366363','2025-04-11 18:31:07'),(6,1000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0Mzk3NDIwMjU3NA&s=ea3d79f23a339b82e13071129dc490da9cebae33fa25c96ef1eef029a5cd1bea',1005,10,'MOMO1743974202574','2025-04-11 18:31:07'),(7,1000,'Thành công.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDAwNDc2NDQ4Mw&s=9d908a29eefeb0df7828e1469396824981daf010477479dc09b799b5a5005ea0',0,10,'MOMO1744004764483','2025-04-11 18:31:07'),(10,1000,'Thành công.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDAwODg5MTcyNQ&s=f085985c172b840bf9f044c08c251b9e1fddb3369d8fefe8e3b7ed9186cfb0cd',0,10,'MOMO1744008891725','2025-04-11 18:31:07'),(11,1000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDE4NjU0OTc5Ng&s=603431cc576ccf72c9606d1bbd2f26095f503f49270754cdad42342562b46f8f',1005,10,'MOMO1744186549796','2025-04-11 18:31:07'),(12,3600,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDE4ODk3NDcxNA&s=a464a6f1b09ad9b9ae46704693a319cac513116be0b0341c4c1f68c7b042378f',1005,10,'MOMO1744188974714','2025-04-11 18:31:07'),(13,72000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDE4OTEzNDk3Nw&s=04676b198778711cc1f1bb1c150311dcad48c46c7a2777a9d333940d9916a81b',1005,10,'MOMO1744189134977','2025-04-11 18:31:07'),(14,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDIwMjM5NTYyMA&s=dd7332f68961987a72590bde6a086388f0dad612d1a02f422fe310d6afd60d62',1005,10,'MOMO1744202395620','2025-04-11 18:31:07'),(15,120000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDI4OTM1ODcwOA&s=22eab4f7a2b962c2862d9139bad189fb3aa72007e57b0fce68d0cd4f43ebe900',1005,17,'MOMO1744289358708','2025-04-11 18:31:07'),(16,1600,'Thành công.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDM3NjcwMjA5OQ&s=8ba86fa0f0409eaabd77064de163dfb38f1985b0d40f859c9597d4cba8ca2c98',0,10,'MOMO1744376702099','2025-04-11 20:05:02'),(17,1600,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDM5OTM5MzA2OA&s=07d3cdcb036ffead7cb94c4f14aa52ac6105becf35b7fc8120ba55d15ebc4d68',1005,10,'MOMO1744399393068','2025-04-12 02:23:13'),(18,1600,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDM5OTYzNjI0NA&s=a587e633a9f22a14220b13f15160e27e8aab116a117ca85011a909319eab863c',1005,10,'MOMO1744399636244','2025-04-12 02:27:16'),(19,12000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDM5OTc0MDc0MQ&s=8e21921a15270fba1d8e59775ccf0f9a2374e1e90dc6f8fe70a2e03a38b791d9',1005,10,'MOMO1744399740741','2025-04-12 02:29:00'),(20,200000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDQwMTUwMzU4OQ&s=f4608d225b36e45d8dcb89efec490976d055a97f49dcdd864230aa29dd51bdcd',1005,10,'MOMO1744401503589','2025-04-12 02:58:23'),(21,200000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDQxMzY1NTQyNQ&s=af8fe468be8414b46d7c5f2f26f0316fd22a03913ed105dd415d6ae29467c3ca',1005,10,'MOMO1744413655425','2025-04-12 06:20:56'),(22,260000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDQ0MDMxMDM0OA&s=a8d171bd9a5eb33bb71d9b51fd16fdaa5e02158d2906002c1760205e60f4afcd',1005,10,'MOMO1744440310348','2025-04-12 13:45:10'),(23,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NDYzOTM1NDE3MQ&s=1032e8a13706476f98556f27d4841dc02552f2eed502d343124d70c780c3a920',1005,10,'MOMO1744639354171','2025-04-14 21:02:34'),(24,60000,'Thành công.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0NTEzMzIyMDkzOQ&s=ae3fec1ab8279554b59a3b38c3c2b4ea212a790fb0eb46e071f6e28280c37ce9',0,10,'MOMO1745133220939','2025-04-20 14:13:41'),(25,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0OTk0OTM1ODM4OQ&s=2ae599c3071ea8722830fb7f0458c4052adc5e569c5a13e6a2be518b4adaa000',1005,10,'MOMO1749949358389','2025-06-15 08:02:39'),(26,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc0OTk0OTM1OTg1OQ&s=91cf6e29a21e91d5ac12799dc2bab7f607adedb8731d1b227adf878792db16a7',1005,10,'MOMO1749949359859','2025-06-15 08:02:40'),(27,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc1MDA0ODAwNDY2Ng&s=7c9759fd8ed3ab00f1a6582cb012bf7e5c10ea48e3b7f4f9d3dccf2a23633d36',1005,10,'MOMO1750048004666','2025-06-16 11:26:44'),(28,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc1MDA0ODEyMzE2Mw&s=2e8b44892404849e1a3bdace76ef667a8fdde8262b0654763f1baa2fe8fa5d3d',1005,10,'MOMO1750048123163','2025-06-16 11:28:43'),(29,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc1MjY0OTQ3NjUxNA&s=888be34e6339c017077883f1c4e7743550fa241d89b56a84d82d3bdd27cfb228',1005,16,'MOMO1752649476514','2025-07-16 14:04:36'),(30,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc1NTU3NzE0NzQ1MA&s=51c501e91765dc641e882f6f21bf9b43a31a5ee08e30cc0b50c9a0aa0c752340',1005,10,'MOMO1755577147450','2025-08-19 11:19:13'),(31,60000,'Thành công.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDY4Mzg5NjY4Mw&s=f7987c539e85812ace38a7c4d33fd1d03fc69c1298e3305e4c01d88857c2a4d7',0,16,'MOMO1760683896683','2025-10-17 13:51:36'),(32,300000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDY4NTUwMDU5NQ&s=fd7287f12627472b53a0692d37b5fedfd860f1e33b32356d388ccf621456dc67',1005,16,'MOMO1760685500595','2025-10-17 14:18:20'),(33,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDY4ODg2MDk2Mw&s=695544ef4220daba615236669fe67bd1b86ce89d6a40cd5eb3736523ed4eb76a',1005,16,'MOMO1760688860963','2025-10-17 15:14:21'),(34,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDY5NjUyMDc1Ng&s=a383f710dcedf5ea285de9241d2d1ff14af2c5bac562a0f55cd5d4f578001dbe',1005,16,'MOMO1760696520756','2025-10-17 17:22:01'),(35,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDY5Njc1ODU1MQ&s=4dc4663211a852f7a2b8f14daee97c5477f11e1f2d328e13c670afaf5670d1ca',1005,16,'MOMO1760696758551','2025-10-17 17:25:58'),(36,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDY5Njg4NzAzNA&s=ec8f7fdc29c1fefd689d02ab3ad22805b847da4971293afb07dc8bc1a1d52012',1005,16,'MOMO1760696887034','2025-10-17 17:28:07'),(37,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDY5Njk2Nzk4OQ&s=1f4a6626857b2eca039f8a92c02b894346e910fb3217f2fe5efe304a75219d24',1005,16,'MOMO1760696967989','2025-10-17 17:29:28'),(38,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDcwMjU5MTk4Nw&s=2d422b9f0ed59c890ccd5fc5ff3bf909a06980f98b3b0ee8fa86302e885c8e0f',1005,10,'MOMO1760702591987','2025-10-17 19:03:12'),(39,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDcxNzg2Mjg3Nw&s=d6a8156ed5337c43cddbbd2af9b306bfff713efe37c81354d5db00de10363fc4',1005,16,'MOMO1760717862877','2025-10-17 23:17:42'),(40,60000,'Giao dịch đã hết hạn hoặc không tồn tại.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2MDcyMDQzMjUxMA&s=1156ed0da4287775b3ed2369aad5c2ce341d8ce837e5bb20779d5aff0a2725f2',1005,16,'MOMO1760720432510','2025-10-18 00:00:32'),(41,60000,'Giao dịch đã được khởi tạo, chờ người dùng xác nhận thanh toán.','https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTc2NzM1MzI0MjQ2NQ&s=89d2438c8a50c667cb1643d7882543e7f998882c45d9bcbcf499d40c9b2998d7',1000,10,'MOMO1767353242465','2026-01-02 18:27:22');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,'135 camera'),(2,'120 camera'),(3,'Film');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `productCategoryId` int DEFAULT NULL,
  `price` int NOT NULL,
  `detail` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5210b3add61b23c9c2d1bbc187d` (`productCategoryId`),
  CONSTRAINT `FK_5210b3add61b23c9c2d1bbc187d` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Nikon F2','https://i.imgur.com/BP1wSjS.jpeg','Nikon F2 35mm SLR Film Camera with Nikon Zoom-Nikkor 35-70mm F3.3-4.5 Lens',1,6000000,'Máy 35mm slr Full cơ. Máy  có thể tháo và thay thế gù.'),(2,'Canon Ae-1','https://i.imgur.com/XAFpwNi.jpeg','Canon AE-1 Program 35mm SLR Film Camera Bundle with 50mm f1.8 Lens & 28mm f2.8 Lens',1,3500000,'Máy 35mm slr Canon, có mode Program tự động và Manual. Máy cần 1 viên pin 4LR44 để hoạt động.'),(3,'Canon Af-35','https://i.imgur.com/dWp0OfP.jpeg',' Point & Shoot Film Camera',1,1500000,''),(4,'Mamiya C220','https://i.imgur.com/7460fMA.jpeg','Medium Format Camera with 55mm F4.5 & 180mm F4.5 Lenses',2,20000000,''),(5,'Voigtlander Bessa-R','https://i.imgur.com/d0w6ub6.jpeg','Voigtländer Bessa-R with Color-Skopar 35mm f/2.5 Lens, Grip, and Leather Case – A Rare Collector’s Set',2,32600000,''),(6,'Kodak Color Plus 200','https://i.imgur.com/0mEGtDx.jpeg','Color Film',3,255000,''),(7,'Fujifilm C200','https://i.imgur.com/K38DgSz.jpeg','Color Film',3,360000,''),(8,'Kodak Portra 400','https://i.imgur.com/B4uLXgm.jpeg','Color Film',3,430000,''),(9,'Cinestill 800','https://i.imgur.com/D09VWN0.jpeg','Cine Film',3,810000,''),(10,'Kodak Gold 200','https://i.imgur.com/pQN2cea.jpeg','Color Film',3,230000,''),(11,'Kodak Proimage 100','https://i.imgur.com/anbYA1f.jpeg','Color Film',3,260000,''),(12,'Fujifilm X-tra 400','https://i.imgur.com/lrw7gyJ.jpeg','Color Film',3,355000,''),(13,'Fujifilm Across 100','https://i.imgur.com/jUKkxD7.jpeg','B&W Film',3,160000,''),(14,'Kodak Ultramax 400','https://i.imgur.com/XkBMVVQ.jpeg','Color Film',3,320000,''),(15,'Kodak Ektar 100','https://i.imgur.com/zAGGaGt.jpeg','Color Film',3,460000,''),(16,'Kodak Portra 160 khổ 120','https://i.imgur.com/6vJejH9.jpeg','Film màu 120',3,200000,''),(17,'Konica Z-up 125','https://i.imgur.com/YofSVlQ.jpeg',' Point & Shoot Film Camera',1,2500000,''),(18,'ilfordhp5 400','https://i.imgur.com/orlzHHM.jpeg','B&W Film',3,400000,''),(25,'HÀ','https://i.imgur.com/pk7Kxyu.jpeg','rểg',1,1200000,'ẻgeg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int DEFAULT NULL,
  `createat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(255) NOT NULL DEFAULT 'https://i.imgur.com/1JenGRR.jpeg',
  PRIMARY KEY (`id`),
  KEY `FK_368e146b785b574f42ae9e53d5e` (`roleId`),
  CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'10','Hai phong','10@gmail.com','7893025782','$2b$10$QWYyNF7nvY/fWPnaUO9IQOl4XONsCPDSCuXQIbGM6oBTwx5FhrEae',2,'2025-04-11 22:02:30','https://i.imgur.com/1JenGRR.jpeg'),(16,'hoangzz03','ha noi','hoang@gmail.com','0944342234','$2b$10$AWBkwPMIstuvMnnzwLDbWu7ZLcyjY8CcvVKTlfwGaH8g1PT5mZIPG',1,'2025-04-11 22:02:30','https://i.imgur.com/1JenGRR.jpeg'),(17,'hoangnviet','hanoi','hoangnv@gmail.com','0977889966','$2b$10$M2CO75OGEaTw3TogfVHhdOzAEJ3GSxiuHnCOo2uU1UB8ZQLqhp.cW',2,'2025-04-11 22:02:30','https://i.imgur.com/1JenGRR.jpeg');
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

-- Dump completed on 2026-01-04 20:02:13
