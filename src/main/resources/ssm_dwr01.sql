/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50163
Source Host           : localhost:3306
Source Database       : ssm_dwr01

Target Server Type    : MYSQL
Target Server Version : 50163
File Encoding         : 65001

Date: 2016-11-15 14:46:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `userinfos`
-- ----------------------------
DROP TABLE IF EXISTS `userinfos`;
CREATE TABLE `userinfos` (
  `userinfo_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `user_tel` varchar(11) DEFAULT NULL COMMENT '用户电话',
  `user_address` varchar(200) DEFAULT NULL COMMENT '用户住址',
  `user_id` varchar(50) NOT NULL,
  PRIMARY KEY (`userinfo_id`),
  KEY `userinfo_user_id` (`user_id`),
  CONSTRAINT `userinfo_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfos
-- ----------------------------

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL COMMENT '用户ID',
  `user_no` varchar(50) NOT NULL COMMENT '用户账号',
  `user_name` varchar(50) NOT NULL COMMENT '用户昵称',
  `user_pwd` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('123', '123', '李四', '123');
INSERT INTO `users` VALUES ('123456', '123456', '张三', '123456');
INSERT INTO `users` VALUES ('456', '456', '王五', '456');
