import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import type { BlockchainProps } from 'modules/account/types';
// import useAppSelector from 'helpers/useAppSelector';
import { getPassport } from 'modules/account/apis';
import Nav from './BlockchainRecords/Nav';
import History from './BlockchainRecords/History';
import Notice from './BlockchainRecords/Notice';
import Blockchain from './BlockchainRecords/Blockchain';
import Certificates from './BlockchainRecords/Certificates';
import Attachments from './BlockchainRecords/Attachments';
import Updates from "./BlockchainRecords/Updates";
import Ownership from './BlockchainRecords/Ownership';

const Passport = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('history')
  const params: any = useParams();
  
  // const blockchainData: BlockchainProps = useAppSelector('account.blockchainData');

  useEffect(() => {
    getPassport(params.code)
  }, [params.code])

  const handleActive = (item: string) => {
    setActive(item);
    setShow(false)
  }

  return(
    <div className="w-full md:w-3/4 bg-white border border-gray-200 shadow-md rounded-lg p-5">
      <div className="flex flex-row mb-2">
        <h1 className="text-c-darkgray font-semibold text-base md:text-2xl ml-2">
          NFT Passport
        </h1>
      </div>
      <div className='md:hidden'>
        <Nav show={show} setShow={setShow} handleActive={handleActive}  />
      </div>
      <div className="md:flex flex-row hidden">
        <div className="flex flex-row space-x-6 mb-3 m-auto">
          <span 
            onClick={() => setActive('history')}
            className={`${active === 'history' ? 'text-gray-700 font-bold' : 'text-gray-500'} text-sm 
              cursor-pointer`}>
            History
          </span>
          <span 
            onClick={() => setActive('notice')}
            className={`${active === 'notice' ? 'text-gray-700 font-bold' : 'text-gray-500'} text-sm 
              cursor-pointer`}>
            Notice
          </span>
          <span 
            onClick={() => setActive('blockchain')}
            className={`${active === 'blockchain' ? 'text-gray-700 font-bold' : 'text-gray-500'} text-sm 
              cursor-pointer`}>
            Blockchain
          </span>
          <span 
            onClick={() => setActive('certificate')}
            className={`${active === 'certificate' ? 'text-gray-700 font-bold' : 'text-gray-500'} text-sm 
              cursor-pointer`}>
            Certificate
          </span>
          <span 
            onClick={() => setActive('attachment')}
            className={`${active === 'attachment' ? 'text-gray-700 font-bold' : 'text-gray-500'} text-sm 
              cursor-pointer`}>
            Attachment
          </span>
          <span 
            onClick={() => setActive('updates')}
            className={`${active === 'updates' ? 'text-gray-700 font-bold' : 'text-gray-500'} text-sm 
              cursor-pointer`}>
            Updates
          </span>
          <span 
            onClick={() => setActive('ownership')}
            className={`${active === 'ownership' ? 'text-gray-700 font-bold' : 'text-gray-500'} text-sm 
              cursor-pointer`}>
            Ownership
          </span>
        </div>
      </div>
      <div>
        {active === 'history' && <History />}
        {active === 'notice' && <Notice />}
        {active === 'blockchain' && <Blockchain />}
        {active === 'certificate' && <Certificates />}
        {active === 'attachment' && <Attachments />}
        {active === 'updates' && <Updates />}
        {active === 'ownership' && <Ownership />}
      </div>
    </div>
  )
}
export default Passport;