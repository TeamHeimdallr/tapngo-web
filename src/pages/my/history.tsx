import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { COLOR } from '~/assets/colors';
import { TYPE } from '~/assets/fonts';
import { Divider } from '~/components/divider';
import { IconLogout } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { parseNumberWithComma } from '~/utils/number';

export const History = () => {
  const navigate = useNavigate();
  const [isHistory, setIsHistory] = useState(true);
  const [isNft, setIsNft] = useState(false);

  const handleClick = e => {
    const id = e.target.id;
    if (id === 'nft') {
      setIsNft(true);
      setIsHistory(false);
    } else {
      setIsNft(false);
      setIsHistory(true);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <TitleContainer>
          <Text type={TYPE.SB_24}>내 지갑</Text>
          <IconContainer onClick={() => navigate('/my')}>
            <IconLogout />
          </IconContainer>
        </TitleContainer>
        <Divider bottom={40} />
        <AssetWrapper>
          <AssetContainer>
            <Text type={TYPE.R_14}>마이페이지</Text>
            <Divider bottom={4} />
            <Text type={TYPE.SB_20}>₩ {parseNumberWithComma(10000)}</Text>
            <TextWrapper>
              <Text type={TYPE.R_12}>0.01 ETH</Text>
            </TextWrapper>
          </AssetContainer>
        </AssetWrapper>
        <Divider bottom={40} />
        <MenuWrapper>
          <MenuContainer clicked={isHistory} id="history" onClick={handleClick}>
            <Text id="history" type={TYPE.SB_14} color={!isHistory ? COLOR.GRAY4 : undefined}>
              거래내역
            </Text>
            <Border id="history" clicked={isHistory} />
          </MenuContainer>
          <MenuContainer clicked={isNft} id="nft" onClick={handleClick}>
            <Text id="nft" type={TYPE.SB_14} color={!isNft ? COLOR.GRAY4 : undefined}>
              나의 NFT
            </Text>
            <Border id="nft" clicked={isNft} />
          </MenuContainer>
        </MenuWrapper>
        <Divider bottom={24} />
        <CardWrapper>
          {isHistory &&
            [1, 2, 3].map(v => {
              return (
                <HistoryCardWrapper key={v}>
                  <HistoryCardContainer>
                    <Row_1>
                      <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                        날짜
                      </Text>
                    </Row_1>
                    <Row_2>
                      <Text type={TYPE.R_14}>이름</Text>
                      <Text type={TYPE.SB_14}>+{parseNumberWithComma(9999)} 원</Text>
                    </Row_2>
                    <Row_3>
                      <Text type={TYPE.R_12} color={COLOR.GRAY6}>
                        0.01 ETH
                      </Text>
                    </Row_3>
                  </HistoryCardContainer>
                </HistoryCardWrapper>
              );
            })}
        </CardWrapper>
        <NftWrapper>
          {isNft &&
            [1].map(v => {
              return (
                <NftContainer key={v}>
                  <Image src="/poap.png" />
                  <TextContainer>
                    <Text type={TYPE.SB_14}>SWF 2023 해커톤 참가</Text>
                    <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                      2023년 7월 31일
                    </Text>
                  </TextContainer>
                </NftContainer>
              );
            })}
        </NftWrapper>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = tw.div`
  w-360 px-16 pt-60
  flex flex-col 
`;

const AssetWrapper = tw.div`
  w-full h-122 p-24
  flex flex-col 
  bg-green rounded-8
`;
const AssetContainer = tw.div`
  flex flex-col
`;
const TextWrapper = tw.div`
  text-gray6
`;
const MenuWrapper = tw.div`
  flex gap-8
`;
interface Props {
  clicked?: boolean;
}
const MenuContainer = styled.div<Props>(() => [
  tw`
    w-160 flex flex-col flex-center gap-12
    clickable
  `,
]);

const Border = styled.div<Props>(({ clicked }) => [
  tw`
    border-1 border-solid border-gray7
    w-full
  `,
  !clicked && tw`opacity-0`,
]);

const CardWrapper = styled.div(() => [
  tw`
    flex flex-col gap-12
  `,
]);

const HistoryCardWrapper = styled.div(() => [
  tw`
    bg-gray1 py-16 px-20
    rounded-8
  `,
]);

const HistoryCardContainer = tw.div`
  flex flex-col 
`;
const Row_1 = tw.div`
  
`;
const Row_2 = tw.div`
  flex justify-between
`;
const Row_3 = tw.div`
  flex justify-end
`;

const NftWrapper = tw.div`
  flex gap-16
`;
const NftContainer = tw.div`
  flex flex-col gap-12
`;
const Image = tw.img`
  w-156 h-156
`;
const TextContainer = tw.div`
  flex flex-col
`;
const TitleContainer = tw.div`
  flex justify-between
`;
const IconContainer = tw.div`
  clickable
`;
