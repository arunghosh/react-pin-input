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

  componentDidMount() {
    // Setting focus on the first element
    if(this.props.focus && this.props.length) this.elements[0].focus();
  }

  clear() {
    this.elements.forEach(e => e.clear());
    this.values = this.values.map(() => undefined)
  }

  focus() {
    if(this.props.length) this.elements[0].focus();
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

  onBackspace(index) {
    if (index > 0) {
      this.elements[index - 1].focus();
    }
  }

  render() {
    return (
      <div className='pincode-input-container'>
        {this
          .values
          .map((e, i) => <PinItem
            ref={ n => (this.elements[i] = n) }
            key={ i }
            onBackspace={ () => this.onBackspace(i) }
            secret={ this.props.secret || false }
            onChange={ v => this.onItemChange(v, i) }
            type={ this.props.type }
            validate={ this.props.validate }
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
  focus: React.PropTypes.bool,
  onChange: PropTypes.func,
};

PinInput.defaultProps = {
  secret: false,
  focus: false,
  onChange: () => {},
  onComplete: () => {},
};

export default PinInput;
