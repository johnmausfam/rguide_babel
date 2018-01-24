import React from 'react'
import PropTypes from 'prop-types'

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderTime = 0;
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>({++this.renderTime})在{scaleNames[scale]}:中输入温度数值</legend>
        <input value={temperature}
               onChange={this.handleChange.bind(this)} />
      </fieldset>
    );
  }
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}


class TemperatureApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
  	/*const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      	<div>
			<TemperatureInput
	          scale="c"
	          temperature={celsius}
	          onTemperatureChange={this.handleCelsiusChange.bind(this)} />

	        <TemperatureInput
	          scale="f"
	          temperature={fahrenheit}
	          onTemperatureChange={this.handleFahrenheitChange.bind(this)} />
    	</div>
    );*/

    return [
      	<div>12</div>,
    	<div>34</div>,
    	['56','78'].map(i=>{
    		return <div>{i}</div>
    	})
    ];
  }
}

export default TemperatureApp;
