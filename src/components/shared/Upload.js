import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { imageResize } from "../../modules/imageResize";
import { actionCreators } from "../../redux/modules/alert";
import { actionCreators as imageAction } from "../../redux/modules/image";
import defaultImage from "../../image/shared/defaultImage.svg";

const Upload = () => {
  const dispatch = useDispatch();
  const fileInput = useRef();
  const [preview, setPreview] = useState();

  const image = useSelector((props) => props.image.preview);

  useEffect(() => {
    setPreview(image);
  }, [image]);

  const ImageSelect = () => {
    let file = fileInput.current.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = (e) => {
        dispatch(imageAction.setFile(imageResize(image)));
      };
    };

    reader.onloadend = () => {
      dispatch(imageAction.setPreview(reader.result));
    };
  };
  return (
    <File
      type="file"
      accept=".jpg, .png"
      onChange={ImageSelect}
      ref={fileInput}
      src={preview ? preview : defaultImage}
    />
  );
};

const File = styled.input`
  width: 180px;
  height: 180px;
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
