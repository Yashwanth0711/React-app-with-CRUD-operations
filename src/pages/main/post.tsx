import { useAuthState } from "react-firebase-hooks/auth";
import { Posts } from "./home";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Props{
    list:Posts,
}

interface Like{
    likeId:string;
    userId:String;
}

export const Post=(props : Props)=>{
    const { list }=props ;
    const [likes,setLikes] =useState<Like[] | null>(null);
    const [user]=useAuthState(auth);
    const LikeRef=collection(db,"likes");
    const LikedDoc= query(LikeRef,where("postId","==",list?.id));

    const addLikes=async ()=>{
        const newDoc=await addDoc(LikeRef,{postId:list.id , userId:user?.uid});
        if(user){
            setLikes(
                (prev)=>prev ?
                    [...prev,{userId:user?.uid,likeId:newDoc.id}] :
                    [{userId:user?.uid,likeId:newDoc.id}]);
        }
        
    }

    const removeLike=async ()=>{
        const deleteDocQuery=query(LikeRef,
                                   where("postId","==",list.id),
                                   where("userId","==",user?.uid)
                                   );
        const deleteTheDoc=await getDocs(deleteDocQuery);
        const idOfDoc=deleteTheDoc.docs[0].id;
        const docToDelete=doc(db,"likes",idOfDoc);
        deleteDoc(docToDelete);
        if(user){
            setLikes((prev)=>prev && prev?.filter((like)=>like.likeId!==idOfDoc));
        }
    }
    const getLikes=async ()=>{
        const data=await getDocs(LikedDoc);
        setLikes(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})));
    }

    const hasUserLiked =likes?.find((like)=>like.userId===user?.uid);


    useEffect(()=>{getLikes();} , [] );

    return <div>
        <div className="title">
            <h1>{list.title}</h1>
        </div>
        <div className="description">
            <p>{list.description}</p>
        </div>
        <div className="author">
            <p>@{list.username}</p>
            <button onClick={hasUserLiked?removeLike:addLikes}>{hasUserLiked ? <>&#128078;</>:<>&#128077;</>}</button>
            {likes?.length && <p>{likes?.length}</p>}
        </div>
    </div>;
}