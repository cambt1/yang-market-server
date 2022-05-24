const models = require("../../models");

exports.index = (req, res) => {
  models.Banner.findAll({
    limit: 2,
  })
    .then((result) => {
      res.send({
        banners: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다.");
    });
};

exports.create = (req, res) => {
  const { imageUrl, href } = req.body;
  if (!imageUrl || !href) {
    res.status(400).send("모든 필드를 입력해주세요");
  }
  models.Banner.create({ imageUrl, href })
    .then((result) => {
      console.log("상품 생성 결과 :", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 업로드에 문제가 발생");
    });
};
