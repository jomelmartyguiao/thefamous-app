import { useState, SyntheticEvent } from 'react';
import { QRCode } from 'react-qrcode-logo';

import { Input } from "modules/account/components/FormComponents";
import Toggle from "modules/common/components/Toggle";
import { enableTwoFactor, verifyTwoFactor, disableTwoFactor } from "modules/account/apis";
import { IconExclamation, IconShieldCheck } from 'modules/common/components/Icons';

interface Props {
  data: { secret: string, url: string }
}

let initialState = {
  token: ''
}

const TwoFactorSecurity = () => {
  const [state, setState] = useState(initialState);
  const [checked, setOnChecked] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState<Props>();

  const handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setState({
      ...state,
      token: value,
    })
  }

  const handleEnable = () => {
    enableTwoFactor({}, (res: Props) => {
      setTwoFactorData(res)
    })
  }

  const handleDisable = () => {
    disableTwoFactor({}, () => {
      localStorage.removeItem("two-factor")
    })
  }

  const handleVerify = () => {
    verifyTwoFactor(state)
  }

  const twoFactor = localStorage.getItem("two-factor")
  return(
    <>
      <h1 className="text-c-darkgray font-semibold text-base md:text-2xl mb-3">
        2FA Security
      </h1>
      <div className="flex flex-col border border-gray-100 rounded-md p-5">
        <div className='flex flex-row justify-between'>
          <div className={`border ${twoFactor === '1' ? 'border-green-400 bg-green-200' : 'border-yellow-200 bg-yellow-100'} 
            rounded-md py-2 w-6/12 mb-2 text-center`}>
            {twoFactor === '1' ? <span><IconShieldCheck /> Your 2FA Security is enabled</span>
              : <span><IconExclamation /> Your 2FA Security is not enabled</span>}
          </div>
          {twoFactor === '1' &&
            <div className='flex flex-row border border-gray-200 rounded-md p-2 space-x-4 items-center'>
              <div className='flex flex-row space-x-2'>
                <span className='text-base'>Login</span>
                <Toggle checked={checked} onChecked={() => setOnChecked(!checked)} checkedLabel="ON" unCheckedLabel='OFF' />
              </div>
              <div className='flex flex-row space-x-2'>
                <span className='text-base'>Transaction</span>
                <Toggle checked={true} onChecked={() => setOnChecked(!checked)} checkedLabel="ON" unCheckedLabel='OFF' />
              </div>
            </div>}
        </div>
        <p className='text-base mb-4'>
          2FA (Two-factor Authentication) helps prevent unauthorized access to your account by requiring a one-time password before every log in attempt.
        </p>
        <button 
          type="button"
          onClick={twoFactor === '1' ? handleDisable : handleEnable}
          className={`${twoFactor === '1' ? 'bg-green-500 text-white' : 'bg-yellow-100 text-gray-700'}
            font-semibold py-2 px-4 rounded w-1/4`}>
            {twoFactor === '1' ? 'Disable 2FA Security' : 'Enable 2FA Security'}
        </button>
      </div>
      {twoFactorData?.data && 
      <>
        <h1 className="text-center text-blue-900 mt-4 mb-2 text-lg">Enable 2FA Security</h1>
        <hr className='mb-2' />
        <ul className='list-decimal px-10'>
          <li className='mb-2'>
            <p>Download the Google Authenticator app or any Authentication application for your mobile phone or desktop computer: 
              <span className="text-blue-900 font-semibold ml-1">Android</span>, 
              <span className="text-blue-900 font-semibold"> iPhone</span>, 
              <span className="text-blue-900 font-semibold"> iPad and iPod</span>, 
              <span className="text-blue-900 font-semibold"> Windows Phone</span> and 
              <span className="text-blue-900 font-semibold"> other systems including Microsoft Windows desktop</span>.
            </p>
          </li>
          <li className='mb-2'>
            <p>
              Write down this key <span className="text-blue-900 font-semibold">{twoFactorData?.data?.secret}</span> on the paper and store it safe. You will need it if you lose or change your device.
            </p>
          </li>
          <li className='mb-2'>
            <p>Install the "Google Authenticator" app. Scan QR barcode revealed below with mobile app.</p>
          </li>
          <li className='mb-2'><p>Enter the Authentication code given by your mobile app in the box.</p></li>
        </ul>
        <p className="italic font-light text-sm my-2">
          <span className="text-yellow-500 mr-1">Warning:</span> 
          If you are already added Google Authenticator to the current account before. Please remove it and scan the new QR barcode revealed below. 
        </p>
        <div className="flex flex-row">
          <div className='flex w-1/2'>
            <div className='mx-auto'>
              <QRCode 
                logoWidth={50}
                size={200}
                logoImage="https://ucarecdn.com/30bc3a89-8a72-42cf-94e0-f7b163af02a0/"
                value={twoFactorData?.data?.url} />
            </div>
          </div>
          <div className='flex flex-col w-1/2 px-16'>
            <span className='mb-3'>Enter your 2FA Temporary Token</span>
            <Input
              type="text"
              name="token"
              label="Token"
              value={state.token}
              handleChange={handleChange}
              />
            <button 
              type="button"
              onClick={handleVerify}
              className="bg-blue-900 text-white font-semibold py-1 px-2 rounded mt-2 w-1/3 ml-auto">
                Verify
            </button>
          </div>
        </div>
      </>}
    </>
  );
}
export default TwoFactorSecurity;