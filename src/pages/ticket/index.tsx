import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';

import { COLOR } from '~/assets/colors';
import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { IconCancel, IconCheck, IconPayed } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';

export const Ticket = () => {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <Layout>
      <Wrapper isDone={isDone} isError={isError}>
        <Gnb />
        <Body>
          <Container>
            <TitleContainer isDone={isDone} isError={isError}>
              <Text type={TYPE.SB_24}>티켓 인증</Text>
            </TitleContainer>
            <Sector>
              {!isDone && !isError && (
                <>
                  <IconPayed width={80} height={80} />
                  <Divider bottom={44} />
                  <Text type={TYPE.SB_16}>NFC 카드를 탭해주세요.</Text>
                </>
              )}
              {isDone && (
                <>
                  <IconCheck width={40} height={40} color={COLOR.BLACK} />
                  <Divider bottom={44} />
                  <Text type={TYPE.SB_16}>티켓 인증이 완료되었습니다.</Text>
                </>
              )}
              {isError && (
                <>
                  <IconCancel width={40} height={40} />
                  <Divider bottom={44} />
                  <Text type={TYPE.SB_16}>NFC 카드를 탭해주세요.</Text>
                </>
              )}
              <Divider bottom={24} />
            </Sector>
          </Container>
          {(isDone || isError) && (
            <ButtonFilled text="확인" primary={'large'} disabled onClick={() => navigate('/')} />
          )}
        </Body>
      </Wrapper>
    </Layout>
  );
};

interface Props {
  isDone?: boolean;
  isError?: boolean;
}

const Wrapper = styled.div<Props>(({ isDone, isError }) => [
  tw`
    relative 
    w-360 h-screen px-16  
  `,
  isDone && tw`bg-green`,
  isError && tw`bg-red`,
]);
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-screen
  justify-between
`;
const Container = tw.div`
  flex flex-col gap-100 pt-24
`;
const Sector = tw.div`
  flex flex-col flex-center
`;
const TitleContainer = styled.div<Props>(({ isDone, isError }) => [
  (isDone || isError) && tw`opacity-0`,
]);
