const express = require("express");
const users = require("../model/schema");
const router = express.Router();

// router.get('/',(req,res)=>{
//     console.log(`connect`)
// })

router.post("/form", async (req, res) => {
  // console.log(req.body)
  const { name, email, age, mobile, work, add, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !add || !desc) {
    res.status(422).json("Please fill the info!");
  }

  try {
    const preUser = await users.findOne({ email: email });
    console.log(preUser);

    if (preUser) {
      res.status(422).json(`this user is aleardy exist!`);
    } else {
      const addUser = new users({
        // _id: new mongoose.Types.ObjectId(),
        name,
        email,
        age,
        mobile,
        work,
        add,
        desc,
      });
      await addUser.save();
      res.status(201).json(addUser);
      console.log(addUser);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getdata", async (req, res) => {
  try {
    const userData = await users.find();
    res.status(201).json(userData);
    // console.log(userData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const userIndividual = await users.findById({ _id: id });
    // console.log(userIndividual);
    res.status(201).json(userIndividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateUser = await users.findByIdAndUpdate(id,req.body, {
      new: true,
    });

    console.log(updateUser);
    res.status(201).json(updateUser);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.delete('/deleteuser/:id',async(req,res)=>{
  try {
    const { id } = req.params;

    const deleteuser = await users.findByIdAndDelete({_id:id})

    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (err) {
console.log('error')  }
})

module.exports = router;
