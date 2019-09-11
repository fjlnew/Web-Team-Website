/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.1.49-community : Database - web
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`web` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `web`;

/*Table structure for table `achievement_table` */

DROP TABLE IF EXISTS `achievement_table`;

CREATE TABLE `achievement_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_num` varchar(12) NOT NULL COMMENT '学生学号',
  `type_num` int(11) NOT NULL COMMENT '成果类型',
  `img` varchar(124) NOT NULL COMMENT '是否有图片',
  `href` varchar(32) DEFAULT NULL COMMENT '是否有超链接',
  `description` varchar(64) NOT NULL COMMENT '是否有描述',
  `post_time` int(11) NOT NULL COMMENT '上传时间',
  PRIMARY KEY (`id`),
  KEY `achievement_student` (`student_num`),
  KEY `achievement_type` (`type_num`),
  CONSTRAINT `achievement_student` FOREIGN KEY (`student_num`) REFERENCES `user_table` (`student_num`) ON DELETE CASCADE,
  CONSTRAINT `achievement_type` FOREIGN KEY (`type_num`) REFERENCES `achievement_type_table` (`achievement_num`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Table structure for table `achievement_type_table` */

DROP TABLE IF EXISTS `achievement_type_table`;

CREATE TABLE `achievement_type_table` (
  `achievement_num` int(11) NOT NULL AUTO_INCREMENT COMMENT '成果编号',
  `name` varchar(16) NOT NULL COMMENT '成果名字',
  PRIMARY KEY (`achievement_num`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Table structure for table `article_table` */

DROP TABLE IF EXISTS `article_table`;

CREATE TABLE `article_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_num` varchar(12) NOT NULL COMMENT '作者学号',
  `title` varchar(32) NOT NULL COMMENT '标题',
  `body` text NOT NULL COMMENT '正文',
  `img` varchar(96) DEFAULT NULL COMMENT '图片(可以为空)',
  `post_time` int(11) NOT NULL COMMENT '发布时间',
  `type_num` int(11) NOT NULL COMMENT '前后端编号',
  `read_num` int(11) NOT NULL DEFAULT '0' COMMENT '阅读量',
  `label_num` int(11) DEFAULT NULL COMMENT '标签名',
  `description` varchar(256) NOT NULL COMMENT '描述',
  PRIMARY KEY (`id`),
  KEY `article_num` (`student_num`),
  KEY `type_num` (`type_num`),
  KEY `label_num` (`label_num`),
  CONSTRAINT `article_num` FOREIGN KEY (`student_num`) REFERENCES `user_table` (`student_num`) ON DELETE CASCADE,
  CONSTRAINT `label_num` FOREIGN KEY (`label_num`) REFERENCES `label_type_table` (`type`) ON DELETE CASCADE,
  CONSTRAINT `type_num` FOREIGN KEY (`type_num`) REFERENCES `article_type_table` (`type_num`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Table structure for table `article_type_table` */

DROP TABLE IF EXISTS `article_type_table`;

CREATE TABLE `article_type_table` (
  `type_num` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(16) NOT NULL,
  PRIMARY KEY (`type_num`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Table structure for table `banner_table` */

DROP TABLE IF EXISTS `banner_table`;

CREATE TABLE `banner_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `href` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Table structure for table `depart_table` */

DROP TABLE IF EXISTS `depart_table`;

CREATE TABLE `depart_table` (
  `depart_num` int(11) NOT NULL AUTO_INCREMENT COMMENT '学院编号',
  `depart_name` varchar(32) NOT NULL COMMENT '学院名字',
  PRIMARY KEY (`depart_num`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Table structure for table `file_table` */

DROP TABLE IF EXISTS `file_table`;

CREATE TABLE `file_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_num` varchar(12) NOT NULL,
  `title` varchar(32) NOT NULL,
  `href` varchar(32) DEFAULT NULL,
  `post_time` int(11) NOT NULL,
  `description` varchar(128) DEFAULT NULL,
  `file_href` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_file` (`student_num`),
  CONSTRAINT `student_file` FOREIGN KEY (`student_num`) REFERENCES `user_table` (`student_num`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Table structure for table `label_type_table` */

DROP TABLE IF EXISTS `label_type_table`;

CREATE TABLE `label_type_table` (
  `type` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Table structure for table `major_table` */

DROP TABLE IF EXISTS `major_table`;

CREATE TABLE `major_table` (
  `major_num` int(11) NOT NULL AUTO_INCREMENT COMMENT '专业编号',
  `major_name` varchar(16) NOT NULL COMMENT '专业名字',
  `depart_num` int(11) NOT NULL,
  PRIMARY KEY (`major_num`),
  KEY `depart_num` (`depart_num`),
  CONSTRAINT `depart_num` FOREIGN KEY (`depart_num`) REFERENCES `depart_table` (`depart_num`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

/*Table structure for table `news_table` */

DROP TABLE IF EXISTS `news_table`;

CREATE TABLE `news_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(16) NOT NULL COMMENT '公告标题',
  `body` text NOT NULL COMMENT '公告正文',
  `post_time` int(11) NOT NULL COMMENT '发布日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Table structure for table `reserch_table` */

DROP TABLE IF EXISTS `reserch_table`;

CREATE TABLE `reserch_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_num` varchar(12) NOT NULL,
  `type_num` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reserch_type` (`type_num`),
  KEY `reserch_user` (`student_num`),
  CONSTRAINT `reserch_type` FOREIGN KEY (`type_num`) REFERENCES `reserch_type_table` (`reserch_num`) ON DELETE CASCADE,
  CONSTRAINT `reserch_user` FOREIGN KEY (`student_num`) REFERENCES `user_table` (`student_num`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

/*Table structure for table `reserch_type_table` */

DROP TABLE IF EXISTS `reserch_type_table`;

CREATE TABLE `reserch_type_table` (
  `reserch_num` int(11) NOT NULL AUTO_INCREMENT,
  `reserch_name` varchar(16) NOT NULL,
  PRIMARY KEY (`reserch_num`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Table structure for table `user_info_table` */

DROP TABLE IF EXISTS `user_info_table`;

CREATE TABLE `user_info_table` (
  `student_num` varchar(12) NOT NULL,
  `description` varchar(124) DEFAULT NULL COMMENT '个人简介',
  `depart_num` int(11) NOT NULL COMMENT '学院',
  `major_num` int(11) NOT NULL COMMENT '专业名称',
  `image` varchar(124) NOT NULL COMMENT '个人照片',
  `phone_num` varchar(11) NOT NULL COMMENT '联系方式',
  `email` varchar(32) NOT NULL COMMENT '邮箱',
  PRIMARY KEY (`student_num`),
  KEY `depart` (`depart_num`),
  KEY `major` (`major_num`),
  CONSTRAINT `depart` FOREIGN KEY (`depart_num`) REFERENCES `depart_table` (`depart_num`) ON DELETE CASCADE,
  CONSTRAINT `major` FOREIGN KEY (`major_num`) REFERENCES `major_table` (`major_num`) ON DELETE CASCADE,
  CONSTRAINT `userInfo` FOREIGN KEY (`student_num`) REFERENCES `user_table` (`student_num`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `user_table` */

DROP TABLE IF EXISTS `user_table`;

CREATE TABLE `user_table` (
  `student_num` varchar(12) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(32) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`student_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
