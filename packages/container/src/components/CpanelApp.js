import { mount } from 'cpanel/CpanelApp';
import React from 'react';
import useMount from "../hooks/useMount";

export default (props) => {
    const { ref } = useMount({
        mount,
        ...props,
    });

    return <div data-testid="cPanel-MFE" ref={ref} />;
};
