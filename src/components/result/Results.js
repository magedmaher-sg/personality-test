import React, { Component } from 'react'
import Colors from '../result/Colors'
import Letters from '../result/Letters'
import Briggs from '../result/Briggs'
import { Wrapper } from '../utils/ResultWrapper'
import { QuestionCard } from '../utils/Cards'

class Results extends Component {
  constructor(props) {
    super(props)
    const name = localStorage.getItem('name')
    const gender = localStorage.getItem('gender')
    this.state = {
      name: name,
      gender: gender,

      showColorsResult: true,
      showLettersResult: false,
      showBriggsResult: false
    }
    this._onNextClick = this._onNextClick.bind(this)
  }

  renderTestResults(maleCount, femaleCount, name, gender) {
    if (maleCount > femaleCount) {
      if (gender === 'Male') {
        return <div>GAY</div>
      } else {
        return <div>loves men (straight)</div>
      }
    } else if (maleCount < femaleCount) {
      if (gender === 'Female') {
        return <div>Lesbian</div>
      } else {
        return <div>loves women (straight)</div>
      }
    } else {
      return <div>Neutral</div>
    }
  }

  renderResultColors() {
    return <Colors resultColors={this.props.resultColors} _onNextClick={this._onNextClick} />
  }

  renderResultLetters() {
    return <Letters resultLetters={this.props.resultLetters} _onNextClick={this._onNextClick} />
  }

  renderBriggsResult() {
    return <Briggs resultBriggs={this.props.resultBriggs} />
  }

  render() {


    return (
      <Wrapper className="container output">
        <QuestionCard>
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />

          <div className='output' >
            {this.state.name} is <br />
            {this.renderTestResults(this.props.maleCount, this.props.femaleCount, this.state.name, this.state.gender)}
          </div>
        </QuestionCard>
      </Wrapper>
    )
    let showColorsResult = this.state.showColorsResult
    let showLettersResult = this.state.showLettersResult
    let showBriggsResult = this.state.showBriggsResult
    if (showColorsResult) {
      return this.renderResultColors()
    } else if (showLettersResult) {
      return this.renderResultLetters()
    } else if (showBriggsResult) {
      return this.renderBriggsResult()
    }
  }

  _onNextClick() {
    let showColorsResult = this.state.showColorsResult
    let showLettersResult = this.state.showLettersResult
    let showBriggsResult = this.state.showBriggsResult

    if (showColorsResult) {
      setTimeout(() => {
        this.setState({
          showColorsResult: !showColorsResult, // -> false
          showLettersResult: !showLettersResult // -> true
        })
      }, 800)
    } else if (showLettersResult) {
      setTimeout(() => {
        this.setState({
          showLettersResult: !showLettersResult, // false
          showBriggsResult: !showBriggsResult // true
        })
      }, 800)
    }
  }
}

export default Results
