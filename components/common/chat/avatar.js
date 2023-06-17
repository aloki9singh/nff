import Image from "next/image";
import React from "react";

function Avatar({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="inline-block relative object-cover object-center !rounded-full w-10 h-10 "
    />
  );
}

export default chatavatar;
