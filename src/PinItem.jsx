import React, { Component } from 'react';

/**
 */
class PinItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onChange = this
      .onChange
      .bind(this);
    this.onFocus = this
      .onFocus
      .bind(this);
  }

  onFocus(e) {
    e
      .target
      .select();
  }

  onChange(e) {
    let value = e.target.value;

    if (!Number.isInteger(Number(value))) value = '';
    if (this.state.value === value) return;
    if (value.length < 2) {
      this
        .props
        .onChange(value);
      this.setState({ value });
    }
  }

  focus() {
    this
      .input
      .focus();
  }

  render() {
    const { value } = this.state;

    return (<input
      onChange={ this.onChange }
      maxLength='1'
      autoComplete='off'
      type={ this.props.secret ? 'password' : 'text' }
      className='pincode-input-text first'
      ref={ n => (this.input = n) }
      onFocus={ this.onFocus }
      value={ value }
    />);
  }
}

PinItem.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  secret: React.PropTypes.bool,
};

PinItem.defaultProps = {
  secret: false,
};

export default PinItem;
