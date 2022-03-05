import React from "react";
import styled from "styled-components";

const Convenience = () => {

    return (
        <>
            <Title>토론 속 편의기능</Title>
            <Wrap>
                <ContentTop>
                    <div>유저랭킹</div>
                    <div> > </div>
                </ContentTop>
                <Content>
                    <div>토론리스트</div>
                    <div> > </div>
                </Content>
                <Content>
                    <div>토론결과방</div>
                    <div> > </div>
                </Content>
                <Content>
                    <div>토론 즐기는 방법</div>
                    <div> > </div>
                </Content>
            </Wrap>
        </>
    )
}

const Title = styled.div`
    padding: 24px 16px;
    font-size: 24px;
    font-weight: bold;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`

const ContentTop = styled.div`
    font-size: 20px;
    color: #686868;
    display: flex;
    justify-content: space-between;
    padding: 18px 20px;
    border-top: 1px solid #C4C4C4;
    border-bottom: 1px solid #C4C4C4;
`

const Content = styled.div`
  font-size: 20px;
  color: #686868;
  display: flex;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #C4C4C4;
`

export default Convenience;