
function handler(req, res) {
  
      const body =(req.body);
      console.log("callback") ;
      // const body = atob(req.bod.checksum);
  
  
      try {
        const amount = body.amount;
        const prividerRefId = body.prividerReferenceId;
        const transactionId = body.transactionId;
        const result = body.code;
        let timeExtension;

        if(amount == 29900){
          timeExtension = new Date(new Date() + 30 * 24 * 60 * 60 * 1000);

        }


        else if(amount == 89900){
          timeExtension = new Date(new Date() + 6 * 30 * 24 * 60 * 60 * 1000);

        }

        else if(amount == 359900){
          timeExtension = new Date(new Date() + 6 * 30 * 24 * 60 * 60 * 1000);

        }

        console.log(timeExtension);
      } catch (error) {
        // console.log(error);
        res.status(500).json({ msg: "Something went wrong!" });
      }
    }


    export default handler;