import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import logo from 'images/famousLogo.png';
import { loginMyAlgo } from '../apis';
import { signMyAlgoTxn } from '../constants/sign-txn';


const VerifyTxn = () => {
    const history = useHistory();
    const { state }: any = useLocation();
    
    useEffect(() => {
        checkIfDataExist();
        // eslint-disable-next-line
    }, []);

    const checkIfDataExist = async () => {
        if (!state) {
            history.push('/login');
        }
    }

    const onAuthorize = () => {
        // console.log(message);
        signMyAlgoTxn(state.address, (payload) => {
            loginMyAlgo(payload, (res) => {
                history.push("/profile/dashboard")
            })
        })
    }

    const onGoBack = () => {
        history.push('/login');
    }

    return (
        <div className='flex flex-col items-center mt-20 px-3 py-5'>
            <div className="border text-gray-600 border-gray-200 rounded-md w-full md:w-2/3 lg:w-1/3 py-3 px-6 text-center break-words">
                <img src={logo} alt="TheFamousLogo" className='w-20 mx-auto' />

                <h1 className='gangcrime text-lg text-c-blue py-3'>THE FAMOUS</h1>

                <div className='space-y-3 text-xs text-left mt-3'>
                    <p className='font-bold'>Welcome!</p>
                    <p className='mt-3'>Click to Authorize and accept 'The Famous' Terms of Service: <Link to="/terms" target="_blank" className='text-blue-400'>https://thefamous.xyz/terms</Link>.</p>

                    <p>Note: This request will not trigger a blockchain transaction or cost any fees. Your authentication status will reset after 24 hours.</p>

                    <div className="flex flex-col text-left">
                        <p>Wallet address:</p>
                        <p className='font-bold'>{state.address}</p>
                    </div>
                    <div className="flex flex-col text-left">
                        <p>Nonce:</p>
                        <p className='font-bold'>{state.message}</p>
                    </div>
                </div>

                <div className="mt-28">
                    <button
                        className={`bg-blue-900 w-full text-white text-xs p-3 rounded-md`}
                        onClick={onAuthorize}
                    >
                        Confirm
                    </button>
                    <button
                        className='w-full text-xs p-3 text-gray-600'
                        onClick={onGoBack}
                    >
                        No Thanks
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyTxn;