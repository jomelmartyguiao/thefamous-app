import { useEffect } from "react";
import { Link } from "react-router-dom";

import type { NotificationProps } from 'modules/common/types';
import useAppSelector from 'helpers/useAppSelector';
import { getNotifications } from 'modules/common/apis';
import { IconCircleInfo } from "modules/common/components/Icons";

const Activity = () => {
  useEffect(() => {
    getNotifications();
  }, [])
  
  const notificationList: Array<NotificationProps> = useAppSelector('common.notificationList');

  return(
    <>
      <div className="w-full lg:w-3/4 border rounded-md px-5 md:px-10 py-6 shadow-md">
        <div className="flex flex-row">
          <h1 className="text-c-darkgray font-semibold text-base md:text-2xl">
            Notifications
          </h1>
        </div>
        {notificationList.length === 0 ?
        <h1 className="text-c-darkgray italic text-xl w-full text-center py-10">
          <IconCircleInfo /> No notifications to display.
        </h1>
        : <>{notificationList.map((item, i) => {
            return(
              <Link 
                key={i} 
                to={`/trade/item/${item?.data?.code}`}
                className={`flex flex-col w-full p-2 ${i === 0 ? '' : 'border-t border-gray-100'} 
                hover:bg-gray-100 rounded-md`}>
                <p className="font-bold text-gray-800">
                  {item?.type}:<span className="text-gray-500 ml-1 font-semibold">
                    {item?.message} <span className='text-gray-800'>{item?.data?.code}</span>
                  </span>
                </p>
                <p className="text-gray-700 font-semibold">Price: {item?.data?.price} {item?.data?.coin}</p>
                <p className='text-right text-gray-400 text-sm'>{item.created_at}</p>
              </Link>
            );
          })}
          </>}
      </div>
    </>
  )
}
export default Activity;