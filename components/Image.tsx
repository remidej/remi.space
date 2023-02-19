import React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

interface ImageProps extends NextImageProps {}

const Image: React.FC<ImageProps> = (props) => {
  return (
    <>
      <h1>bonjour {props.src}</h1>
      <NextImage layout="fill" {...props} />
    </>
  );
};

export default Image;
