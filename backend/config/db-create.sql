CREATE TABLE IF NOT EXISTS users (
  `UID` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(50) NOT NULL,
  `lastname` VARCHAR(50) NOT NULL,
  `img_profile` VARCHAR(255) DEFAULT 'default_profile_img.jpg',
  `is_admin` TINYINT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`UID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
  ) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS posts (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `content` TEXT,
    `post_image` VARCHAR(255),
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    INDEX `UID_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `fk_user_id_post`
    FOREIGN KEY (`user_id`)
    REFERENCES users (`UID`)
    ON DELETE CASCADE
    ) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comments (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  INDEX `fk_user_id_comment_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_post_id_comment_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_id_comment`
    FOREIGN KEY (`user_id`)
    REFERENCES users (`UID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_id_comment`
    FOREIGN KEY (`post_id`)
    REFERENCES posts (`ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
    ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS feelings (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `like` BOOLEAN NOT NULL,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  INDEX `fk_user_id_feeling_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_post_id_feeling_idx` (`post_id` ASC) VISIBLE,
  UNIQUE INDEX `unique_feeling` (`user_id` ASC, `post_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_id_feeling`
    FOREIGN KEY (`user_id`)
    REFERENCES users (`UID`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_post_id_feeling`
    FOREIGN KEY (`post_id`)
    REFERENCES posts (`ID`)
    ON DELETE CASCADE
    ) ENGINE=InnoDB;
