
import { NavLink } from 'react-router-dom';
import { navs } from '../../constants/navs';

interface Props {
    isNavOpen: boolean;
    setIsNavOpen: (isOpen: boolean) => void;
		setIsModal: (isOpen: boolean) => void;
}

const Sidebar = ({
	isNavOpen,
	setIsNavOpen, 
	setIsModal
}: Props) => {
	
	return (
		<>
		<div 
				className={`ease-in-out duration-500 fixed top-0 left-0 w-full h-full overflow-none z-40 bg-gray-300 
				opacity-60 ${isNavOpen ? 'visible' : 'invisible'}`}
				onClick={() => setIsNavOpen(false)}></div>
		<div className={`bg-thefamous bg-no-repeat bg-center bg-contain bg-blend-difference z-50 flex flex-col items-center
			justify-center space-y-4 ease-in-out duration-500 fixed overflow-none left-0 top-0 shadow-md bg-blue-900 h-full 
			${isNavOpen ? 'w-60' : 'w-0'}`}>
			{
				isNavOpen &&
				<>
				{navs.map(({ key, to, label }) => (
					<NavLink 
						key={key} 
						to={to}
						onClick={() => setIsNavOpen(false)}
						activeClassName='text-blue-300 font-bold text-lg'
						className='text-white'
						// className={(navData) => navData.isActive ? "text-blue-300 font-bold text-lg" : "text-white" }
						>
							{label}
					</NavLink>
				))}
				<button
					onClick={() => {
						setIsModal(true);
						setIsNavOpen(false);
					}}
					className='text-white'>
						How to Buy
				</button>
				</>
			}
		</div>
		</>
	);
};

export default Sidebar;