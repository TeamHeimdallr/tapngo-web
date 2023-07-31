import tw from 'twin.macro';
import { parseEther, parseGwei } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { polygonMumbai } from 'viem/chains';

import { ButtonFilled } from '~/components/buttons';
import { publicClient, walletClient } from '~/configs/setup-contract';
import { TESTER_PRIVATE_KEY } from '~/constants';

const TxTestPage = () => {
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
      <ButtonFilled
        text="transfer token 0.0001 MATIC"
        primary="medium"
        onClick={() =>
          transferToken({
            from: TESTER_PRIVATE_KEY as `0x${string}`,
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
