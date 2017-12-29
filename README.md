# react-pin input

[![Build Status](https://travis-ci.org/arunghosh/react-pin-input.svg?branch=master)](https://travis-ci.org/arunghosh/react-pin-input)

**React component for PIN/MPIN like input**

![alt tag](https://github.com/arunghosh/react-pin-input/raw/master/docs/pin.png)


**Installation**
```
npm install react-pin-input
```


**Usage**

The component takes in the length of the PIN and two callback to notifiy change and completion. The ```index``` is the input which is currently in focus.

```javascript
<PinInput length={4} secret onChange={(value, index) => {}} onComplete={(value, index) => {}} />
```



**Configuration**

 - If you set the ```type``` attibute to ```numeric```, the input will take only numbers.
 
 - If you set the ```type``` attibute to ```custom```, the input will take values other than numbers.

 - If you set the ```secret``` attibute, the input will be hidden as shown below.

![alt tag](https://github.com/arunghosh/react-pin-input/raw/master/docs/pin-secret.png)

 - Setting the ```focus``` attibute will set the default focus on the first input element.

**APIs**

```javascript
<PinInput length={4} ref={(n) => ele=n} />
```
 - ```ele.focus()``` to set focus on the first input element.
 - ```ele.clear``` to clear the values

**Style**

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


### For developers

To make new build
```
npm run build
```

To run dev server
```
npm run dev
```

To run test
```
npm run test
```

