import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';

import { TYPE } from '~/assets/fonts';
import { Divider } from '~/components/divider';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { parseNumberWithComma } from '~/utils/number';

export const History = () => {
  const navigate = useNavigate();
  const [clicked, click] = useState(true);

  const handleClick = () => {
    click(prev => !prev);
  };

  return (
    <Layout>
      <Wrapper>
        <Text type={TYPE.SB_24}>내 지갑</Text>
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
          <MenuContainer onClick={handleClick}>
            <Text type={TYPE.SB_14}>거래내역</Text>
            <Border />
          </MenuContainer>
          <MenuContainer onClick={handleClick}>
            <Text type={TYPE.SB_14}>나의 NFT</Text>
            <Border />
          </MenuContainer>
        </MenuWrapper>
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
const MenuContainer = styled.div<Props>(({ clicked }) => [
  tw`
    w-160 flex flex-col flex-center gap-12
    clickable
  `,
  clicked && tw`text-gray4`,
]);

const Border = styled.div<Props>(({ clicked }) => [
  tw`
    border-1 border-solid border-gray7
    w-full
  `,
  !clicked && tw`opacity-0`,
]);
