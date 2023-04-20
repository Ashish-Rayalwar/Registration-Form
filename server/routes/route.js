const userSchema = require("../Models/userSchema");

const router = require("express").Router();

router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const create = await userSchema.create(data);
    return res.status(201).json({ data: create });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/students", async (req, res) => {
  try {
    const data = await userSchema.find();
    return res.status(201).json({ data: data });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
