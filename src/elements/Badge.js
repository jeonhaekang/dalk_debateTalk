import React from "react";
import styled from "styled-components";

const Badge = ({ src }) => {
  return <BadgeBox src={src} />;
};

const BadgeBox = styled.img`
  width: 25px;
`;

export default Badge;
