import {auth,provider} from '../config/firebase';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login=()=>{
    const navigte=useNavigate();
    const signIn=async()=>{
        const result=await signInWithPopup(auth,provider);
        console.log(result);
        navigte("/");
    }

    return (
        <div>
            <p>Sign In With Google</p>
            <button onClick={signIn}>SignInwithGoogle</button>
        </div>
    );
}