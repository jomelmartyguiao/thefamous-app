import { memo, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from './Nav';
import { getNavList } from 'modules/common/constants/menu-list';
import useAppDispatch from 'helpers/useAppDispatch';
import { resetAuth } from 'modules/common/reducers';

const Menu = memo(() => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onLogout = () => {
    localStorage.clear();
    dispatch(resetAuth(false));
    history.push('/');
  };

  return (
    <div className="pt-12 w-1/2 mx-auto">
      {getNavList().map((item) => (
        <Fragment key={item.key}>
          {item.href ? (
            <div className="text-left mb-4">
              <a
                className="font-light text-base capitalize focus:outline-none"
                target="_blank"
                rel="noreferrer"
                href={item.href}
              >
                {item.label}
              </a>
            </div>
          ) : (
            <Nav to={item.to} subNavs={item.subNavs}>
              {item.label}
            </Nav>
          )}
        </Fragment>
      ))}
      <div className="text-left">
        <button
          className="font-light text-base text-red-400 focus:outline-none"
          style={{ height: 22 }}
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
});

export default Menu;
