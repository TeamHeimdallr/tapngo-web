import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import transfer from '~/aa/transfer';
import { COLOR } from '~/assets/colors';
import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { IconChecked, IconPayed } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { FORMAT_NUMBER_THRESHOLD, MATIC_PRICE, MUMBAI_SCANNER_URL } from '~/constants';
import { parseFloat, parseNumberWithComma, parseNumberWithUnit } from '~/utils/number';
import { sha256Hash } from '~/utils/string';

export const PaymentPage = () => {
  const navigate = useNavigate();
  const { price } = useParams();
  const [txhash, setTxhash] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleNfcReading = async () => {
    if (typeof NDEFReader === 'undefined') {
      console.log('NFC is not supported in this browser.');
      return;
    }

    try {
      console.log('NFC Reading Start');
      const ndef = new NDEFReader();
      await ndef.scan();

      ndef.addEventListener('readingerror', () => {
        console.log('Argh! Cannot read data from the NFC tag. Try another one?');
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ndef.addEventListener('reading', (event: any) => {
        const { _, serialNumber } = event;
        // console.log(`> Serial Number: ${serialNumber}`);
        // console.log(`> Records: (${message.records.length})`);

        // TODO: AA and ZK
        const pkey = sha256Hash(serialNumber);
        setPrivateKey('0x' + pkey);
      });
    } catch (error) {
      console.error('Error while scanning NFC:', error);
    }
  };

  interface TransferToken {
    from: `0x${string}`;
    to: `0x${string}`;
    value: string;
  }
  const transferToken = async ({ from, to, value }: TransferToken) => {
    setLoading(true);
    const txHash = await transfer(from, to, value);
    setLoading(false);

    return txHash ?? '';
  };

  const getTruncatedTxhash = () => {
    let truncatedHash: string = '';
    if (txhash) {
      const frontPart = txhash.slice(0, 7);
      const backPart = txhash.slice(-4);
      truncatedHash = `${frontPart}...${backPart}`;
    }
    return truncatedHash;
  };

  useEffect(() => {
    transferToken({
      from: privateKey as `0x${string}`,
      to: '0x48DBa2D1b6C89Bf8234C2B63554369aDC7Ae3258',
      value: (Math.floor((10000 * Number(price)) / MATIC_PRICE.WON) / 10000).toString(),
    }).then(setTxhash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateKey]);

  useEffect(() => {
    handleNfcReading();
  }, []);

  const handleOpenHashWindow = () => {
    window.open(`${MUMBAI_SCANNER_URL}/tx/${txhash}`);
  };

  const maticRaw = Number(price) / MATIC_PRICE.WON;
  const formattedMaticWon = Number(parseFloat(maticRaw, 4));
  const formattedMaticWonWithUnit =
    formattedMaticWon > FORMAT_NUMBER_THRESHOLD
      ? parseNumberWithUnit(formattedMaticWon)
      : parseNumberWithComma(formattedMaticWon);

  return (
    <Layout>
      <Wrapper>
        <Gnb landing />
        <Body>
          <Container>
            {txhash ? <IconChecked width={80} height={80} /> : <IconPayed width={80} height={80} />}
            <Divider bottom={24} />
            {txhash ? (
              <Text type={TYPE.SB_16}>결제가 완료되었습니다.</Text>
            ) : isLoading ? (
              <Text type={TYPE.SB_16}>결제가 진행중입니다.</Text>
            ) : (
              <Text type={TYPE.SB_16}>NFC 카드를 탭하여 결제를 진행해주세요.</Text>
            )}
            <Divider bottom={24} />
            <div>
              <Text type={TYPE.SB_20} color={COLOR.GRAY6}>
                ₩
              </Text>
              <Text type={TYPE.SB_20}> {price && parseNumberWithComma(+price)}</Text>
            </div>
            <Divider bottom={4} />
            <Text type={TYPE.R_14} color={COLOR.GRAY6}>
              {formattedMaticWonWithUnit} MATIC
            </Text>
            {txhash && (
              <>
                <Divider bottom={24} />
                <TxhashWrapper onClick={handleOpenHashWindow}>
                  <TxhashContainer>
                    <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                      Tx Hash
                    </Text>
                    <Txhash>
                      <Text type={TYPE.R_12} color={COLOR.GRAY7}>
                        {getTruncatedTxhash()}
                      </Text>
                    </Txhash>
                  </TxhashContainer>
                </TxhashWrapper>
              </>
            )}
          </Container>
          <ButtonFilled
            isLoading={!txhash}
            width={328}
            text="확인"
            primary={'large'}
            onClick={() => navigate('/admin')}
          />
        </Body>
      </Wrapper>
    </Layout>
  );
};

export default PaymentPage;

const Wrapper = tw.div`
  relative
  w-360 h-full px-16
  overflow-x-hidden
`;
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-full
  justify-between
`;
const Container = tw.div`
  flex flex-col pt-100
  items-center
`;
const TxhashWrapper = tw.div`
  w-200 py-6 px-16 flex flex-center
  rounded-8 bg-gray1
  clickable
`;
const TxhashContainer = tw.div`
  flex gap-24
`;
const Txhash = tw.div`
  underline
`;
