import express from "express";
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /auth/login",
  });
});
// const app = express();

// router.get("/login", (req, res) => {});

// router.get("/forgot", (req, res) => {});

// router.get("/register", (req, res) => {});

// export default router;

module.exports = router;
