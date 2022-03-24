
import { IconMenu } from "modules/common/components/Icons";

interface Props {
  show: boolean;
  setShow: any;
  handleActive: any;
}

const Nav = ({ show, setShow, handleActive }: Props) => {
  return(
    <div className="relative inline-block text-left dropdown">
      <span className="rounded-md shadow-sm">
        <button 
          className="inline-flex w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 
            transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-400 
            focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" 
          type="button" 
          onClick={() => setShow(!show)}
          aria-haspopup="true" 
          aria-expanded="true" 
          aria-controls="headlessui-menu-items-117">
            <IconMenu width="1.5rem" height="1.5rem" />
          </button>
      </span>
      <div className={`${show ? 'scale-100 translate-x-0 opacity-100' :' opacity-0 invisible'} dropdown-menu 
        transition-all duration-300 transform origin-top-right -translate-y-2 scale-95 z-50`}>
        <div 
          className="absolute left-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y 
            divide-gray-100 rounded-md shadow-lg outline-none z-50" 
          aria-labelledby="headlessui-menu-button-1" 
          id="headlessui-menu-items-117" 
          role="menu">
          <div className="py-1">
            <span 
              onClick={() => handleActive('history')} 
              className={`text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left 
                cursor-pointer hover:text-c-darkbrown`}
              role="menuitem">
                History
            </span>
            <span 
              onClick={() => handleActive('notice')} 
              className={`text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left 
                cursor-pointer hover:text-c-darkbrown`}
              role="menuitem" >
                Notice
            </span>
            <span 
              onClick={() => handleActive('blockchain')} 
              className={`text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left 
                cursor-pointer hover:text-c-darkbrown`}  
              role="menuitem" >
                Blockchain
            </span>
            <span  
              onClick={() => handleActive('certificate')} 
              className={`text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left 
                cursor-pointer hover:text-c-darkbrown`}  
              role="menuitem" >
                Certificates
            </span>
            <span  
              onClick={() => handleActive('attachment')} 
              className={`text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left 
                cursor-pointer hover:text-c-darkbrown`}  
              role="menuitem" >
                Attachments
            </span>
            <span  
              onClick={() => handleActive('updates')} 
              className={`text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left 
                cursor-pointer hover:text-c-darkbrown`}  
              role="menuitem" >
                Updates
            </span>
            <span  
              onClick={() => handleActive('ownership')} 
              className={`text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left
                cursor-pointer hover:text-c-darkbrown`} 
              role="menuitem">
                Ownership
              </span>
            </div>
        </div>
      </div>
    </div>
  );
}
export default Nav;