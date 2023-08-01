import { css, styled } from 'twin.macro';

interface Props {
  top?: number;
  bottom?: number;
}

export const Divider = ({ top, bottom }: Props) => {
  return <Wrapper top={top} bottom={bottom} />;
};

const Wrapper = styled.div<Props>(({ top, bottom }) => [
  css`
    margin-top: ${top}px;
    margin-bottom: ${bottom}px;
  `,
]);
