import { css, styled } from 'twin.macro';

export const Gnb = () => {
  return (
    <Wrapper>
      <div></div>
    </Wrapper>
  );
};
const Wrapper = styled.div(() => [
  css`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 1440px;
    height: 100px;
    display: flex;
    padding: 0px 24px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    z-index: 20;
  `,
]);
