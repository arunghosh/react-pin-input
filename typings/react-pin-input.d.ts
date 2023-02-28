declare module "react-pin-input" {
  import * as React from "react";

  type InputType = "numeric" | "custom";

  interface PinInputProps {
    length: number;
    initialValue?: number | string;
    type?: InputType;
    inputMode?: string;
    secret?: boolean;
    secretDelay?: number;
    disabled?: boolean;
    focus?: boolean;
    onChange?: (value: string, index: number) => void;
    onComplete?: (value: string, index: number) => void;
    style?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    inputFocusStyle?: React.CSSProperties;
    validate?: (value: string) => string;
    autoSelect?: boolean;
    regexCriteria?: any;
    ariaLabel?: string
    placeholder?: string
  }

  class PinInput extends React.Component<PinInputProps> {
    clear: () => void;
    focus: () => void;
  }

  export default PinInput;
}
