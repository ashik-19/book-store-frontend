import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';


const AuthContext =  createContext();
export const useAuth = () => {
  return useContext(AuthContext)
}
const googleProvider = new GoogleAuthProvider();


//authprovider
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //register a user
    const registerUser = async (email,password) => {
         return await createUserWithEmailAndPassword(auth,email,password)
    }

    //login User
    const loginUser = async (email,password) => {
        return await signInWithEmailAndPassword(auth,email,password)
    }
    
    // sign up with google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    //logout the user
    const logout =  () => {
        return signOut(auth)
    }

    //manage user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            setCurrentUser(user);
            setLoading(false);
        
            if(user) {
                const {email,displayName,photoURL} = user;
                const userData = {
                    email,username: displayName,photo: photoURL
                }
            }
        })   

          return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser, signInWithGoogle,logout
        
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}    