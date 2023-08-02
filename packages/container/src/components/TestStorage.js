import React from 'react'
import { encryptStorage, decryptStorage } from '../utils/storage'


export const TestStorage = () => {
    encryptStorage('someObject', 'nada')
    console.log(decryptStorage('someObject'))
    return <div>Nada</div>
}

export default TestStorage