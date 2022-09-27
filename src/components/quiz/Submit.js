import React, { useState } from 'react'
import styled from 'styled-components'
import { StartBtn } from '../utils/Buttons'
import { IntroCard } from '../utils/Cards'
import { fonts, colors } from '../utils/_var'
import { media } from '../utils/_media-queries'

const Wrapper = styled.div`
  position: fixed;
  min-height: 100%;
  max-width: 100%;
  background: ${colors.$colorBg};
  h1 {
    position: relative;
    font-family: ${fonts.$titleFont};
    font-size: 1.1em;
    color: ${colors.$colorGold};
    text-align: center;
    padding-top: 2em;
    ${media.tablet`font-size: 1.5em; letter-spacing: 1.5px;`};
    ${media.laptop`font-size: 2em; letter-spacing: 2px;`};
  }
  .list-group {
    padding: 0 2em;
    .list-group-item {
      background: transparent;
      padding: 1em 1.25em;
      font-family: ${fonts.$latoFont};
      border: 0;
      margin-bottom: 0;
      color: ${colors.$colorGold};
      ${media.tablet`font-size: 1.3em`};
      text-align: center;
    }
  }
  .error {
    color: red;
  }
`

const Submit = ({ title, onSubmit }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleOnSubmit = () => {
    if (password !== 'sn1234@@') {
      setError('Password is incorrect');
    }
    else {
      setError('')
      onSubmit()
    }
  }

  return (
    <Wrapper className="container">
      <IntroCard>
        <div className="corner" />
        <div className="corner" />
        <div className="corner" />
        <div className="corner" />
        <h1>{title}</h1>
        {/* TODO: WILL CHANGE THIS THING DOWN HERE */}
        <ul className="list-group">
          <li className="list-group-item">Quiz Ended</li>
          <label className='list-group-item' style={{ marginRight: 15 }}>Enter password:
            <input type="text" onChange={e => setPassword(e.target.value)} />
          </label>
        </ul>
        <div className='list-group'>
          <div className='list-group-item'>
            <span className='error'>{error}</span>
          </div>
        </div>
        <StartBtn onClick={handleOnSubmit}>
          <span>Show results{' ->'}</span>
          <div className="icon">
            <i className="fa fa-arrow-right" />
          </div>
        </StartBtn>
      </IntroCard>
    </Wrapper>
  )
}

export default Submit
