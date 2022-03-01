import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { history } from '../../redux/configStore'

const SearchCard = (props) => {
    const [keyword, setKeyword] = useState("");

    const handleKeyword = (e) => {
        setKeyword(e.target.value)
    }

    return (
        <Container>
            <InputContainer id="SearchBar">
                <Input placeholder="토론 결과를 검색해보세요" value={keyword} onChange={handleKeyword} />
            </InputContainer>
        </Container>
    )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`
const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-self: center;
`

const Input = styled.input`
  width: 100%;
  height: 44px;
  background-color: #e5e5e5;
  font-weight: 500;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  padding: 13px 16px;
`

export default SearchCard;