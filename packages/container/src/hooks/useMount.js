import { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { DecodedURLParams } from '../utils/decodedURLParams';

export const useMount = (props) => {
    const ref = useRef(null);
    const history = useHistory();
    const location = useLocation();
    const { mount, ...rest } = props;
    const search = location.search.slice(1);
    useEffect(() => {
        const { onParentNavigate, onUnmount } = mount(ref.current, {
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
        history.listen(onParentNavigate);
        return () => {
            onUnmount && onUnmount();
        };
    }, []);
    return { ref };
};

export default useMount;
