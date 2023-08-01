import { ReactElement } from 'react';
import tw from 'twin.macro';

interface Props {
  children: ReactElement;
}

export const Layout = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};
const Wrapper = tw.div`
  w-full flex justify-center
`;
