import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 */
class PinItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    if (e.keyCode === 8 && (!this.state.value || !this.state.value.length)) {
      this.props.onBackspace();
    }
  }

  clear() {
    this.setState({
      value: ''
    });
  }

  onChange(e) {
    const value = this.validate(e.target.value);
    if (this.state.value === value) return;
    if (value.length < 2) {
      this.props.onChange(value);
      this.setState({ value });
    }
  }

  focus() {
    this
      .input
      .focus();
  }

  validate(value) {
    if(this.props.validate) {
      return this.props.validate(value);
    }

    if(this.props.type === 'numeric') {
      const numCode = value.charCodeAt(0);
      const isInteger = numCode >= '0'.charCodeAt(0) && numCode <= '9'.charCodeAt(0);
      return isInteger ? value : '';
    }
    return value.toUpperCase();
  }

  render() {
    const { value } = this.state;
    const type = this.props.type === 'numeric' ? 'tel' : (this.props.type || 'text');
    return (<input
      onChange={ this.onChange }
      onKeyDown={ this.onKeyDown }
      maxLength='1'
      autoComplete='off'
      type={ this.props.secret ? 'password' : type }
      pattern={ this.props.type === 'numeric' ? '[0-9]*' : '[A-Z0-9]*'}
      className='pincode-input-text first'
      ref={ n => (this.input = n) }
      onFocus={ e => e.target.select() }
      value={ value }
    />);
  }
}

PinItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBackspace: PropTypes.func.isRequired,
  secret: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.func,
};

PinItem.defaultProps = {
  secret: false,
  type: 'numeric',
};

export default PinItem;
