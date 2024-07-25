const mysql = require("mysql2/promise");

async function executeSQLCommands() {
  const sqlCommands = `
  -- Drop existing functions if they exist
  DROP FUNCTION IF EXISTS isValidText;
  DROP FUNCTION IF EXISTS isValidPostcode;
  DROP FUNCTION IF EXISTS isValidDate;
  DROP FUNCTION IF EXISTS isValidImage;

  -- Create functions
  DELIMITER $$

  CREATE FUNCTION isValidText(text VARCHAR(255)) 
  RETURNS BOOLEAN
  DETERMINISTIC
  NO SQL
  BEGIN
      RETURN text IS NOT NULL AND LENGTH(TRIM(text)) > 0;
  END$$

  CREATE FUNCTION isValidPostcode(postcode VARCHAR(10)) 
  RETURNS BOOLEAN
  DETERMINISTIC
  NO SQL
  BEGIN
      RETURN postcode REGEXP '^[A-Z]{1,2}[0-9A-Z]?[0-9][A-Z]{2}$';
  END$$

  CREATE FUNCTION isValidDate(date DATE) 
  RETURNS BOOLEAN
  DETERMINISTIC
  NO SQL
  BEGIN
      RETURN date IS NOT NULL;
  END$$

  CREATE FUNCTION isValidImage(url VARCHAR(255)) 
  RETURNS BOOLEAN
  DETERMINISTIC
  NO SQL
  BEGIN
      RETURN url REGEXP '\\.(jpg|jpeg|png|gif)$';
  END$$

  DELIMITER ;

  -- Create a stored procedure to add or update a branch
  DROP PROCEDURE IF EXISTS sp_branch_add_or_edit;
  DELIMITER $$

  CREATE PROCEDURE sp_branch_add_or_edit(
    IN p_branchno VARCHAR(50), 
    IN p_street VARCHAR(50), 
    IN p_city VARCHAR(50), 
    IN p_postcode VARCHAR(50), 
    IN p_image VARCHAR(255)
  )
  BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      -- Handle the exception here
      ROLLBACK;
      SELECT 'An error occurred while adding/updating the branch.' AS ErrorMessage;
    END;

    START TRANSACTION;

    INSERT INTO dh_branch (branchno, street, city, postcode, image)
    VALUES (p_branchno, p_street, p_city, p_postcode, p_image)
    ON DUPLICATE KEY UPDATE
      street = VALUES(street),
      city = VALUES(city),
      postcode = VALUES(postcode),
      image = VALUES(image);

    COMMIT;
  END$$

  DELIMITER ;

  -- Create a stored procedure to delete a branch
  DROP PROCEDURE IF EXISTS sp_delete_branch;
  DELIMITER $$

  CREATE PROCEDURE sp_delete_branch(
    IN p_branchno VARCHAR(50)
  )
  BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      -- Handle the exception here
      ROLLBACK;
      SELECT 'An error occurred while deleting the branch.' AS ErrorMessage;
    END;

    START TRANSACTION;

    DELETE FROM dh_branch WHERE branchno = p_branchno;

    COMMIT;
  END$$

  DELIMITER ;

  -- Create a trigger to validate data before inserting into the table
  DROP TRIGGER IF EXISTS beforeBranchInsert;
  DELIMITER $$

  CREATE TRIGGER beforeBranchInsert
  BEFORE INSERT ON dh_branch
  FOR EACH ROW
  BEGIN
    IF NOT isValidText(NEW.street) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid street';
    END IF;

    IF NOT isValidText(NEW.city) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid city';
    END IF;

    IF NOT isValidPostcode(NEW.postcode) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid postcode';
    END IF;

    IF NOT isValidImage(NEW.image) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid image URL';
    END IF;
  END$$

  DELIMITER ;

  -- Create a trigger to validate data before updating the table
  DROP TRIGGER IF EXISTS beforeBranchUpdate;
  DELIMITER $$

  CREATE TRIGGER beforeBranchUpdate
  BEFORE UPDATE ON dh_branch
  FOR EACH ROW
  BEGIN
    IF NOT isValidText(NEW.street) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid street';
    END IF;

    IF NOT isValidText(NEW.city) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid city';
    END IF;

    IF NOT isValidPostcode(NEW.postcode) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid postcode';
    END IF;

    IF NOT isValidImage(NEW.image) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid image URL';
    END IF;
  END$$

  DELIMITER ;

  -- Create the logging table
  CREATE TABLE IF NOT EXISTS branch_audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(10),
    branchno VARCHAR(50),
    street VARCHAR(50),
    city VARCHAR(50),
    postcode VARCHAR(50),
    image VARCHAR(255),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(255)
  );

  -- Trigger for INSERT operation
  DROP TRIGGER IF EXISTS afterBranchInsert;
  DELIMITER $$

  CREATE TRIGGER afterBranchInsert
  AFTER INSERT ON dh_branch
  FOR EACH ROW
  BEGIN
    INSERT INTO branch_audit_log (action, branchno, street, city, postcode, image, changed_by)
    VALUES ('INSERT', NEW.branchno, NEW.street, NEW.city, NEW.postcode, NEW.image, USER());
  END$$

  -- Trigger for UPDATE operation
  DROP TRIGGER IF EXISTS afterBranchUpdate;
  DELIMITER $$

  CREATE TRIGGER afterBranchUpdate
  AFTER UPDATE ON dh_branch
  FOR EACH ROW
  BEGIN
    INSERT INTO branch_audit_log (action, branchno, street, city, postcode, image, changed_by)
    VALUES ('UPDATE', NEW.branchno, NEW.street, NEW.city, NEW.postcode, NEW.image, USER());
  END$$

  -- Trigger for DELETE operation
  DROP TRIGGER IF EXISTS afterBranchDelete;
  DELIMITER $$

  CREATE TRIGGER afterBranchDelete
  AFTER DELETE ON dh_branch
  FOR EACH ROW
  BEGIN
    INSERT INTO branch_audit_log (action, branchno, street, city, postcode, image, changed_by)
    VALUES ('DELETE', OLD.branchno, OLD.street, OLD.city, OLD.postcode, OLD.image, USER());
  END$$

  DELIMITER ;
  `;

  const connectionConfig = {
    host: "localhost",
    user: "your-username",
    password: "your-password",
    database: "your-database",
  };

  let connection;

  try {
    connection = await mysql.createConnection(connectionConfig);
    await connection.query(sqlCommands);
    console.log("SQL commands executed successfully.");
  } catch (error) {
    console.error("Error executing SQL commands:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

executeSQLCommands();
