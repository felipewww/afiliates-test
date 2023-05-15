CREATE DATABASE IF NOT EXISTS hubla;

CREATE TABLE if not exists `hubla`.`courses` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE if not exists `hubla`.`customers` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `current_credits` float(8,2) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE if not exists `hubla`.`uploads` (
    `id` int NOT NULL AUTO_INCREMENT,
    `datetime` datetime NOT NULL,
    `filename` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE if not exists `hubla`.`users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` text NOT NULL,
    `password` text NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE if not exists `hubla`.`transaction_types` (
    `id` int NOT NULL AUTO_INCREMENT,
    `description` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE if not exists `hubla`.`transactions` (
    `id` int NOT NULL AUTO_INCREMENT,
    `price` varchar(45) NOT NULL,
    `transaction_type_id` int NOT NULL,
    `course_id` int NOT NULL,
    `customer_id` int NOT NULL,
    `upload_id` int NOT NULL,
    `current_credits` float(8,2) NOT NULL,
    `created_at` datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_transactions_1_idx` (`transaction_type_id`),
    KEY `fk_transactions_2_idx` (`course_id`),
    KEY `fk_transactions_3_idx` (`customer_id`),
    KEY `fk_transactions_4_idx` (`upload_id`),
    CONSTRAINT `fk_transactions_1` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_transactions_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_transactions_3` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_transactions_4` FOREIGN KEY (`upload_id`) REFERENCES `uploads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT IGNORE INTO `hubla`.`transaction_types` (`id`,`description`) VALUES (1,'Creator has sold your own course. Should ADD this price in your wallet');
INSERT IGNORE INTO `hubla`.`transaction_types` (`id`,`description`) VALUES (2,'Affiliate has sold some course. Should NOT add as a credit, registered only for consulting.');
INSERT IGNORE INTO `hubla`.`transaction_types` (`id`,`description`) VALUES (3,'Creator paid some commission. Should REMOVE this price from your wallet');
INSERT IGNORE INTO `hubla`.`transaction_types` (`id`,`description`) VALUES (4,'Affilliate received commission. Should ADD credit in your wallet');

INSERT IGNORE INTO `hubla`.`users` (`id`,`username`,`password`) VALUES(1,'hubla@test.com','$2b$06$tPlnb5LpLJxNF9oba.P7B.Ty9rn2vDyGrzDXN0ogo/Hd1Llk6zPeS');
