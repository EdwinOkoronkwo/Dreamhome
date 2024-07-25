const StaffService = require("../services/staff.service");

class StaffController {
  static async getAllStaffs(req, res, next) {
    try {
      let staffs = await StaffService.getAllStaffs();

      if (req.query.search) {
        staffs = staffs.filter((staff) =>
          `${staff.fname} ${staff.lname} ${staff.position}`
            .toLowerCase()
            .includes(req.query.search.toLowerCase())
        );
      }

      if (req.query.max) {
        staffs = staffs.slice(0, Number(req.query.max));
      }

      res.json({ staffs });
    } catch (error) {
      next(error);
    }
  }

  static async getStaffById(req, res, next) {
    const { staffno } = req.params;
    try {
      const staff = await StaffService.getStaffById(staffno);
      if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
      }
      res.json({ staff });
    } catch (error) {
      next(error);
    }
  }

  static async deleteStaff(req, res, next) {
    const { staffno } = req.params;
    try {
      await StaffService.deleteStaff(staffno);
      res.json({ message: "Staff deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async addOrUpdateStaff(req, res, next) {
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
    } = req.body;
    let imageUrl = req.file ? `/uploads/staff/${req.file.filename}` : null;

    try {
      const staffData = {
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
        image: imageUrl,
      };
      await StaffService.addOrUpdateStaff(staffData);
      res.status(201).json({
        message: "Staff created/updated successfully",
        staff: staffData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StaffController;
