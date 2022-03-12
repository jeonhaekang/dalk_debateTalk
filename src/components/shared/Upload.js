import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
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

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageAction.setPreview(reader.result));
    };

    dispatch(imageAction.setFile(file));
  };
  return (
    <>
      <File type="file" onChange={select} ref={fileInput} src={preview} />
    </>
  );
};

const File = styled.input`
  width: 100px;
  height: 100px;
  border-radius: 30px;
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-size: cover;
  ::-webkit-file-upload-button {
    display: none;
  }
  font-size: 0;
  border: 2px solid black;
`;

export default Upload;
