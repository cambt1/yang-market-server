const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const ejsLocals = require("ejs-locals");
const models = require("./models");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
//모든 브라우저에서 내 서버에 요청 가능
app.use(cors());
app.use("/uploads", express.static("uploads"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsLocals);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

require("./routes/index")(app);

app.listen(port, () => {
  console.log(`${port} 서버 실행중`);
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB 연결 에러");
      process.exit();
    });
});

//app.use(미들웨어) : 위에서 아래로 순서대로 실행, req,res,next가 매개변수인 함수, next()로 다음 미들웨어로 넘어감
//에러 처리 미들웨어
// 404 에러 내용부분만 만들어서 최종 처리를 에러 미들웨에 보낸다.
app.use((err, req, res, next) => {
  console.log(err);
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message; // 템플릿 엔진 변수 설정
  // 즉, 개발환경이면 err를 출력하고 아니면 출력안하는 설정
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
