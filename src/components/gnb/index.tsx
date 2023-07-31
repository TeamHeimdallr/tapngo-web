import tw, { css, styled } from 'twin.macro';

import { IconBack } from '../icons';

export const Gnb = () => {
  return (
    <Wrapper>
      <IconWrapper>
        <IconBack />
      </IconWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div(() => [
  css`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 54;
    display: flex;
    padding: 15px 16px;
    align-items: center;
    z-index: 20;
  `,
]);

const IconWrapper = styled.div(() => [tw`clickable`]);
