import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//useContext 起点を決める
const naocodeInfo = {
  name: "naocode",
  age: 20,
}

const NaoCodeContext = createContext(naocodeInfo);


ReactDOM.createRoot(document.getElementById('root')).render(
  <NaoCodeContext.Provider value={naocodeInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </NaoCodeContext.Provider>
)

export default NaoCodeContext;