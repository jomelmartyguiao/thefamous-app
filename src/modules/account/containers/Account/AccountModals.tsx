import { useState, SyntheticEvent } from 'react';

import { Input } from "modules/account/components/FormComponents";
import { updateEmail, updateUsername, updatePassword } from 'modules/account/apis';
import { getProfile} from 'modules/common/apis';

let initialState = {
  username: '',
  password: '', 
}

export const UserNameModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState(initialState);

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    updateUsername(state, () => {
      getProfile();
      setIsOpen(false)
    });
  }

  return(
    <>
      {/* <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-blue-900 text-white font-semibold text-xs px-3 rounded float-right">
          Edit
      </button> */}
      {isOpen &&
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-10">
          <div className="bg-white rounded-lg w-full md:w-1/3 border border-gray-100 shadow-2xl p-5">
            <p className="text-gray-900 font-medium text-xl text-center">Change your username</p>
            <p className="text-gray-900 font-medium text-md text-center">Enter your new username and your existing password.</p>
            <div className='flex flex-col space-y-4 mt-5'>
              <Input
                type="text"
                name="username"
                label="User Name"
                value={state.username}
                handleChange={handleChange} />
              <Input
                type="password"
                name="password"
                label="Password"
                value={state.password}
                handleChange={handleChange} />
              <div className='flex flex-row space-x-2'>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white text-sm font-semibold py-2 px-4 rounded w-1/2">
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-900 text-white text-sm font-semibold py-2 px-4 rounded w-1/2">
                  Confirm
                </button>
              </div>  
            </div>
          </div>
        </div>}
    </>
  )
}

let initialEmailState = {
  email: '',
  password: '', 
}

export const EmailModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState(initialEmailState);

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSubmit = () => {
    updateEmail(state, () => {
      getProfile();
      setIsOpen(false)
    });
  }

  return(
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-blue-900 text-white font-semibold text-xs px-3 rounded float-right">
          Edit
      </button>
      {isOpen &&
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-10">
          <div className="bg-white rounded-lg w-full md:w-1/3 border border-gray-100 shadow-2xl p-5">
            <p className="text-gray-900 font-medium text-xl text-center">Enter an email address</p>
            <p className="text-gray-900 font-medium text-md text-center">Enter your new email address and your existing password.</p>
            <div className='flex flex-col space-y-4 mt-5'>
              <Input
                type="text"
                name="email"
                label="Email"
                value={state.email}
                handleChange={handleChange} />
              <Input
                type="password"
                name="password"
                label="Password"
                value={state.password}
                handleChange={handleChange} />
              <div className='flex flex-row space-x-2'>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white text-sm font-semibold py-2 px-4 rounded w-1/2">
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-900 text-white text-sm font-semibold py-2 px-4 rounded w-1/2">
                  Confirm
                </button>
              </div>  
            </div>
          </div>
        </div>}
    </>
  )
}

let initialPasswordState = {
  password: '', 
  new_password: '',
  new_password_confirmation: ''
}

export const PasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState(initialPasswordState);

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSubmit = () => {
    updatePassword(state, () => {
      setIsOpen(false)
    });
  }

  return(
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-white px-4 py-1 text-sm font-semibold bg-blue-900 rounded-md mx-auto w-1/2 md:w-8/12 lg:w-1/3">
          Change Password
      </button>
      {isOpen &&
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full z-10">
          <div className="bg-white rounded-lg w-full md:w-1/3 border border-gray-100 shadow-2xl p-5">
            <p className="text-gray-900 font-medium text-xl text-center">Enter your password</p>
            <p className="text-gray-900 font-medium text-md text-center">Enter your new email address and a new password.</p>
            <div className='flex flex-col space-y-4 mt-5'>
              <Input
                type="password"
                name="password"
                label="Password"
                value={state.password}
                handleChange={handleChange} />
              <Input
                type="password"
                name="new_password"
                label="New Password"
                value={state.new_password}
                handleChange={handleChange} />
              <Input
                type="password"
                name="new_password_confirmation"
                label="Confirm New Password"
                value={state.new_password_confirmation}
                handleChange={handleChange} />
              <div className='flex flex-row space-x-2'>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white text-sm font-semibold py-2 px-4 rounded w-1/2">
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-900 text-white text-sm font-semibold py-2 px-4 rounded w-1/2">
                  Confirm
                </button>
              </div>  
            </div>
          </div>
        </div>}
    </>
  )
}
        