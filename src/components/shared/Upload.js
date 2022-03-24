import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { imageResize } from "../../modules/imageResize";
import { actionCreators } from "../../redux/modules/alert";
import { actionCreators as imageAction } from "../../redux/modules/image";

const Upload = () => {
  const dispatch = useDispatch();
  const fileInput = useRef();
  const [preview, setPreview] = useState();

  const image = useSelector((props) => props.image.image.preview);

  useEffect(() => {
    setPreview(image);
  }, [image]);

  const select = () => {
    const reader = new FileReader();
    let file = fileInput.current.files[0];

    if (file.name.length > 20) {
      dispatch(actionCreators.open({ message: "파일명이 너무 깁니다." }));
      return;
    }

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = (e) => {
        const test = imageResize(image);
        // dispatch(imageAction.setFile(test));
        // dispatch(imageAction.setPreview(test));
        console.log("uploadJS:", test);
      };
    };

    reader.onloadend = () => {
      dispatch(imageAction.setPreview(reader.result));
    };

    dispatch(imageAction.setFile(file));
  };
  return (
    <>
      <File
        type="file"
        accept=".gif, .jpg, .png"
        onChange={select}
        ref={fileInput}
        src={preview}
      />
    </>
  );
};

const File = styled.input`
  width: 250px;
  height: 250px;
  border-radius: 15px;
  background-color: #f3f3f3;
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-size: cover;
  ::-webkit-file-upload-button {
    display: none;
  }
  font-size: 0;
`;

export default Upload;
