import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
      value: this.validate(props.initialValue),
      showSecret: this.props.secret,
      focus: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.secretTimeout = null;
    this.inputTimeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this.secretTimeout);
    clearTimeout(this.inputTimeout)
  }

  onKeyDown(e) {
    if (e.keyCode === 8 && (!this.state.value || !this.state.value.length)) {
      this.props.onBackspace();
    }
  }

  clear() {
    this.setState({
      value: '',
    });
  }

  setSecretDelayed(value){
    this.setState({ showSecret: false });
    this.secretTimeout =  setTimeout(()=>{
        this.setState({
          showSecret: value ? true : false,
        });
      } ,this.props.secretDelay);
  }

  update(updatedValue, isPasting = false) {
    const value = this.validate(updatedValue);
    if (this.state.value === value && !isPasting) return;

    if (value.length < 2) {
      this.setState({
        value,
      });

     this.inputTimeout = setTimeout(() => {
        this.props.onChange(value, isPasting);
      }, 0);
    } 
  }

  onChange(e) {
    this.update(e.target.value);
  }

  focus() {
    this.input.focus();
  }

  onFocus(e) {
    if (this.props.autoSelect) {
      e.target.select();
    }
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }

  onPaste(e) {
    if (!this.props.onPaste) {
      return;
    }

    const value = e.clipboardData.getData('text');
    this.props.onPaste(value);
  }

  validate(value) {
    if(this.props.secretDelay) this.setSecretDelayed(value)

    if (this.props.validate) {
      return this.props.validate(value);
    }

    if (this.props.type === 'numeric') {
      const numCode = value.charCodeAt(0);
      const isInteger =
        numCode >= '0'.charCodeAt(0) && numCode <= '9'.charCodeAt(0);
      return isInteger ? value : '';
    }
    if (this.props.regexCriteria.test(value)) {
      return value.toUpperCase();
    }

    return '';
  }

  render() {
    const { focus, value } = this.state;
    const { type, inputMode, inputStyle, inputFocusStyle } = this.props;
    const inputType = type === 'numeric' ? 'tel' : type || 'text';
    return (
      <input
        disabled={this.props.disabled ? 'disabled' : undefined}
        className='pincode-input-text'
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        placeholder={this.props.placeholder ? this.props.placeholder : value}
        aria-label={this.props.ariaLabel ? this.props.ariaLabel : value}
        maxLength='1'
        autoComplete='off'
        type={this.state.showSecret ? 'password' : inputType}
        inputMode={inputMode || 'text'}
        pattern={this.props.type === 'numeric' ? '[0-9]*' : '^[a-zA-Z0-9]+$'}
        ref={n => (this.input = n)}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onPaste={this.onPaste}
        style={Object.assign(
          {},
          styles.input,
          inputStyle,
          focus ? Object.assign({}, styles.inputFocus, inputFocusStyle) : {},
        )}
        value={value}
      />
    );
  }
}

PinItem.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBackspace: PropTypes.func.isRequired,
  onPaste: PropTypes.func,
  secret: PropTypes.bool,
  secretDelay: PropTypes.number,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  inputMode: PropTypes.string,
  validate: PropTypes.func,
  inputStyle: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  inputFocusStyle: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  autoSelect: PropTypes.bool,
  regexCriteria: PropTypes.any,
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
};

PinItem.defaultProps = {
  secret: false,
  type: 'numeric',
  inputMode: undefined,
  disabled: false,
  validate: undefined,
  autoSelect: false,
  onPaste: undefined,
  regexCriteria: /^[a-zA-Z0-9]+$/,
  ariaLabel: '',
  placeholder: ''
};

export default PinItem;
