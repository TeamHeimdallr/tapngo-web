import tw, { css, styled } from 'twin.macro';

import { COLOR } from '~/assets/colors';
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
        <Text
          type={TYPE.SB_20}
          color={status === '' || status === 'normal' ? COLOR.GRAY4 : COLOR.BLACK}
        >
          ₩
        </Text>
        <BaseInput
          type="number"
          inputMode="numeric"
          status={status}
          placeholder="가격을 입력해주세요."
          onChange={handleChange}
          value={value}
          maxLength={13}
        />
      </Container>
      {status === 'error' && (
        <ErrorContainer>
          <Text type={TYPE.R_16} color={COLOR.RED}>
            숫자만 입력해주세요.
          </Text>
        </ErrorContainer>
      )}
    </Wrapper>
  );
};
const Wrapper = tw.div`
  flex flex-col gap-8
`;

const Container = styled.div<Props>(({ status }) => [
  tw`flex items-center h-64 gap-8 p-16 border-solid rounded-8 border-1 border-gray3 text-gray6`,
  status === 'normal' &&
    css`
      color: ${COLOR.RED};
    `,
  status === 'error' && tw`border-red bg-red/10`,
  status === 'type' && tw`border-darkGreen`,
]);

const BaseInput = styled.input<Props>(() => [
  tw`bg-transparent border-none font-sb-20`,
  css`
    &::placeholder {
      font-family: Pretendard Variable;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px; /* 133.333% */
      color: #adb3be;
    }
  `,
]);
const ErrorContainer = tw.div`
  text-red
`;
