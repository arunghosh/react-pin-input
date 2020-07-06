import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  input: {
    padding: 0,
    margin: '0 2px',
    textAlign: 'center',
    border: '1px solid',
    background: 'transparent',
    width: '50px',
    height: '50px',
  },
  inputFocus: {
    outline: 'none',
    boxShadow: 'none',
  },
};

/**
 */
class PinItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
      focus: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
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
      this.setState({value});
      // timeout is to make sure that clearing happens after value is set
      // this is done beacause the setState callback was not triggering in react@15.2.4
      setTimeout(() => {
        this.props.onChange(value);
      }, 0);
    }
  }

  focus() {
    this
      .input
      .focus();
  }

  onFocus(e) {
    e.target.select();
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
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
    const { focus, value } = this.state;
    const { type, inputMode, inputStyle, inputFocusStyle } = this.props;
    const inputType = type === 'numeric' ? 'tel' : (type || 'text');
    return (<input
      disabled={ this.props.disabled ? "disabled": undefined }
      className='pincode-input-text'
      onChange={ this.onChange }
      onKeyDown={ this.onKeyDown }
      placeholder={ value }
      aria-label={ value }
      maxLength='1'
      autoComplete='off'
      type={ this.props.secret ? 'password' : inputType }
      inputMode={ inputMode || 'text'}
      pattern={ this.props.type === 'numeric' ? '[0-9]*' : '[A-Z0-9]*' }
      ref={ n => (this.input = n) }
      onFocus={ this.onFocus }
      onBlur={ this.onBlur }
      style={ Object.assign(
        {},
        styles.input,
        inputStyle,
        focus ? Object.assign({}, styles.inputFocus, inputFocusStyle) : {},
      ) }
      value={ value }
    />);
  }
}

PinItem.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBackspace: PropTypes.func.isRequired,
  secret: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  inputMode: PropTypes.string,
  validate: PropTypes.func,
  inputStyle: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  inputFocusStyle: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

PinItem.defaultProps = {
  secret: false,
  type: 'numeric',
  inputMode: undefined,
  validate: undefined,
};

export default PinItem;
