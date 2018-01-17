import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames'
import validator from 'validator';
import "../css/URLOpener.scss"

class URLOpener extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      value:props.defaultValue || ""
    }
  }

  //private methods
  _onTextFieldChange(ev){
    this.setState({...this.state,value:ev.target.value});
    if(this.props.onURLChange)
      this.props.onURLChange(ev.target.value);
  }

  _onButtonClcik(ev){
    if(validator.isURL(this.state.value)){
      window.open(this.state.value.match(/^http[s]?\:\/\//)?"":"http://" + this.state.value);
    }else{
      alert("wrong url format!");
    }
  }

  render() {
    return (
      <div className={Classnames('com_URLOpener',this.props.className)}>
        <label>{this.props.label}</label>
        <input className={validator.isURL(this.state.value)?"":"err"} type="text" value={this.state.value} onChange={this._onTextFieldChange.bind(this)} placeholder={this.props.placeholder} />
        <button onClick={this._onButtonClcik.bind(this)}>{this.props.buttonText}</button>
      </div>
    );
  }
}

URLOpener.propTypes = {
  className:PropTypes.string,
  label:PropTypes.string,
  placeholder:PropTypes.string,
  defaultValue:PropTypes.string,
  buttonText:PropTypes.string,
  onOpen:PropTypes.func,
  onURLChange:PropTypes.func
}

URLOpener.defaultProps = {
  label:"URL:",
  buttonText:"Open URL Now",
  placeholder:"url here..."
};

export default URLOpener;