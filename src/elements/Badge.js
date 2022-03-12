import React from "react";
import styled from "styled-components";

const Badge = ({ src }) => {
  return <BadgeBox src={src} />;
};

const BadgeBox = styled.div`
  width: 15px;
  height: 15px;
  background-image: url("${(props) => props.src}");
`;

export default Badge;
