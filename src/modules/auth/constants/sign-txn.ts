import algosdk from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { getWalletConnectConnector } from "../../common/constants/connector";
// import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { convertUtf8ToHex } from "@walletconnect/utils";
import { SignWCTxnProps } from "../types";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { toast } from "react-toastify";
// import nacl from "tweetnacl";
// import { convertUtf8ToHex } from "@walletconnect/utils";
// import { str2buffer, buffer2str } from 'string-encode';
const { buffer2str } = require('string-encode');

interface Payload {
    message?: string;
    signature: string;
    wallet: string;
}

export const makePaymentTxn = async (address: string) => {
    const receiverAddress = process.env.REACT_APP_ALGO_ADDRESS!;
    const algodClient = new algosdk.Algodv2("", process.env.REACT_APP_ALGO_URL, '');
    const suggestedParams = await algodClient.getTransactionParams().do();
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams: {
            ...suggestedParams
        },
        from: address,
        to: receiverAddress,
        amount: 0,
        note: undefined
    });
    return txn;
}

export const signMyAlgoTxn = async (
    address: string,
    callback: (payload: Payload) => void
) => {
    try {
        const txn = await makePaymentTxn(address);
        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
        
        const signedDecoded = algosdk.decodeSignedTransaction(signedTxn.blob);
        if (signedDecoded.sig === undefined) {
            throw new Error("Missing signature!");
        }

        const message = signedDecoded.txn.bytesToSign();
        const signature = signedDecoded.sig;
        // const verifyKey = algosdk.decodeAddress(address).publicKey;
        // const verifies = nacl.sign.detached.verify(message, signature, verifyKey);
        // console.log(verifies);
        const stringMsg = buffer2str(message, false);
        const stringSignature = buffer2str(signature, false);

        const payload: Payload = {
            message: stringMsg,
            signature: stringSignature,
            wallet: address
        }

        await callback(payload);
    } catch(err) {
        console.error(err)
    }
}

export const signWalletConnectTxn = async (
    obj: SignWCTxnProps,
    callback: (payload: Payload | null, network: string | null) => void
) => {
    const connector = await getWalletConnectConnector();
    const msgParams = [
        convertUtf8ToHex(obj.message), // Required
        obj.address, // Required
    ];

    try {
        if (obj.walletType === "Algorand") {
            const txn = await makePaymentTxn(obj.address);
            // Sign transaction
            // txns is an array of algosdk.Transaction like below
            // i.e txns = [txn, ...someotherTxns], but we've only built one transaction in our case
            const txns = [txn]
            const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");

                return {
                    txn: encodedTxn,
                    message: obj.message,
                    // Note: if the transaction does not need to be signed (because it's part of an atomic group
                    // that will be signed by another party), specify an empty singers array like so:
                    // signers: [],
                };
            });

            const requestParams = [txnsToSign];

            const request = await formatJsonRpcRequest("algo_signTxn", requestParams);
            const result: Array<string | null> = await connector.sendCustomRequest(request);
            const decodedResult = await result.map(element => {
                return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
            });

            const signedDecoded = decodedResult[0] ? algosdk.decodeSignedTransaction(decodedResult[0]) : null;
            if (!signedDecoded) {
                throw new Error("Missing signature!");
            }
    
            const message = signedDecoded.txn.bytesToSign();
            const signature = signedDecoded.sig;
            const stringMsg = buffer2str(message, false);
            const stringSignature = buffer2str(signature, false);

            const payload: Payload = {
                message: stringMsg,
                signature: stringSignature,
                wallet: obj.address
            }
    
            await callback(payload, "algorand");
        } else {
            connector.signPersonalMessage(msgParams)
                .then((result) => {
                    // Returns signature.
                    const payload = {
                        message: obj.message,
                        signature: result,
                        wallet: obj.address
                    }
                    callback(payload, "bsc")
                })
                .catch((error) => {
                    // Error returned when rejected
                    console.error(error);
                });
        }

    } catch(err) {
        console.error("Awits " + err);
        callback(null, null);
        toast.error("Operation Cancelled");
        connector.killSession();
    }
}
