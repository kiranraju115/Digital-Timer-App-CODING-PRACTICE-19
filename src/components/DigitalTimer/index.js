import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  timerElapsedInSeconds: 0,
}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timerLimitInMinutes * 60 === timerElapsedInSeconds

    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerLimitController = () => {
    const {timerElapsedInSeconds, timerLimitInMinutes} = this.state
    const isButtonDisabled = timerElapsedInSeconds > 0
    console.log(timerElapsedInSeconds, timerLimitInMinutes)

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer Limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-btn"
            type="button"
            onClick={this.onDecrementTimerLimitInMinutes}
            disabled={isButtonDisabled}
          >
            {' '}
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-btn"
            type="button"
            onClick={this.onIncrementTimerLimitInMinutes}
            disabled={isButtonDisabled}
          >
            {' '}
            +
          </button>
        </div>
      </div>
    )
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  onIncrementTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecrementTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingInSeconds =
      timerLimitInMinutes * 60 - timerElapsedInSeconds

    const minutes = Math.floor(totalRemainingInSeconds / 60)
    const seconds = Math.floor(totalRemainingInSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    return (
      <div className="app-container">
        <h1>Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
