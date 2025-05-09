


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase();

provider.setCustomParameters({
    //setCustomParameters   :   인증 요청에 대한 사용자 정의 파라미터값 설정
    prompt : 'select_account'
})

//구글 로그인
export async function googleLogin(){
    try{
        const result = await signInWithPopup(auth, provider);
        //signInWithPopup() :   firebase자체에 있는 인증 객체 provider를
        //인자로 받아서 구글계정 연동으로 로그인할 수 있게 해주는 메서드
        const user =result.user;
        return user;
    }catch(error){
        console.error(error);
    }
}

//구글 로그아웃
export async function googleLogout(){
    try{
        await signOut(auth);
    }catch(error){
        console.error(error)
    }
}

//로그인 정보 유지(새로고침해도 로그인 유지)

// export function onUserState(callback){
//     onAuthStateChanged(auth,async(user) => {
//         if(user){
//             try{
//                 callback()
//             }catch(error){
//                 console.error(error)
//             }
//         }
//     })
// }

export {database};