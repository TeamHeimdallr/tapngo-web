import { useEffect, useState } from 'react';
import tw from 'twin.macro';

import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { IconChecked, IconPayed } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';

export const Minting = () => {
  const [isDone, _] = useState<boolean>(true);

  useEffect(() => {
    // TODO : connect
    // setIsDone()
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Gnb landing />
        <Body>
          <Container>
            {isDone ? <IconChecked width={80} height={80} /> : <IconPayed width={80} height={80} />}
            <Divider bottom={24} />
            {isDone ? (
              <Text type={TYPE.SB_16}>NFT 민팅이 완료되었습니다.</Text>
            ) : (
              <Text type={TYPE.SB_16}>NFC 카드를 탭하여 민팅을 진행해주세요.</Text>
            )}
            <Divider bottom={40} />
            <MintingWrapper>
              <Image src="/poap.png" />
              <TextContainer>
                <Text type={TYPE.SB_16}>SWF 2023 해커톤 참가</Text>
                <Text type={TYPE.R_12}>2023년 7월 31일</Text>
              </TextContainer>
            </MintingWrapper>
          </Container>
          <ButtonFilled isLoading={!isDone} width={328} text="확인" primary={'large'} />
        </Body>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = tw.div`
  relative 
  w-360 h-screen px-16 
`;
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
  w-full h-full flex-col flex-center
`;
const Image = tw.img`
  w-80 h-80
`;
