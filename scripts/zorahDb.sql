CREATE DATABASE IF NOT EXISTS `zorahDb`;
USE `zorahDb`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `answer` (
  `id` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `text` varchar(2048) NOT NULL,
  `addDate` bigint(20) NOT NULL,
  `answersentenceindex` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `discord_guild` (
  `discord_guildId` bigint(20) NOT NULL,
  `addDate` bigint(20) NOT NULL,
  `prefix` varchar(112) NOT NULL,
  PRIMARY KEY (`discord_guildId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `discord_user` (
  `discord_userId` bigint(20) NOT NULL,
  `userId` int(11) NOT NULL,
  `addDate` bigint(20) NOT NULL,
  `discordtag` varchar(8) NOT NULL,
  `lastupvotedbl` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`discord_userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `addDate` bigint(20) NOT NULL,
  `username` varchar(56) NOT NULL,
  `credits` int(11) NOT NULL,
  `banned` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `source` varchar(32) NOT NULL,
  `sourceId` varchar(56) NOT NULL,
  `fromUserId` int(11) NOT NULL,
  `text` varchar(2048) NOT NULL,
  `addDate` bigint(20) NOT NULL,
  `finished` tinyint(1) NOT NULL,
  `sent` tinyint(1) NOT NULL,
  `maxAnswers` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `report` (
  `type` varchar(32) NOT NULL,
  `typeId` int(11) NOT NULL,
  `fromUserId` int(11) NOT NULL,
  `addDate` bigint(20) NOT NULL,
  PRIMARY KEY (`type`,`typeId`,`fromUserId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `answer`
  ADD UNIQUE KEY `questionid_userid` (`questionId`,`userId`) USING BTREE;

ALTER TABLE `answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

COMMIT;
