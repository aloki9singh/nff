
function encodeToBase64(str) {
  return btoa(str);
}

async function sha256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function handler(req, res) {

    const body = JSON.parse(req.body);

    const paymentData =
  {
    "merchantId": "PROVOKEONLINE",
    "merchantTransactionId": "MTST50590068188178",
    "merchantUserId": "MUID409",
    "amount": body.price,
    "redirectUrl": "http://localhost:3000/beta/payment",
    "redirectMode": "GET",
    "callbackUrl": "http://localhost:3000/api/payment/serverToServer",
    "mobileNumber": "9999999999",
    "paymentInstrument": {
      "type": "PAY_PAGE"
    }
  }

  const saltKey = "dfa46632-ebc7-4494-aae1-9ef522083b98"

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
        
              
              fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', options)
                .then(response => response.json())
                .then(response => {
                    res.status(200).json(response)

                })
                .catch(err => console.error(err));

    } catch (error) {
      // console.log(error);
      res.status(500).json({ msg: "Something went wrong!" });
    }
  }
  
  export default handler;