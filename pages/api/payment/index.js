function encodeToBase64(str) {
  return btoa(str);
}

const generateTransactionId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 9999999); // You can adjust the range as needed
  return `TXN${timestamp}${randomNum}`;
};

async function sha256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}


async function handler(req, res) {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const merchantId = process.env.NEXT_MERCHANT_ID;
  const saltKey = process.env.NEXT_SALT_KEY;
  const transactionId = generateTransactionId();
  const payUri = process.env.NEXT_PROD_PAY_URL;

    const body = JSON.parse(req.body);
    const paymentData =
    {
    "merchantId": merchantId,
    "merchantTransactionId": transactionId,
    "merchantUserId": transactionId+"1",
    "amount": body.price,
    "redirectUrl": baseUrl + `/api/payment/serverToServer?param1=${body.useruid}`,
    "redirectMode": "GET",
    "callbackUrl": "",
    "mobileNumber": "8969917408",
    "paymentInstrument": {
      "type": "PAY_PAGE"
    }
  }


    const encodedData = encodeToBase64(JSON.stringify(paymentData));
    const shaFormula = encodedData+"/pg/v1/pay"+saltKey;
    const shaData = await sha256(shaFormula);
    const shaVerify = shaData+"###1";



    try {
            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                  'X-VERIFY': shaVerify,
                },
                body: JSON.stringify({
                  request: encodedData

                })
              };
        
              
              fetch(payUri, options)
                .then(response => response.json())
                .then(response => {
                    res.status(200).json(response)
                })
                .catch(err => console.error(err));

    } catch (error) {
      // console.log(error);
      res.status(500).json({ msg: "Something went wrong!"+error });
    }
  }


export default handler;