const models = require("../../models");
const request = require("request");
const convert = require("xml-js");

exports.index = (req, res) => {
  getInfoAPI()
    .then((result) => {
      console.log("apiresult: ", result);
      return result;
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};
var getInfoAPI = () =>
  new Promise((resolve, reject) => {
    let url =
      "http://openapi.jeonju.go.kr/rest/jeonjufood/getFoodImgList?authApiKey=" +
      "Mg4OEQr5McoDMrCZw6hLAuqS1Bzitr5PVoHGtrFa1%2Bng48mYiiCaGD0A01CCJUobDS9ptNevXZrtJofAwC989w%3D%3D" +
      "&foodUid=ff8080813703462a013711b5bd4104cf";
    request.get(encodeURI(url), (err, resp) => {
      if (!err) {
        let result = resp.body;
        console.log("result: ", result);
        let converted = convert.xml2json(result, {
          compact: true,
          spaces: 4,
        });
        console.log("converted: ", converted);
        let parsed = JSON.parse(converted);
        console.log("parsed: ", parsed);
        if (parsed.response === undefined) {
          reject("undefined");
        } else {
          let data = parsed.response.body;
          console.log("data: ", data);
        }
      } else {
        console.error(err);
        reject(err);
      }
    });
  });
