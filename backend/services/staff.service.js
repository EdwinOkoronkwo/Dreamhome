const db = require("../db");

class StaffService {
  static async getAllStaffs() {
    try {
      const [rows, fields] = await db.query("SELECT * FROM dh_staff");
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async getStaffById(staffno) {
    try {
      const [rows, fields] = await db.query(
        "SELECT * FROM dh_staff WHERE staffno = ?",
        [staffno]
      );
      if (rows.length === 0) {
        throw new Error(`No staff with staffno ${staffno}`);
      }
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async deleteStaff(staffno) {
    try {
      const [result] = await db.query(
        "DELETE FROM dh_staff WHERE staffno = ?",
        [staffno]
      );
      if (result.affectedRows === 0) {
        throw new Error(`No staff with staffno ${staffno}`);
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async addOrUpdateStaff(staffData) {
    try {
      const {
        staffno,
        fname,
        lname,
        position,
        sex,
        dob,
        salary,
        branchno,
        telephone,
        mobile,
        email,
        image,
      } = staffData;

      const [result] = await db.query(
        "CALL sp_staff_add_or_edit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          staffno,
          fname,
          lname,
          position,
          sex,
          dob,
          salary,
          branchno,
          telephone,
          mobile,
          email,
          image,
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StaffService;
