import { ButtonHTMLAttributes, FC } from 'react';
import { BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton } from './button.styles';

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted'
}

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type GetButtonType = typeof BaseButton | typeof GoogleSignInButton | typeof InvertedButton;

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): GetButtonType =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
  }[buttonType]);

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading = false, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
