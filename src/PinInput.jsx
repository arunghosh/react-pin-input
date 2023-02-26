import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PinItem from './PinItem';

/**
 */
class PinInput extends Component {
  constructor(props) {
    super(props);
  
    this.values = Array(props.length)
      .fill('')
      .map((x, i) => props.initialValue.toString()[i] || '');
    this.elements = [];
    this.currentIndex = 0;

    this.onPaste = this.onPaste.bind(this);
  }

  componentDidMount() {
    // Setting focus on the first element
    if (this.props.focus && this.props.length) this.elements[0].focus();
  }

  clear() {
    this.elements.forEach(e => e.clear());
    this.values = this.values.map(() => undefined);
    this.elements[0].focus();
  }

  focus() {
    if (this.props.length) this.elements[0].focus();
  }

  /**
   */
  onItemChange(value, isPasting, index) {
    const { length, onComplete, onChange } = this.props;
    let currentIndex = index;

    this.values[index] = value;

    // Set focus on next
    if (value.length === 1 && index < length - 1) {
      currentIndex += 1;
      this.elements[currentIndex].focus();
    }

    // Notify the parent
    const pin = this.values.join('');

    if (!isPasting) {
      onChange(pin, currentIndex);
    }

    if (pin.length === length) {
      // for pasting, trigger onComplete only when the last input triggers onChange
      if (isPasting && index < length - 1) {
        return;
      }

      onComplete(pin, currentIndex);
    }
  }

  onBackspace(index) {
    if (index > 0) {
      this.elements[index - 1].focus();
    }
  }

  onPaste(value) {
    const { length } = this.props;
    if (value.length !== length) {
      return;
    }

    this.elements.forEach((el, index) => el.update(value[index], true));
  }

  render() {
    return (
      <div style={this.props.style} className='pincode-input-container'>
        {this.values.map((e, i) => (
          <PinItem
            initialValue={e}
            ref={n => (this.elements[i] = n)}
            key={i}
            disabled={this.props.disabled}
            onBackspace={() => this.onBackspace(i)}
            secret={this.props.secret || false}
            onChange={(v, isPasting) => this.onItemChange(v, isPasting, i)}
            type={this.props.type}
            inputMode={this.props.inputMode}
            validate={this.props.validate}
            inputStyle={this.props.inputStyle}
            inputFocusStyle={this.props.inputFocusStyle}
            autoSelect={this.props.autoSelect}
            onPaste={i === 0 ? this.onPaste : null}
            regexCriteria={this.props.regexCriteria}
            ariaLabel={this.props.ariaLabel}
            placeholder={this.props.placeholder}
            secretDelay={this.props.secretDelay}
          />
        ))}
      </div>
    );
  }
}

PinInput.propTypes = {
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  length: PropTypes.number.isRequired,
  type: PropTypes.string,
  onComplete: PropTypes.func,
  validate: PropTypes.func,
  secret: PropTypes.bool,
  disabled: PropTypes.bool,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  inputMode: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inputStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inputFocusStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  autoSelect: PropTypes.bool,
  regexCriteria: PropTypes.any,
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
};

PinInput.defaultProps = {
  initialValue: '',
  type: 'numeric',
  secret: false,
  validate: null,
  focus: false,
  disabled: false,
  onChange: () => {},
  onComplete: () => {},
  inputMode: undefined,
  style: {},
  inputStyle: {},
  inputFocusStyle: {},
  autoSelect: true,
  regexCriteria: /^[a-zA-Z0-9]+$/,
  ariaLabel: '',
  placeholder: ''
};

export default PinInput;
