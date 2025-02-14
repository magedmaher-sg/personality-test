import React, { useState } from 'react'
import styled from 'styled-components'
import { StartBtn } from '../components/utils/Buttons'
import { IntroCard } from '../components/utils/Cards'
import { fonts, colors } from '../components/utils/_var'
import { media } from '../components/utils/_media-queries'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import stllrs from '../api/stllrs'

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
`

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
]

const Intro = ({ title, _onStartClick }) => {
  const [userId, setUserId] = useState()
  const [userName, setUserName] = useState()
  const [userGender, setUserGender] = useState()
  const [options] = useState(() => {
    return [stllrs.male, stllrs.female]
      .flat()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(e => ({ label: e.name, value: e.id }))
  })

  const handleOnSubmit = () => {
    _onStartClick()
    localStorage.setItem("id", userId)
    localStorage.setItem("name", userName)

    const user = [stllrs.male, stllrs.female].flat().find(e => e.id === Number(userId))
    localStorage.setItem("gender", user.gender)
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
          <li className="list-group-item">Consists of 10 questions</li>
          {/* <label className='list-group-item' style={{ marginRight: 15 }}>Enter your name:
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label> */}
          <div className='list-group-item' style={{ display: 'flex', justifyContent: 'center' }}>
            <Dropdown options={options} onChange={e => {
              console.log(e)
              setUserId(e.value)
              setUserName(e.label)
            }} placeholder="Who are you?" />
          </div>
          {/* <div className='list-group-item' onChange={e => setUserGender(e.target.value)}>
            <input type="radio" value="Male" name="gender" /> Male
            <input type="radio" value="Female" name="gender" style={{ marginLeft: 10 }} /> Female
          </div> */}
        </ul>
        {userName &&
          <StartBtn onClick={handleOnSubmit}>
            <span>Let's Do This!</span>
            <div className="icon">
              <i className="fa fa-arrow-right" />
            </div>
          </StartBtn>
        }
      </IntroCard>
    </Wrapper>
  )
}

export default Intro
