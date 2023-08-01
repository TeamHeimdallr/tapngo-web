import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { IconChecked, IconPayed } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';

export const Card = () => {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const [cardData, setCardData] = useState('');

  useEffect(() => {
    // if nfc event trigger
    const cardData = '01:4f:d8:24';
    if (cardData) {
      localStorage.setItem('card', cardData);
      setIsDone(true);
    }
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Gnb />
        <Body>
          <Container>
            {isDone ? (
              <>
                <IconChecked width={80} height={80} />
                <Divider bottom={24} />
                <Text type={TYPE.SB_16}>카드 등록이 완료되었습니다.</Text>
                <Divider bottom={40} />
                <CardInfoContainer>
                  <Text type={TYPE.R_12}>카드 시리얼</Text>
                  <Text type={TYPE.SB_16}>00-00-00-00</Text>
                </CardInfoContainer>
              </>
            ) : (
              <>
                <IconPayed />
                <Divider bottom={24} />
                <Text type={TYPE.SB_16}>NFC 카드를 탭하여 카드를 등록해주세요.</Text>
              </>
            )}
          </Container>
          <ButtonFilled
            onClick={() => navigate('/my')}
            isLoading={!isDone}
            width={328}
            text="확인"
            primary={'large'}
          />
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
  flex flex-col flex-center  pt-100
`;
const CardInfoContainer = tw.div`
  w-full h-96 py-24 px-8 bg-gray1
  rounded-8 flex flex-col flex-center
  gap-4
`;
