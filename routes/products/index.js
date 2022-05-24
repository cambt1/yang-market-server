var router = require("express").Router();
var service = require("./products.service");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

router.get("/", service.index);
router.get("/:id", service.showDetailPage);

router.post("/", service.create);
router.post("/purchase/:id", service.purchase);

//이미지 파일을 하나만 처리할 때는 single() -> 이 때 사용하는 키를 image로 하겠다
router.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
});

module.exports = router;
