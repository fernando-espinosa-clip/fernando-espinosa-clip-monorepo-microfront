import { mount } from 'messageCenter/MessageCenterApp';
import React from 'react';
import useMount from '../hooks/useMount';
import clipAxios from 'axios';
import { getCookie } from '../utils/storage';
import { transformObjectSnakeCaseToCamelCase } from '../utils/objectNameConverter';

clipAxios.defaults.headers.common['Authorization'] = `${getCookie('dev_access_token')}`;

clipAxios.interceptors.response.use(function (response) {
  // Cualquier código de estado que este dentro del rango de 2xx causa la ejecución de esta función
  // Haz algo con los datos de la respuesta

  if (response.data) {
    response.data = transformObjectSnakeCaseToCamelCase(response.data);
  }
  return response;
});

export default function Component(props) {
  const { ref } = useMount({
    mount,
    ...props,
    clipAxios,
    openModal: () => null,
    closeModal: () => null,
    onToast: () => null,
    loggedInfo: {},
    setPageTitle: () => null,
  });

  return <div data-testid="message-center-MFE" ref={ref} />;
}
