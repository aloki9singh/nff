//verified 1 by Raviraj Kumar
import Image from "next/image";
import React from "react";

function Avatar({ src, alt, height = 40, width = 40 }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={100}
      height={100}
      style={{
        width: width,
        height: height
      }}
      className="inline-block relative object-cover object-center !rounded-full aspect-square"
    />
  );
}

export default Avatar;
