const CircularProgress = ({percentage, circleWidth}) => {
    const radius = 20
    const dashArray = radius * Math.PI * 2
    const dashOffset = dashArray - (dashArray * percentage) / 100
    return (
      <>
        <div className="">
          <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
            <circle
              cx={circleWidth/2}
              cy={circleWidth/2}
              strokeWidth="3px"
              r={radius}
              className="fill-none stroke-[#ddd]"
            />
            <circle
              cx={circleWidth/2}
              cy={circleWidth/2}
              strokeWidth="3px"
              r={radius}
              className="fill-none stroke-[#E1348B] stroke-line"
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
              }}
              transform={`rotate(-90 ${circleWidth/2} ${circleWidth / 2})`}
            />
            <text x="50%" y="50%" dy="0.3em" textAnchor="middle" className="font-semibold text-white text-xs fill-white">
              {percentage}%
            </text>
            
          </svg>
        </div>
      </>
    );
  };
  
  export default CircularProgress;