import { useEffect, useState } from 'react';
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

export const Ticketing = () => {
  const navigate = useNavigate();
  const [isDone] = useState<boolean>(true);
  const [isError] = useState<boolean>(true);

  useEffect(() => {
    // TODO : connect
    // setIsDone()
  }, []);

  return (
    <Layout>
      <Wrapper isDone={isDone} isError={isError}>
        <Gnb landing />
        <Body>
          <Container>
            {isDone ? (
              isError ? (
                <IconContainer>
                  <IconCancel width={40} height={40} />
                  <Text type={TYPE.SB_16}>티켓 인증이 불가능합니다.</Text>
                </IconContainer>
              ) : (
                <IconContainer>
                  <IconCheck width={40} height={40} />
                  <Text type={TYPE.SB_16}>티켓 인증이 완료되었습니다.</Text>
                </IconContainer>
              )
            ) : (
              <>
                <IconPayed width={80} height={80} />
                <Divider bottom={24} />
                <Text type={TYPE.SB_16}>NFC 카드를 탭하여 인증을 진행해주세요.</Text>
                <Divider bottom={40} />
                <MintingWrapper>
                  <Image src="/poap.png" />
                  <TextContainer>
                    <Text type={TYPE.SB_16}>SWF 2023 해커톤 참가</Text>
                    <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                      2023년 7월 31일
                    </Text>
                  </TextContainer>
                </MintingWrapper>
              </>
            )}
          </Container>
          <ButtonFilled
            isLoading={!isDone}
            width={328}
            text="확인"
            primary={'large'}
            onClick={() => navigate('/')}
            bg={COLOR.WHITE}
          />
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
  isDone && !isError && tw`bg-green`,
  isDone && isError && tw`bg-red`,
]);
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-screen
  justify-between
`;
const Container = tw.div`
  flex flex-col pt-100
  items-center
`;
const MintingWrapper = tw.div`
  p-8 w-full bg-gray1
  flex gap-16 rounded-8
`;
const TextContainer = tw.div`
  w-full h-full flex flex-col items-start justify-center
  gap-4
`;
const Image = tw.img`
  w-80 h-80
`;
const IconContainer = tw.div`
  h-128 flex flex-col gap-44 flex-center
`;
