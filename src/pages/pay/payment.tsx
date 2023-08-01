import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import { parseEther, parseGwei } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { polygonMumbai } from 'viem/chains';

import { COLOR } from '~/assets/colors';
import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { IconChecked, IconPayed } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { publicClient, walletClient } from '~/configs/setup-contract';
import { parseNumberWithComma } from '~/utils/number';
import { sha256Hash } from '~/utils/string';

export const Payment = () => {
  const navigate = useNavigate();
  const { price } = useParams();
  const [isDone, setIsDone] = useState<boolean>(false);
  const [privateKey, setPrivateKey] = useState('');

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
    const account = privateKeyToAccount(from);

    const sentTx = await walletClient.sendTransaction({
      account,
      to,
      value: parseEther(value),
      chain: polygonMumbai,
      maxFeePerGas: parseGwei('2.5'),
      maxPriorityFeePerGas: parseGwei('1.5'),
    });

    const transaction = await publicClient.waitForTransactionReceipt({
      hash: sentTx,
    });
    console.log('transaction', transaction);

    return transaction.transactionHash;
  };

  useEffect(() => {
    transferToken({
      from: privateKey as `0x${string}`,
      to: '0x48DBa2D1b6C89Bf8234C2B63554369aDC7Ae3258',
      value: (Math.floor((10000 * Number(price)) / 2340000) / 10000).toString(),
    }).then(() => setIsDone(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateKey]);

  useEffect(() => {
    handleNfcReading();
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
              <Text type={TYPE.SB_16}>결제가 완료되었습니다.</Text>
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
              ${Math.floor((10000 * Number(price)) / 2340000) / 10000} ETH
            </Text>
          </Container>
          <ButtonFilled
            isLoading={!isDone}
            width={328}
            text="확인"
            primary={'large'}
            onClick={() => navigate('/')}
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
  flex flex-col pt-100
  items-center
`;
