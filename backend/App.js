// const express = require("express");
// const bodyParser = require("body-parser");
// const db = require("./db");
// const StaffRouter = require("./routes/staffRouter");
// const BranchRouter = require("./routes/BranchRouter");
// const branchAuditLogRouter = require("./routes/branchAuditLogRouter");
// const TestRouter = require("./routes/testRouter");
// const ValidationRouter = require("./routes/validationRouter");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs"); // Import fs module

// class App {
//   constructor() {
//     this.app = express();
//     this.initializeMiddlewares();
//     this.initializeRoutes();
//     this.initializeErrorHandling();
//   }

//   initializeMiddlewares() {
//     this.app.use(
//       cors({
//         origin: "http://localhost:5173", // Update for production
//         methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//       })
//     );
//     this.app.use(bodyParser.json());
//     this.app.use(bodyParser.urlencoded({ extended: true })); // Form data parsing

//     // Ensure the uploads directory exists inside 'public'
//     const uploadDir = path.join(__dirname, "public/uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     this.app.use("/uploads", express.static(uploadDir));
//   }

//   initializeRoutes() {
//     this.app.use("/api/staffs", StaffRouter);
//     this.app.use("/api/branches", BranchRouter);
//     this.app.use("/api/test", TestRouter);
//     this.app.use("/api/validate", ValidationRouter); // Add validation routes
//     this.app.use("/api/audit-logs", branchAuditLogRouter);
//   }

//   initializeErrorHandling() {
//     this.app.use((err, req, res, next) => {
//       console.error(err.stack);
//       res
//         .status(err.status || 500)
//         .json({ message: err.message || "An unexpected error occurred." });
//     });
//   }

//   async startServer(port) {
//     try {
//       // No need to call db.connect() as db is already using promise-based pool
//       console.log("Connected to database");

//       const PORT = port || process.env.PORT || 3000;
//       this.app.listen(PORT, () => {
//         console.log(`Server started on port ${PORT}`);
//       });
//     } catch (err) {
//       console.error("Error connecting to database:", err);
//     }
//   }
// }

// module.exports = App;

/////////////////////////////////////////////////////////////////////////////
/////////////////////  MULTIPARTY /////////////////////////////////////////
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const StaffRouter = require("./routes/staffRouter");
const BranchRouter = require("./routes/BranchRouter");
const branchAuditLogRouter = require("./routes/branchAuditLogRouter");
const TestRouter = require("./routes/testRouter");
const ValidationRouter = require("./routes/validationRouter");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  initializeMiddlewares() {
    this.app.use(
      cors({
        origin: "http://localhost:5173", // Update for production
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(bodyParser.json({ limit: "10mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

    // Ensure the uploads directory exists inside 'public'
    const uploadDir = path.join(__dirname, "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    this.app.use("/uploads", express.static(uploadDir));
  }

  initializeRoutes() {
    this.app.use("/api/staffs", StaffRouter);
    this.app.use("/api/branches", BranchRouter);
    this.app.use("/api/test", TestRouter);
    this.app.use("/api/validate", ValidationRouter); // Add validation routes
    this.app.use("/api/audit-logs", branchAuditLogRouter);
  }

  initializeErrorHandling() {
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res
        .status(err.status || 500)
        .json({ message: err.message || "An unexpected error occurred." });
    });
  }

  async startServer(port) {
    try {
      console.log("Connected to database");

      const PORT = port || process.env.PORT || 3000;
      this.app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    } catch (err) {
      console.error("Error connecting to database:", err);
    }
  }
}

module.exports = App;
