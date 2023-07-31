import { useEffect } from 'react';
import tw from 'twin.macro';
import {
  formatEther,
  parseEther,
  parseGwei,
  parseTransaction,
  serializeTransaction,
  Signature,
  TransactionSerializableEIP1559,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { mumbai, publicClient, walletClient } from '~/configs/setup-contract';
import { TESTER_PRIVATE_KEY } from '~/constants';

const TxTestPage = () => {
  const getBalance = async () => {
    const res = await publicClient.getBalance({
      address: '0x48DBa2D1b6C89Bf8234C2B63554369aDC7Ae3258',
    });

    return formatEther(res);
  };

  const serializeTx = () => {
    const serialized = serializeTransaction({
      chainId: 80001,
      gas: 21001n,
      maxFeePerGas: parseGwei('20'),
      maxPriorityFeePerGas: parseGwei('2'),
      nonce: 69,
      to: '0x48DBa2D1b6C89Bf8234C2B63554369aDC7Ae3258',
      value: parseEther('0.0001'),
    });

    return serialized;
  };

  const serializeTx2 = (parsed: TransactionSerializableEIP1559, signature: Signature) => {
    const serialized = serializeTransaction(parsed, signature);

    return serialized;
  };

  const parseTx = (tx: `0x02${string}`) => {
    const parsed = parseTransaction(tx);

    return parsed;
  };

  const signTx = async (tx: TransactionSerializableEIP1559) => {
    const account = privateKeyToAccount(TESTER_PRIVATE_KEY);
    console.log(account.address);

    const signedTx = await account.signTransaction(tx);
    console.log('signedTx', signedTx);

    const gasPrice = await publicClient.getGasPrice();
    console.log('gasPrice', gasPrice);

    // const sentTx = await walletClient.sendTransaction({
    //   account,
    //   to: '0x48DBa2D1b6C89Bf8234C2B63554369aDC7Ae3258',
    //   value: parseEther('0.01'),
    //   chain: mumbai,
    //   gas: gasPrice,
    // });
    // console.log(sentTx);
  };

  useEffect(() => {
    const balance = getBalance();
    const serialized = serializeTx();
    const parsed = parseTx(serialized);
    const signed = signTx(parsed);
  }, []);

  return <Wrapper></Wrapper>;
};

const Wrapper = tw.div``;

export default TxTestPage;
