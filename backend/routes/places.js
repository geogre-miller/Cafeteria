const express = require("express");
const Place = require("../models/Place");
const { p } = require("framer-motion/client");

const router = express.Router();

// ✅ API GET: Lấy danh sách tất cả địa điểm
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách địa điểm" });
  }
});

// ✅ API POST: Thêm địa điểm mới
router.post("/", (req, res) => {
  const newPlace = new Place(req.body);

  newPlace
    .save()
    .then((savedPlace) => {
      res.status(201).json(savedPlace);
    })
    .catch((error) => {
      res.status(400).json({ error: "Lỗi khi thêm địa điểm" });
    });
});

// router.post("/", async (req, res) =>{
//   try {
//     const { name, address, category, imageUrl } = req.body;
//     const newPlace = new Place({
//       name,
//       address,
//       category,
//       imageUrl,
//     });
//     await newPlace.save();
//     res.status(201).json(newPlace);
//   } catch (error) {
//     res.status(400).json({ error: "Lỗi khi thêm địa điểm" });
//   }
// })

router.post("/", (req, res) => {
  const newPlace = new Place(req.body);

  newPlace
    .save()
    .then((savedPlace) => {
      res.status(201).json(savedPlace);
    })
    .catch((error) => {
      res.status(400).json({ error: "Lỗi khi thêm địa điểm" });
    });
});

// ✅ API DELETE: Xóa địa điểm theo ID
router.delete("/:id", async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: "Địa điểm đã được xóa" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa địa điểm" });
  }
});

module.exports = router;
