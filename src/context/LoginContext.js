import { createContext, useState } from "react"

const LoginContext = createContext()

const LoginContextProvider = ({children}) =>{
    const [login,setLogin] = useState(false)
    const [user,setUser] = useState({})

    const updatelogin = (val)=>{
        setLogin(val)
    }
    const updateuser = (obj)=>{
        setUser(obj)
    }
    return(
        <LoginContext.Provider value={{login,updatelogin,user,updateuser}}>
            {children}
        </LoginContext.Provider>
    )
}
export {LoginContext, LoginContextProvider};
