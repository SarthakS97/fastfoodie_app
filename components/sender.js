// const express = require('express')

// const app = express()

// app.set('json spaces', 4)

const makeRequest = require('./utilities').makeRequest;

// app.listen(3000)

// app.get('/country', async(req, res) => {

//     try {
//         const body = {
//           amount: 100,
//           complete_payment_url: 'http://example.com/complete',
//           country: 'SG',
//           currency: 'SGD',
//         };
//         const result = await makeRequest('POST', '/v1/checkout', body);
    
//         res.json(result);
//       } catch (error) {
//         res.json(error);
//       }
// }
// )


async function main() {
  try {
    const result = await makeRequest(
      'GET',
      '/v1/payouts/supported_types?category=bank&beneficiary_country=PH&payout_currency=PHP'
    );
    console.log(result);
  } catch (error) {
    console.error('Error completing request', error);
  }
}

main()