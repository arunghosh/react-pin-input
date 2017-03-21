import React, { Component, PropTypes } from 'react';
import PinItem from './PinItem';

/**
 */
class PinInput extends Component {

  constructor(props) {
    super(props);
    // this.props.secret = this.props.secret || false;
    // TODO: better way to create array
    this.values = new Array(props.length)
      .join('0')
      .split('0');
    this.elements = [];
    this.currentIndex = 0;
  }

  /**
   */
  onItemChange(value, index) {
    const { length, onComplete, onChange } = this.props;
    let currentIndex = index;

    this.values[index] = value;

    // Set focus on next
    if (value.length === 1 && index < length - 1) {
      currentIndex += 1;
      this
        .elements[currentIndex]
        .focus();
    }

    // Notify the parent
    const pin = this
      .values
      .join('');

    onChange(pin, currentIndex);
    if (pin.length === length) {
      onComplete(pin, currentIndex);
    }
  }

  render() {
    return (
      <div className='pincode-input-container'>
        {this
          .values
          .map((e, i) => <PinItem
            ref={ n => this.elements[i] = n }
            key={ i }
            secret={ this.props.secret || false }
            onChange={ v => this.onItemChange(v, i) }
          />)
        }
      </div>
    );
  }
}

PinInput.propTypes = {
  length: PropTypes.number.isRequired,
  onComplete: PropTypes.func,
  secret: React.PropTypes.bool,
  onChange: PropTypes.func,
};

PinInput.defaultProps = {
  secret: false,
  onChange: () => {},
  onComplete: () => {},
};

export default PinInput;
