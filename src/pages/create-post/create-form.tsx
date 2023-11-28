import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc,collection} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const CreateForm=()=>{

    interface createFormData{
        title:string,
        description:string,
    }

    const schema=yup.object().shape({
        title : yup.string().required("You must add a title"),
        description : yup.string().required("You must add a description."),
    });

    const {register,handleSubmit,formState:{errors}} =useForm<createFormData>({
        resolver:yupResolver(schema),
    });

    const postRef=collection(db,"posts");
    const [user]=useAuthState(auth);

    const createPosts=async (data:createFormData)=>{
        await addDoc(postRef,{
            ...data, 
            username:user?.displayName,
            userId:user?.uid,
        });

    }

    return (
        <form onSubmit={handleSubmit(createPosts)}>
            <input placeholder="Title..."{...register("title")}/>
            <p style={{color:"red"}}>{errors.title?.message}</p>
            <textarea placeholder="Description..."{...register("description")}/>
            <p style={{color:"red"}}>{errors.description?.message}</p>
            <input type="Submit"/>
        </form>
    );
};