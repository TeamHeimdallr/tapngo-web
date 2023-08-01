import { useState } from 'react';
import tw from 'twin.macro';
import { parseEther, parseGwei } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { polygonMumbai } from 'viem/chains';

import { ButtonFilled } from '~/components/buttons';
import { publicClient, walletClient } from '~/configs/setup-contract';
import { sha256Hash } from '~/utils/string';

const TxTestPage = () => {
  const [privateKey, setPrivateKey] = useState('');

  const handleNfcReading = async () => {
    if (typeof NDEFReader === 'undefined') {
      alert('NFC is not supported in this browser.');
      return;
    }

    try {
      console.log('start');
      const ndef = new NDEFReader();
      await ndef.scan();
      console.log('------');

      ndef.addEventListener('readingerror', () => {
        console.log('Argh! Cannot read data from the NFC tag. Try another one?');
      });

      ndef.addEventListener('reading', (event: any) => {
        const { message, serialNumber } = event;
        console.log(`> Serial Number: ${serialNumber}`);
        console.log(`> Records: (${message.records.length})`);

        const pkey = sha256Hash(serialNumber);
        setPrivateKey(pkey);
        console.log(pkey);
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
  };

  return (
    <Wrapper>
      <ButtonFilled text="start nfc reading" primary="medium" onClick={handleNfcReading} />
      <ButtonFilled
        text="transfer token 0.0001 MATIC"
        primary="medium"
        onClick={() =>
          transferToken({
            from: privateKey as `0x${string}`,
            to: '0x48DBa2D1b6C89Bf8234C2B63554369aDC7Ae3258',
            value: '0.0001',
          })
        }
      />
    </Wrapper>
  );
};

const Wrapper = tw.div``;

export default TxTestPage;
