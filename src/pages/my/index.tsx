import copy from 'copy-to-clipboard';
import { format } from 'date-fns';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';

import { useAlchemyGetNfts } from '~/api/api-contract/alchemy/get-nfts';
import { useAlchemyPostAssetTransfers } from '~/api/api-contract/alchemy/post-asset-transfers';
import { useAlchemyPostGetTokenBalance } from '~/api/api-contract/alchemy/post-get-token-balances';
import { COLOR } from '~/assets/colors';
import { TYPE } from '~/assets/fonts';
import { Divider } from '~/components/divider';
import { IconCopy, IconLogout, IconPlus, IconSwap } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { MATIC_PRICE, MUMBAI_SCANNER_URL } from '~/constants';
import { parseFloat, parseNumberWithComma, parseNumberWithUnit } from '~/utils/number';
import { truncateAddress } from '~/utils/string';
import { DATE_FORMATTER } from '~/utils/time';

const MyPage = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState('');
  const [isHistory, setIsHistory] = useState(true);
  const [isNft, setIsNft] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { data: assetTransfersData, mutateAsync: postAssetTransfers } =
    useAlchemyPostAssetTransfers();

  const { data: nftsData } = useAlchemyGetNfts({ owner: cardData }, { enabled: true });
  const ownedNfts = nftsData?.ownedNfts;

  const { data: maticData, mutateAsync: postGetTokenBalance } = useAlchemyPostGetTokenBalance();
  const maticWonRaw = Number(maticData?.balance || 0) * MATIC_PRICE.WON;
  const formattedMaticWon = Number(parseFloat(maticWonRaw, 2));
  const formattedMaticWonWithUnit =
    formattedMaticWon > 100000
      ? parseNumberWithUnit(formattedMaticWon)
      : parseNumberWithComma(formattedMaticWon);

  const handleClickAdd = () => {
    navigate('/card');
  };

  const handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;
    if (id === 'nft') {
      setIsNft(true);
      setIsHistory(false);
    } else {
      setIsNft(false);
      setIsHistory(true);
    }
  };

  const handleLogout = () => {
    const auth = localStorage.getItem('card');
    if (auth) {
      localStorage.removeItem('card');
      setCardData('');
    } else return;
  };

  const handleCopy = () => {
    copy(cardData);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const auth = localStorage.getItem('card');
    if (auth) {
      const { account } = JSON.parse(auth);
      setCardData(account);
    }
  }, []);

  useEffect(() => {
    if (!cardData) return;
    postAssetTransfers({ walletAddress: cardData as `0x${string}` });
    postGetTokenBalance({ walletAddress: cardData as `0x${string}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData]);

  return (
    <Layout>
      <Wrapper>
        {cardData ? (
          <HistoryWrapper>
            <TitleContainer>
              <Text type={TYPE.SB_24}>내 지갑</Text>
              <IconContainer onClick={handleLogout}>
                <IconSwap onClick={() => navigate('/admin')} />
                <IconLogout />
              </IconContainer>
            </TitleContainer>
            <Divider bottom={40} />
            <AssetWrapper>
              <AssetContainer>
                {isCopied ? (
                  <CopyAddressWrapper isCopied={isCopied}>
                    <Text color={COLOR.GRAY7} type={TYPE.R_12}>
                      Copied!
                    </Text>
                  </CopyAddressWrapper>
                ) : (
                  <>
                    <CopyAddressWrapper isCopied={isCopied} onClick={handleCopy}>
                      <Text color={COLOR.GRAY7} type={TYPE.R_12}>
                        {cardData.slice(0, 5) + '...' + cardData.slice(-4)}
                      </Text>
                      <IconCopy width={10} height={10} />
                    </CopyAddressWrapper>
                  </>
                )}
                <Divider bottom={4} />
                <Text type={TYPE.SB_20}>₩ {formattedMaticWonWithUnit}</Text>
                <TextWrapper>
                  <Text type={TYPE.R_12}>{`${maticData?.balance ?? 0} MATIC`}</Text>
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
                (assetTransfersData && assetTransfersData.length > 0 ? (
                  assetTransfersData.map(({ uniqueId, metadata, value, asset, from, hash }) => {
                    const time = format(
                      new Date(metadata.blockTimestamp || 0),
                      DATE_FORMATTER.yyyy_MM_dd_HH_mm_ss
                    );
                    const sent = from === cardData;
                    const unit = sent ? '-' : '+';

                    const handleOpenHashWindow = () => {
                      window.open(`${MUMBAI_SCANNER_URL}/tx/${hash}`);
                    };
                    const formattedNumber = Number(parseFloat(Number(value || 0), 4));
                    const formattedNumberWon = Number(
                      parseFloat(Number(value || 0) * MATIC_PRICE.WON, 4)
                    );

                    const formattedWithUnit =
                      formattedNumber > 100000
                        ? parseNumberWithUnit(formattedNumber)
                        : parseNumberWithComma(formattedNumber);
                    const formattedWonWithUnit =
                      formattedNumberWon > 100000
                        ? parseNumberWithUnit(formattedNumberWon)
                        : parseNumberWithComma(formattedNumberWon);

                    return (
                      <HistoryCardWrapper key={uniqueId}>
                        <HistoryCardContainer>
                          <Row_1>
                            <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                              {time}
                            </Text>
                          </Row_1>
                          <Row_2>
                            <Text type={TYPE.R_14} onClick={handleOpenHashWindow}>
                              {truncateAddress(hash as `0x${string}`)}
                            </Text>
                            <Text type={TYPE.SB_14}>{`${unit} ${formattedWonWithUnit} 원`}</Text>
                          </Row_2>
                          <Row_3>
                            <Text type={TYPE.R_12} color={COLOR.GRAY6}>
                              {`${formattedWithUnit} ${asset}`}
                            </Text>
                          </Row_3>
                        </HistoryCardContainer>
                      </HistoryCardWrapper>
                    );
                  })
                ) : (
                  <HistoryEmptyWrapper>
                    <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                      거래내역이 없습니다.
                    </Text>
                  </HistoryEmptyWrapper>
                ))}
            </CardWrapper>
            <NftWrapper empty={!ownedNfts || ownedNfts?.length === 0}>
              {isNft &&
                (ownedNfts && ownedNfts.length > 0 ? (
                  ownedNfts.map(({ contract, id, title, media, timeLastUpdated }) => {
                    const { address } = contract;
                    const { tokenId } = id;
                    const { gateway } = media[0];

                    return (
                      <NftContainer key={`${address}-${tokenId}`}>
                        <Image src={`${gateway}`} />
                        <TextContainer>
                          <Text type={TYPE.SB_14}>{title}</Text>
                          <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                            {format(new Date(timeLastUpdated), DATE_FORMATTER.yyyy_MM_dd)}
                          </Text>
                        </TextContainer>
                      </NftContainer>
                    );
                  })
                ) : (
                  <NftEmptyWrapper>
                    <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                      NFT가 없습니다.
                    </Text>
                  </NftEmptyWrapper>
                ))}
            </NftWrapper>
          </HistoryWrapper>
        ) : (
          <>
            <TitleContainer_>
              <Text type={TYPE.SB_24}>내 지갑</Text>
              <IconContainer_ onClick={() => navigate('/admin')}>
                <IconSwap />
              </IconContainer_>
            </TitleContainer_>
            <AddCardContainer onClick={handleClickAdd}>
              <IconPlus />
              <Text type={TYPE.R_14}> 카드 등록하기</Text>
            </AddCardContainer>
          </>
        )}
      </Wrapper>
    </Layout>
  );
};

export default MyPage;

const IconContainer_ = tw.div`
  clickable
`;
const TitleContainer_ = tw.div`
  flex justify-between
`;
const Wrapper = tw.div`
  w-360 px-16 pt-60 pb-72
  flex flex-col gap-40
  overflow-x-hidden
`;

const AddCardContainer = tw.div`
  h-122 w-full bg-gray1 gap-8
  flex flex-col flex-center
  clickable rounded-8

`;

const HistoryWrapper = tw.div`
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
  tw`flex flex-col gap-12 w-160 flex-center clickable`,
]);

const Border = styled.div<Props>(({ clicked }) => [
  tw`w-full border-solid border-1 border-gray7`,
  !clicked && tw`opacity-0`,
]);

const CardWrapper = styled.div(() => [tw`flex flex-col gap-12 `]);

const HistoryCardWrapper = styled.div(() => [tw`px-20 py-16 bg-gray1 rounded-8`]);

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

interface Props {
  isCopied?: boolean;
}

const CopyAddressWrapper = styled.div<Props>(({ isCopied }) => [
  css`
    background: rgba(255, 255, 255, 0.4);
  `,
  tw`
  flex gap-4 pl-8 pr-6
  items-center rounded-10
  w-100 clickable
`,
  isCopied && tw`w-58`,
]);

interface NftWrapper {
  empty?: boolean;
}
const NftWrapper = styled.div<NftWrapper>(({ empty }) => [
  tw`grid grid-cols-2 gap-16`,
  empty && tw`flex justify-center py-20`,
]);
const NftContainer = tw.div`
  flex flex-col gap-12
`;
const Image = tw.img`
  w-156 h-156 rounded-8
`;
const TextContainer = tw.div`
  flex flex-col
`;
const TitleContainer = tw.div`
  flex justify-between
`;
const IconContainer = tw.div`
  clickable flex gap-8
`;

const HistoryEmptyWrapper = tw.div`
  flex justify-center py-20
`;

const NftEmptyWrapper = tw.div`
  flex justify-center
`;
