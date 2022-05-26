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
//라우터 순서를 여기다 안두면 에러남? 쿼리문 이상해짐
router.get("/sort", service.sort);

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
