import React from 'react';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      formattedDate: '',
    }
  }

  componentDidMount() {
    // update every second
    const {date } = this.props;
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);

    let dateFor = new Date(date);
   const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
   let formattedDate =this.addLeadingZeros(dateFor.getFullYear()) + '-' + this.addLeadingZeros(dateFor.getMonth()+1) + '-' + this.addLeadingZeros(dateFor.getDate()) + ' ' + weeks[dateFor.getDay()];
    this.setState({formattedDate});
  }

  componentWillUnmount() {
    this.stop();
  }



  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

  
    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  

  render() {
    const countDown = this.state;

    return (
      <div className="Countdown"  id="#clock">
      <div className="date">{this.state.formattedDate}</div>
        <span className="time">
          <strong>{this.addLeadingZeros(countDown.days)}</strong>
          <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
        </span>

        <span className="time">
          <strong>{this.addLeadingZeros(countDown.hours)}</strong>
          <span>{countDown.hours === 1 ? 'Hour' : 'Hours'}</span>
        </span>

        <span className="time">
          <strong>{this.addLeadingZeros(countDown.min)}</strong>
          <span>{countDown.min === 1 ? 'Min' : 'Mins'}</span>
        </span>

        <span className="time">
          <strong>{this.addLeadingZeros(countDown.sec)}</strong>
          <span>{countDown.sec === 1 ? 'Sec' : 'Secs'}</span>
        </span>
      </div>
    );
  }
}

export default Countdown;
