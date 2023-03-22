const PaytmChecksum = require('./PaytmChecksum');
const https = require('https')
export async function POST(request) {
  const requestRes = await request.json()
  const { oid, custId, amount, email, firstName, lastName, mobile } = requestRes;
  console.log(requestRes);

  var paytmParams = {};

  paytmParams.body = {
    "requestType": "Payment",
    "mid": process.env.NEXT_PUBLIC_MID,
    "websiteName": "DEFAULT",
    "orderId": oid,
    "callbackUrl": process.env.NEXT_PUBLIC_PAYTMCALLBACK,
    "txnAmount": {
      "value": amount,
      "currency": "INR",
    },
    "userInfo": {
      "custId": custId,
      "email": email,
      "firstName": firstName,
      "lastName": lastName,
      "mobile": mobile,
    },
  };

  const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_MKEY)
    .then(async function (checksum) {
      return checksum;
    })

  paytmParams.head = {
    "signature": checksum
  };

  var post_data = JSON.stringify(paytmParams);

  var options = {
    /* for Staging */
    // hostname: 'securegw-stage.paytm.in',
    /* for Production */
    hostname: 'securegw.paytm.in',
    port: 443,
    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_MID}&orderId=${oid}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': post_data.length
    }
  };
  try {
    const data = await new Promise((resolve, reject) => {
      var response = "";
      try {
        var post_req = https.request(options, function (post_res) {
          post_res.on('data', function (chunk) {
            response += chunk;
          });

          post_res.on('end', function () {
            resolve(response)
            // console.log('Response: ', response);
          });
        });

        post_req.write(post_data);
        post_req.end();
      } catch (error) {
        reject(error)
      }
    })
    return new Response(data)
  } catch (error) {
    return new Response(error)
  }
}
