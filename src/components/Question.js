import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../components/utils/_var'
import Quiz from '../components/quiz/Quiz'
import Results from '../components/result/Results'
import quizQuestions from '../api/quizQuestions'
import stllrs from '../api/stllrs'
import { QuestionCard } from '../components/utils/Cards'
import Submit from './quiz/Submit'

const Wrapper = styled.div`
  position: fixed;
  min-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${colors.$colorBg};
`

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maleCount: 0,
      femaleCount: 0,
      showResult: false,
      quizEnded: false,
      

      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        Colors: {
          Green: 10,
          Brown: 10,
          Blue: 10,
          Red: 10
        },
        Letters: {
          A: 10,
          B: 10,
          C: 10,
          D: 10
        },
        Briggs: {
          E: 5,
          I: 5,
          S: 5,
          N: 5,
          T: 5,
          F: 5,
          J: 5,
          P: 5
        }
      },
      resultBriggs: '',
      resultColors: '',
      resultLetters: ''
    }
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this)
  }

  // populate app’s state using the componentWillMount life cycle event
  componentWillMount() {
    const answerOptions = this.getRandomOptions()
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: answerOptions
    })
  }

  // setting the answer based on the user’s selection
  setUserAnswer(answer) {
    console.log({answer})
    switch(answer) {
      case 'm':
        this.setState({
          maleCount: this.state.maleCount + 1,
          answer: 'm',
        })
        break;

      case 'f':
        this.setState({
          femaleCount: this.state.femaleCount + 1,
          answer: 'f',
        })
        break;
    }
    // const answersCount = this.state.answersCount
    // let applyAnswer = answer => {
    //   const answer_array = answer.split(',')
    //   let briggsAnswer = answer_array[0]
    //   let colorsAnswer = answer_array[1]
    //   let lettersAnswer = answer_array[2]
    //   if (answer_array.length === 3) {
    //     answersCount['Briggs'][briggsAnswer] += 1
    //     answersCount['Colors'][colorsAnswer] += 1
    //     answersCount['Letters'][lettersAnswer] += 1
    //   } else if (answer_array.length === 4) {
    //     answersCount['Briggs'][briggsAnswer] -= 1
    //     answersCount['Colors'][colorsAnswer] -= 1
    //     answersCount['Letters'][lettersAnswer] -= 1
    //   }
    //   return answersCount
    // }
    // this.setState({
    //   answersCount: applyAnswer(answer),
    //   answer: answer
    // })
  }

  shuffleArray(array) {
    return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  }

  getRandomOptions() {
    const f = e => e.id !== Number(localStorage.getItem('id'))
    let options = [
      this.shuffleArray(stllrs.male.filter(f)).slice(0, 2),
      this.shuffleArray(stllrs.female.filter(f)).slice(0, 2),
    ].flat()
    options = this.shuffleArray(options).slice(0, 3)
    options = options.map(e => ({ content: e.name, type: e.gender }))
    return options
  }

  // increment the counter and questionId state
  setNextQuestion() {
    const counter = this.state.counter + 1
    const questionId = this.state.questionId + 1
    const options = this.getRandomOptions()
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: options,
      answer: ''
    })
  }

  // setting the answer and then setting the next question
  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value)
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 800)
    } else {
      console.log('quiz ended')
      console.log(this.endQuiz)
      setTimeout(() => this.endQuiz(), 800)
    }
  }

  handleShowResult() {
    console.log('show results')
    console.log(this.showResult)
    setTimeout(() => this.showResult(), 200)
  }

  // ===========================================================================
  //                        get results
  // ===========================================================================
  getBriggsResults() {
    const answerCount = this.state.answersCount
    const briggsAnswer = answerCount['Briggs']
    const answersCountKeysBriggs = Object.keys(briggsAnswer)
    const answersCountValuesBriggs = answersCountKeysBriggs.map(key => briggsAnswer[key])
    let briggsType = ''
    if (briggsAnswer.E >= briggsAnswer.I) {
      briggsType += 'E'
    } else briggsType += 'I'
    if (briggsAnswer.S >= briggsAnswer.N) {
      briggsType += 'S'
    } else briggsType += 'N'
    if (briggsAnswer.T >= briggsAnswer.F) {
      briggsType += 'T'
    } else briggsType += 'F'
    if (briggsAnswer.J >= briggsAnswer.P) {
      briggsType += 'J'
    } else briggsType += 'P'
    return briggsType
  }

  getColorsResults() {
    const answersCount = this.state.answersCount
    const colorsAnswer = answersCount['Colors']
    const answersCountKeysColors = Object.keys(colorsAnswer)
    const answersCountValuesColors = answersCountKeysColors.map(key => colorsAnswer[key])
    const maxAnswerCountColors = Math.max.apply(null, answersCountValuesColors)
    return answersCountKeysColors.filter(key => colorsAnswer[key] === maxAnswerCountColors)
  }

  getLettersResults() {
    const answersCount = this.state.answersCount
    const lettersAnswer = answersCount['Letters']
    const answersCountKeysLetters = Object.keys(lettersAnswer)
    const answersCountValuesLetters = answersCountKeysLetters.map(key => lettersAnswer[key])
    const maxAnswerCountLetters = Math.max.apply(null, answersCountValuesLetters)
    return answersCountKeysLetters.filter(key => lettersAnswer[key] === maxAnswerCountLetters)
  }

  // ===========================================================================
  //                        set results
  // ===========================================================================
  endQuiz() {
    console.log('set quiz ended')
    this.setState({
      quizEnded: true,
    })
  }

  showResult() {
    console.log('set show results')
    this.setState({
      showResult: true,
    })
  }

  // ===========================================================================
  //                    functions to render quiz
  // ===========================================================================
  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    )
  }

  // ===========================================================================
  //                    functions to render result
  // ===========================================================================
  renderResult() {
    return (
      <Results
        maleCount={this.state.maleCount}
        femaleCount={this.state.femaleCount}
      />
    )
  }

  // ===========================================================================
  //                    functions to render submit
  // ===========================================================================
  renderSubmit() {
    return (
      <Submit onSubmit={this.handleShowResult.bind(this)} />
    )
  }

  // ===========================================================================
  //                       render this question page
  // ===========================================================================
  render() {
    if (this.state.showResult) {
      return this.renderResult()
    }
    else if (this.state.quizEnded) {
      return this.renderSubmit()
    }
    return (
      <Wrapper className="container">
        <QuestionCard>
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />
          {this.renderQuiz()}
        </QuestionCard>
      </Wrapper>
    )
  }
}

export default Question
