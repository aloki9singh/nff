
function handler(req, res) {
  
      const body = req.body;
      console.log("callback") ;
  
  
      try {
          console.log(body);
      } catch (error) {
        // console.log(error);
        res.status(500).json({ msg: "Something went wrong!" });
      }
    }
    
    exports.handler;