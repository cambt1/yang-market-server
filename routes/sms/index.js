var router = require("express").Router();
// var service = require("./sms.service");
var CryptoJS = require("crypto-js");
var request = require("request");

router.get("/:phone", (req, res) => {
  const paramObj = req.params;
  send_message(paramObj.phone);
  res.send("complete!");

  function send_message(phone) {
    var user_phone_number = phone; //수신 전화번호 기입
    var resultCode = 404;
    const date = Date.now().toString();
    const uri = "ncp:sms:kr:285916526299:testapp"; //서비스 ID
    const secretKey = "m1u7MJJJRjClKy0Huqi3R0uIKJtjOUm9cntkMhpB"; // Secret Key
    const accessKey = "a65Z5zQB5rFnObIKuL5y"; //Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    request(
      {
        method: method,
        json: true,
        uri: url,
        headers: {
          "Contenc-type": "application/json; charset=utf-8",
          "x-ncp-iam-access-key": accessKey,
          "x-ncp-apigw-timestamp": date,
          "x-ncp-apigw-signature-v2": signature,
        },
        body: {
          type: "SMS",
          countryCode: "82",
          from: "01022976875",
          content: "test",
          messages: [
            {
              to: `${user_phone_number}`,
            },
          ],
        },
      },
      function (err, res, html) {
        if (err) console.log(err);
        else {
          resultCode = 200;
          console.log(html);
        }
      }
    );
    return resultCode;
  }
});

module.exports = router;
