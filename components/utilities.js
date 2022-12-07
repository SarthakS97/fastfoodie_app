import nodejs from 'nodejs-mobile-react-native';



const https = nodejs.require('https');
const crypto = nodejs.require('crypto');
const secretKey = "f9e92f3b9d50a544f71488cde4b7cd336e4e5236c5ad86c1ecd486c044b10784aee090a926743972";
const accessKey = "E97FADB92392ADC3C5CD";
const log = false;

async function makeRequest(method, urlPath, body = null) {

  try {
    httpMethod = method;
    httpBaseURL = "sandboxapi.rapyd.net";
    httpURLPath = urlPath;
    salt = generateRandomString(8);
    idempotency = new Date().getTime().toString();
    timestamp = Math.round(new Date().getTime() / 1000);
    signature = sign(httpMethod, httpURLPath, salt, timestamp, body)

    const options = {
      hostname: httpBaseURL,
      port: 443,
      path: httpURLPath,
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
        salt: salt,
        timestamp: timestamp,
        signature: signature,
        access_key: accessKey,
        idempotency: idempotency
      }
    }

    return await httpRequest(options, body, log);
  }
  catch (error) {
    console.error("Error generating request options");
    throw error;
  }
}

function sign(method, urlPath, salt, timestamp, body) {

  try {
    let bodyString = "";
    if (body) {
      bodyString = JSON.stringify(body);
      bodyString = bodyString == "{}" ? "" : bodyString;
    }

    let toSign = method.toLowerCase() + urlPath + salt + timestamp + accessKey + secretKey + bodyString;
    log && console.log(`toSign: ${toSign}`);

    let hash = crypto.createHmac('sha256', secretKey);
    hash.update(toSign);
    const signature = Buffer.from(hash.digest("hex")).toString("base64")
    log && console.log(`signature: ${signature}`);

    return signature;
  }
  catch (error) {
    console.error("Error generating signature");
    throw error;
  }
}

function generateRandomString(size) {
  try {
    return crypto.randomBytes(size).toString('hex');
  }
  catch (error) {
    console.error("Error generating salt");
    throw error;
  }
}

async function httpRequest(options, body) {

  return new Promise((resolve, reject) => {

    try {

      let bodyString = "";
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString == "{}" ? "" : bodyString;
      }

      log && console.log(`httpRequest options: ${JSON.stringify(options)}`);
      const req = https.request(options, (res) => {
        let response = {
          statusCode: res.statusCode,
          headers: res.headers,
          body: ''
        };

        res.on('data', (data) => {
          response.body += data;
        });

        res.on('end', () => {

          response.body = response.body ? JSON.parse(response.body) : {}
          log && console.log(`httpRequest response: ${JSON.stringify(response)}`);

          if (response.statusCode !== 200) {
            return reject(response);
          }

          return resolve(response);
        });
      })

      req.on('error', (error) => {
        return reject(error);
      })

      req.write(bodyString)
      req.end();
    }
    catch (err) {
      return reject(err);
    }
  })

}

exports.makeRequest = makeRequest;