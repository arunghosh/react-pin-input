# react-pin-input

_There is [another package](https://github.com/40818419/react-code-input) for managing PIN input. Check and see which suits you better._

[![Build Status](https://travis-ci.org/arunghosh/react-pin-input.svg?branch=master)](https://travis-ci.org/arunghosh/react-pin-input)

**React-PIN-Input is a React component o capture PIN/MPIN like input**

![alt tag](https://github.com/arunghosh/react-pin-input/raw/master/docs/pin.png)

## Demo
https://codesandbox.io/s/8jnlxw359

## Installation
```
npm install react-pin-input --save
```


## Usage

The component takes in the length of the PIN and two callback to notifiy change and completion. The ```index``` is the input which is currently in focus.

```javascript
import PinInput from 'react-pin-input';

<PinInput 
  length={4} 
  initialValue=""
  secret
  secretDelay={100} 
  onChange={(value, index) => {}} 
  type="numeric" 
  inputMode="number"
  style={{padding: '10px'}}  
  inputStyle={{borderColor: 'red'}}
  inputFocusStyle={{borderColor: 'blue'}}
  onComplete={(value, index) => {}}
  autoSelect={true}
  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
/>
```
|Attribute|Type|Description|
|:--|:--|:--|
|length|number|Number of inputs|
|initialValue|number\|string|Initial value of inputs|
|type|string|Type of input allowed
||| if ```numeric```, the input will take only numbers|
||| if ```custom```, the input will take other than numbers|
|secret|boolean|If you set the ```secret``` attibute, the input will be hidden as shown below.
|secretDelay|number|If you set the ```secret``` attibute, then you can optionally add secretDelay ms to hide the inputs as you type.
|disabled|boolean|If you set the ```disable``` attibute, the input will be disabled.
|focus|boolean| Setting the ```focus``` attibute will set the default focus on the first input element.
|onChange|function|Callback function invoked on input change. The first parameter is the value and the second is the index of the input that is currently in focus|
|onComplete|function|Callback function invoked when all inputs have valid values. The first parameter is the value and the second is the index of the input that is currently in focus|
|style|object|Style for the container `div`
|inputStyle|object|Style for the input element
|inputFocusStyle|object|Style for the input element when on focus
|autoSelect|boolean|Setting ```autoSelect``` to ```false``` will stop automatically highlighting input values on focus. This eliminates popup focus flashing on iOS.|
|regexCriteria|any|Add validation for ```alphanumeric``` type. *NOTE:* default value is /^[ A-Za-z0-9_@./#&+-]*$/

Display when secret is set
![alt tag](https://github.com/arunghosh/react-pin-input/raw/master/docs/pin-secret.png)


## Additional APIs

```javascript
<PinInput length={4} ref={(n) => ele=n} />
```
  - ```ele.focus()``` to set focus on the first input element.
  - ```ele.clear``` to clear the values

## Custom Style

You can update the style via following props
 - `style`
 - `inputStyle`
 - `inputFocusStyle`

Or another option is to override the default style(shown below is scss. For css [refer](https://github.com/arunghosh/react-pin-input/issues/4) ).

```scss
.pincode-input-container
{
  .pincode-input-text
  {
    padding:0 !important;
    margin:0 2px;
    text-align:center;
    border: 1px solid;
    background: transparent;
    width: 50px;
    height: 50px;
  }
  .pincode-input-text:focus
  {
    outline:none;
    box-shadow:none;
  }
}
```


## For developers

**New build**
```
npm run build
```

**Run dev server**
```
npm run dev
```

**Run test**
```
npm run test
```

<a href="https://www.buymeacoffee.com/arunghosh" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
