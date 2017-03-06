import React, {Component} from 'react';

/**
 */
class PinItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.onChange = this
      .onChange
      .bind(this);
    this.onFocus = this
      .onFocus
      .bind(this);
  }

  focus() {
    this
      .input
      .focus();
  }

  onChange(e) {
    let value = e.target.value;

    if (!Number.isInteger(Number(value))) value = '';
    if (this.state.value === value) return;
    if (value.length < 2) {
      this
        .props
        .onChange(value);
      this.setState({value});
    }
  }

  onFocus(e) {
    e
      .target
      .select();
  }

  render() {
    const {value} = this.state;

    return (<input
      onChange={this.onChange}
      maxLength='1'
      autoComplete='off'
      className='form-control pincode-input-text first'
      ref={n => this.input = n}
      onFocus={this.onFocus}
      value={value}/>);
  }
}

PinItem.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default PinItem;
