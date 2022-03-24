import { Link } from 'react-router-dom';
import _ from 'lodash';
import imgEmptyBox from 'images/thefamous-404.png';
import useGetSearchLocation from '../hooks/useGetSearchLocation';

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
        <div className="mx-auto">
          <img
            src={imgEmptyBox}
            alt="empty-box"
            className="mx-auto mb-1 h-auto w-1/4"
          />
          <div className="text-center">
            {/* <div className="font-medium text-lg text-green-600">
              Coming Soon!
            </div>
            <div className="text-sm text-gray-400 mb-2">
              Sorry for the delays. We're nearly there.
            </div> */}
            <Link to="/" className="text-base text-blue-400">
              Go back to home page.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
