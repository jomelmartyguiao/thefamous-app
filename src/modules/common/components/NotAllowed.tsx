import { Link } from 'react-router-dom';
import _ from 'lodash';

// import { IconCircleClose } from './Icons';
import useGetSearchLocation from '../hooks/useGetSearchLocation';
import notAllowed from 'images/not-allowed-image.png'

const PageNotFound = () => {
  const searchParams: any = useGetSearchLocation();
  
  return (
    <>
      {!_.isNil(searchParams.title) && (
        <div className="mb-4 mt-4">
          <div className="font-semibold text-lg text-green-600 text-center">
            {searchParams.title}
          </div>
        </div>
      )}
      <div className="flex w-full min-h-screenFooter items-center justify-around">
        <div className="mx-auto text-center">
          <img src={notAllowed} alt="not-allowed" className='w-1/3 mx-auto' />
          <div className="text-center mt-5">
            {/* <div className="font-medium text-lg text-green-600">
              Not Allowed
            </div> */}
            <Link to="/login" className="text-base text-blue-400">
              Please log in your account.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
