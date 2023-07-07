//verified 1 by Raviraj Kumar
let mentorcalendarcard = ({ cardData, id }) => {
  return (
    <div className="border-l-8  rounded-lg ">
      <div
        style={{ background: `${cardData.defaultRadio}` }}
        className="w-fit px-6 py-3"
      >
        <p>
          {cardData.addTitle} - ({cardData.addBatch})
        </p>
        <p>
          {cardData.startTime}-{cardData.endTime}
        </p>
      </div>
    </div>
  );
};

export default mentorcalendarcard;
