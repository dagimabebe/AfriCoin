import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Web3 from 'react-native-web3';

export default function WalletScreen() {
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        const fetchBalance = async () => {
            const web3 = new Web3('https://goerli.infura.io/v3/YOUR_INFURA_KEY');
            const accounts = await web3.eth.requestAccounts();
            const ethBalance = await web3.eth.getBalance(accounts[0]);
            setBalance(web3.utils.fromWei(ethBalance, 'ether'));
        };
        fetchBalance();
    }, []);

    return (
        <View>
            <Text>Account Balance: {balance} ETH</Text>
            <Button title="Refresh" onPress={() => fetchBalance()} />
        </View>
    );
}
