import {getDocs,collection} from 'firebase/firestore';
import { useEffect, useState } from 'react'; 
import { db } from '../../config/firebase';
import { Post } from './post';

export interface Posts{
    id:String;
    userId:string;
    title:string;
    description:string;
    username:string;
}
export const Home=()=>{
    const [postList,setPostList]=useState<Posts[] | null>(null);
    const postRef=collection(db,"posts");
    const getPost=async()=>{
        const lists=await getDocs(postRef);
        setPostList(lists.docs.map((docs)=>({...docs.data() as Posts,id:docs.id}))  );
    };

    useEffect(()=>{getPost();},[]);
    
    return <h1>{postList?.map((lists)=><Post list={lists}/>)}</h1>;
}