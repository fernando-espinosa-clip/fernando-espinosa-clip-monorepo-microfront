import { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import i18n from '../i18n';
import { DecodedURLParams } from '../utils/decodedURLParams';
import storage from '../utils/storage';

export const useMount = (props) => {
  const ref = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const { mount, ...rest } = props;
  const search = location.search.slice(1);
  useEffect(() => {
    const { onParentNavigate, onUnmount, translators } = mount(ref.current, {
      storage,
      initialPath: history.location.pathname + location.search,
      query: new DecodedURLParams(search),
      onNavigate: (props) => {
        const { pathname: nextPathname, search: nextSearch } = props;
        const { pathname } = history.location;
        const search = location.search.slice(1);
        if (pathname + search !== nextPathname + nextSearch) {
          if (history) history.push(nextPathname + nextSearch);
        }
      },
      ...rest,
    });
    if (translators) {
      i18n.addResourceBundle('en', 'dashboard', translators.en.translation.dashboard);
      i18n.addResourceBundle('es', 'dashboard', translators.es.translation.dashboard);
    }

    history.listen(onParentNavigate);
    return () => {
      onUnmount && onUnmount();
    };
  }, []);
  return { ref };
};

export default useMount;
