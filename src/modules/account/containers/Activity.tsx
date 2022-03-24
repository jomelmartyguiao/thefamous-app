import { useEffect } from "react";

import type { ActivityProps } from 'modules/account/types';
import useAppSelector from 'helpers/useAppSelector';
import { getActivityList } from 'modules/account/apis';
import { IconCircleInfo } from "modules/common/components/Icons";

const Activity = () => {
  useEffect(() => {
    getActivityList();
  }, [])
  
  const activityList: Array<ActivityProps> = useAppSelector('account.activityList');

  return(
    <>
      <div className="w-full lg:w-3/4 border rounded-md px-5 md:px-10 py-6 shadow-md">
        <div className="flex flex-row">
          <h1 className="text-c-darkgray font-semibold text-base md:text-2xl">
            My Activities
          </h1>
        </div>
        {activityList.length === 0 &&
        <h1 className="text-c-darkgray italic text-xl w-full text-center py-10">
          <IconCircleInfo /> No activities yet.
        </h1>}
        <div className="w-full flex flex-row">
          <div className="flex flex-col mt-2 pr-3 border-r border-gray-50">
            {activityList.slice(0, 5).map((item, i) => {
              return(
                <div key={i} className={`flex flex-row ${i !== 0 && 'border-t'} items-center border-gray-100 space-x-6 py-2`}>
                  <span className="text-xs text-gray-700">{item.created_at}</span>
                  <img src="https://ucarecdn.com/30bc3a89-8a72-42cf-94e0-f7b163af02a0/" className="w-7 h-7" alt="logo" />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-gray-500">{item.type}</p>
                    <p className="text-xs font-medium">{item.details}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex flex-col mt-2 pl-3">
            {activityList.slice(6, 10).map((item, i) => {
              return(
                <div key={i} className={`flex flex-row ${i !== 0 && 'border-t'} items-center border-gray-100 space-x-6 py-2`}>
                  <span className="text-xs text-gray-700">{item.created_at}</span>
                  <img src="https://ucarecdn.com/30bc3a89-8a72-42cf-94e0-f7b163af02a0/" className="w-7 h-7" alt="logo" />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-gray-500">{item.type}</p>
                    <p className="text-xs font-medium">{item.details}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default Activity;