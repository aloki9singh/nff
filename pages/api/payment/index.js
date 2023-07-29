async function handler(req, res) {
    const { method } = req;
    try {
            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                  'X-VERIFY': 'bb865e6c6b4fd565d4ff604b7cea8f2bbdc01be7f9ca20f4050b5b1962161a95###1'
                },
                body: JSON.stringify({
                  request: 'ewogICJtZXJjaGFudElkIjogIlBHVEVTVFBBWVVBVCIsCiAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICJNVDc4NTA1OTAwNjgxODgxNzgiLAogICJtZXJjaGFudFVzZXJJZCI6ICJNVUlENDAzIiwKICAiYW1vdW50IjogMTAwLAogICJyZWRpcmVjdFVybCI6ICJodHRwczovL3dlYmhvb2suc2l0ZS9yZWRpcmVjdC11cmwiLAogICJyZWRpcmVjdE1vZGUiOiAiUE9TVCIsCiAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL2NhbGxiYWNrLXVybCIsCiAgIm1vYmlsZU51bWJlciI6ICI5OTk5OTk5OTk5IiwKICAicGF5bWVudEluc3RydW1lbnQiOiB7CiAgICAidHlwZSI6ICJQQVlfUEFHRSIKICB9Cn0='
                })
              };
        
              
              fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', options)
                .then(response => response.json())
                .then(response => {
                    res.status(200).json(response)
                    // window.location.href =  response.data.instrumentResponse.redirectInfo.url;
                })
                .catch(err => console.error(err));

    } catch (error) {
      // console.log(error);
      res.status(500).json({ msg: "Something went wrong!" });
    }
  }
  
  export default handler;