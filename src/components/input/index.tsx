import tw, { css, styled } from 'twin.macro';

import { TYPE } from '~/assets/fonts';

import { Text } from '../text';

interface Props {
  status?: string;
  value?: string;
  handleChange?: (e) => void;
}

export const Input = ({ status, value, handleChange }: Props) => {
  return (
    <Wrapper>
      <Container status={status}>
        <Text type={TYPE.SB_20}>₩</Text>
        <BaseInput
          status={status}
          placeholder="가격을 입력해주세요."
          onChange={handleChange}
          value={value}
          maxLength={13}
        />
      </Container>
      {status === 'error' && (
        <ErrorContainer>
          <Text type={TYPE.R_16}>숫자만 입력해주세요.</Text>
        </ErrorContainer>
      )}
    </Wrapper>
  );
};
const Wrapper = tw.div`
  flex flex-col gap-8
`;

const Container = styled.div<Props>(({ status }) => [
  tw`
  p-16 h-64 flex gap-8
  items-center rounded-8
  border-1 border-solid border-gray3 text-gray6
`,
  status === 'normal' && tw`text-gray4`,
  status === 'error' && tw`border-red bg-red/10`,
  status === 'type' && tw`border-darkGreen`,
]);

const BaseInput = styled.input<Props>(() => [
  tw`
    font-sb-20 border-none bg-transparent
  `,
  css`
    &::placeholder {
      font-family: Pretendard Variable;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px; /* 133.333% */
    }
  `,
]);
const ErrorContainer = tw.div`
  text-red
`;
