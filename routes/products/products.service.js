const models = require("../../models");

exports.index = (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: [
      "id",
      "name",
      "price",
      "createdAt",
      "seller",
      "imageUrl",
      "soldout",
    ],
  })
    .then((result) => {
      console.log("PRODUCTS : ", result);
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러 발생");
    });
};

exports.showDetailPage = (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({ where: { id } })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 조회에 에러가 발생했습니다");
    });
};

exports.create = (req, res) => {
  const body = req.body;
  const { name, description, price, seller, imageUrl } = body;
  //방어코드
  if (!name || !description || !price || !seller || !imageUrl) {
    res.status(400).send("모든 필드를 입력해주세요");
  }
  models.Product.create({
    name,
    description,
    price,
    seller,
    imageUrl,
  })
    .then((result) => {
      console.log("상품 생성 결과 : ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품 업로드에 문제가 발생했습니다");
    });
};

exports.purchase = (req, res) => {
  const id = req.params.id;
  models.Product.update(
    { soldout: 1 },
    {
      where: {
        id,
      },
    }
  )
    .then((result) => {
      res.send({ result: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다");
    });
};
