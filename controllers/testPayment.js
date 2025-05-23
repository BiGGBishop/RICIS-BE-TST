const axios = require('axios');

async function makePaymentRequest() {
  try {
    const data = JSON.stringify({
      "serviceTypeId": "1",
      "amount": "5000",
      "orderId": "1",
      "payerName": "John Doe",
      "payerEmail": "doe@gmail.com",
      "payerPhone": "09062067384",
      "description": "Payment for Septmeber Fees"
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://remitademo.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'remitaConsumerKey=DEMOMDA1234,remitaConsumerToken='
      },
      data: data
    };

    const response = await axios(config);
    console.log(JSON.stringify(response.data));

  } catch (error) {
    console.error("Payment request failed:", error.message); // Log a more specific error message
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
  }
}

makePaymentRequest();