# React PIN input component

The component takes in the length of the PIN and two callback to notifiy change and completion.

```javascript
<PinInput length={4} onChange={(value, index) => {}} onComplete={(value, index) => {}} />
```

The ```index``` is the input which is currently in focus.
