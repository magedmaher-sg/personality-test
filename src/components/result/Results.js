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
    console.log({name})
    this.state = {
      name: name,
      gender: gender,

      showColorsResult: true,
      showLettersResult: false,
      showBriggsResult: false
    }
    this._onNextClick = this._onNextClick.bind(this)
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
      <Wrapper className="container">
        <QuestionCard>
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />
          maleCount: {this.props.maleCount}<br/>
          femaleCount: {this.props.femaleCount}<br/>

          name: {this.state.name}<br/>
          gender: {this.state.gender}<br/>
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
