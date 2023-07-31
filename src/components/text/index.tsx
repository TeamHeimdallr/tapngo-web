import { HTMLAttributes, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

import { TYPE } from '~/assets/fonts';

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  type?: string;
  clickable?: boolean;
}

export const Text = ({ children, type, ...rest }: Props) => {
  return (
    <BaseText type={type} {...rest}>
      {children}
    </BaseText>
  );
};

interface BaseProps {
  type?: string;
  clickable?: boolean;
}

const BaseText = styled.span(({ type = TYPE.R_14, clickable }: BaseProps) => [
  clickable && tw`clickable`,
  type === TYPE.R_12 && tw`font-r-12`,
  type === TYPE.R_14 && tw`font-r-14`,
  type === TYPE.R_16 && tw`font-r-16`,
  type === TYPE.R_18 && tw`font-r-18`,

  type === TYPE.SB_12 && tw`font-sb-12`,
  type === TYPE.SB_14 && tw`font-sb-14`,
  type === TYPE.SB_16 && tw`font-sb-16`,
  type === TYPE.SB_18 && tw`font-sb-18`,
  type === TYPE.SB_20 && tw`font-sb-20`,
  type === TYPE.SB_24 && tw`font-sb-24`,
  type === TYPE.SB_28 && tw`font-sb-28`,
]);
