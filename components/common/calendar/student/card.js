//verified 1 by Raviraj Kumar
let Card = ({ cardData }) => {
    return (
      <div className="border-l-8  rounded-lg ">
        <div style={{ background: "#A145CDBF" }} className="w-fit px-6 py-3">
          <p>
            {cardData.AddTitle} - ({cardData.AddBatch})
          </p>
          <p>
            {cardData.Starttime}-{cardData.Endtime}
          </p>
        </div>
      </div>
    );
  };
  
  export default Card;
  