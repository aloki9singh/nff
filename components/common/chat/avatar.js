//verified 1 by Raviraj Kumar
import Image from "next/image";
import React from "react";

function Avatar({ src, alt, height, width }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width || 40}
      height={height || 40}
      className="inline-block relative object-cover object-center !rounded-full aspect-square "
    />
  );
}

export default Avatar;
