import React from "react";

import Header from "../shared/Header";

import { MemberInfo } from "../data/member";
import github from "../image/member/github.png";
import blog from "../image/member/blog.png";

import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";
import styled from "styled-components";
import Container from "../elements/Container";

function ProjectMember() {
  return (
    <>
      <Header page="개발멤버" />
      <Container Xfooter>
        <FlexGrid is_column gap="16px" padding="24px" center>
          <Text size="headline2" weight="medium" color="orange">
            DALK 멤버들을 소개합니다!
          </Text>

          {MemberInfo.map((member, idx) => {
            return (
              <FlexGrid is_flex gap="10px" key={idx} center>
                <MemberImg src={member.img} alt="memberimg" />

                <FlexGrid is_column gap="0">
                  <Text size="subtitle1" weight="medium">
                    {member.name}
                  </Text>
                  <Text size="body2" weight="medium">
                    {member.position}
                  </Text>
                  <Text size="body1">{member.content}</Text>
                  <FlexGrid is_flex gap="6px">
                    {member.github === null ? null : (
                      <a href={member.github} target="#">
                        <ContactImg src={github} />
                      </a>
                    )}
                    {member.blog === null ? null : (
                      <a href={member.blog} target="#">
                        <ContactImg src={blog} />
                      </a>
                    )}
                  </FlexGrid>
                  <Text>Contact : {member.email}</Text>
                </FlexGrid>
              </FlexGrid>
            );
          })}

          <FlexGrid is_column gap="0" center>
            <Text> DALK PROJECT GITHUB </Text>
            <FlexGrid is_flex center>
              <a
                href="https://github.com/jeonhaekang/dalk_debateTalk"
                target="#"
              >
                <Text color="orange" cursor="pointer">
                  FrontEnd
                </Text>
              </a>
              <a href="https://github.com/raddaslul/dalk.git" target="#">
                <Text color="orange" cursor="pointer">
                  BackEnd
                </Text>
              </a>
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>
      </Container>
    </>
  );
}

const MemberImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 10px;
`;

const ContactImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default ProjectMember;
