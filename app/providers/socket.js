import * as React from "react";
import Settings from "../config/settings"
import { SafeAreaProvider } from "react-native-safe-area-context";


export const SocketContext = React.createContext()

export default function SocketProvider ({ children }) {
    
    const [socketUrl] = React.useState(Settings.SOCKET_API);
    const [serverState, setServerState] = React.useState('Loading...');
    const [serverMessages, setServerMessages] = React.useState([]);
    const [ws, setSocket] = React.useState(null);
    

    const reconnect = React.useCallback(() => {
        const serverMessagesList = [];
        const wss = new WebSocket(socketUrl)
        wss.onopen = () => {
          console.log('connected')
            setServerState('Connected to the server')
          };
          wss.onclose = (e) => {
            console.log('close--', e)
            setServerState('Disconnected. Check internet or server.')
          };
          wss.onerror = (e) => {
            console.log('error--', e)
            setServerState(e.message);
          };
          wss.onmessage = (e) => {
            serverMessagesList.push(e.data);
            setServerMessages([...serverMessagesList])
          };
         setSocket(wss)
    },[])

    React.useEffect(() => {
        reconnect()
    }, [])


  
    return (
        <SafeAreaProvider>
            <SocketContext.Provider value={{
                serverState,
                ws,
                serverMessages,
                reconnect
            }}>
               {children}
            </SocketContext.Provider>
        </SafeAreaProvider>
    );
  }