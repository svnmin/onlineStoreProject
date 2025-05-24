

import { adminUser } from "@/service/admin";
import { CartItem } from "@/types/type";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { getDatabase, set, ref as databaseRef, ref, query, orderByChild, equalTo, get, DataSnapshot, remove } from "firebase/database";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export interface Product{
    id? : string,
    title : string,
    price : string | number,
    option? : string,
    category? : string,
    colors? : string[],
    image? : string,
}


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
// 로그인 정보 유지(새로고침해도 로그인 유지)
export function onUserState(callback : (user : any) => void):() => void {
    onAuthStateChanged(auth,async(user) => {
        //onAuthStateChanged = 사용자 인증 상태 변화를 체크하는 파이어베이스 훅
        if(user){
            try{
                const updateUser = await adminUser(user);
                callback(updateUser)
            }catch(error){
                console.error(error);
                callback(user);
            }
        }else{
            callback(null);
        }
    })
}
//신규회원 
export async function JoinEmail(email : string, password : string, name : string) {
    const auth = getAuth();
    try{
        const userData = await createUserWithEmailAndPassword(auth, email, password)
        const user = userData.user;
        await updateProfile(user,{
            displayName : name
        })
        await signOut(auth)
        return {success : true}
    }catch(error){
        console.error(error)
    }
}
//상품 업로드
export async function addProducts(
    product : Record<string, any>,
    imgUrl : string
):Promise<void>{
    try{
        const id = uuid()
        const productRef = ref(database, `products/${id}`)
        await set(productRef,{
            ...product,
            id,
            image : imgUrl,
            price : parseInt(product.price)
        })
    }catch(error){
        console.error(error)
    }
    
}
export async function getCategoryProduct(category : string):Promise<Product[]>{
    try{
        const productRef = ref(database,'products');
        const q = query(productRef,orderByChild('category'),equalTo(category))
        const snapshot = await get(q);
        if(snapshot.exists()){
            return Object.values(snapshot.val())
        }else{
            return []
        }
    }catch(error){
        console.error(error);
        return []
    }
}
export async function getProducts( id : string) : Promise<Product[]>{
    try{
        // const snapshot : DataSnapshot = await get(ref(database , `products/${id}`));
        // if(!snapshot.exists()) return[];
        // const data = snapshot.val() as Record<string, Product>
        // return Object.values(data);
        const productRef = ref(database, `products/${id}`)
        const snapshot : DataSnapshot = await get(productRef)
        return snapshot.exists() ? (snapshot.val() as Product) : null
    }catch(error){
        console.error(error);
        return []
    }
}
//카트 내용
export async function getCart(userId : string) : Promise<CartItem[]>{
    if(!userId){
        throw new Error('유효하지 않은 사용자입니다.')
    }
    try{
        const snapshot : DataSnapshot = await get(ref(database,`cart/${userId}`))
        if(!snapshot.exists()) return []
        const items = snapshot.val() as Record<string, CartItem>;
        return Object.values(items);
    }catch(error){
        console.error(error);
    }
}
export async function updateCart(userId : string, product : CartItem) : Promise<void> {
    if(!userId){
        throw new Error('유효하지 않은 사용자입니다')
    }if(!product?.id){
        throw new Error('유효하지 않은 상품입니다')
    }
    try{
        const cartRef = ref(database, `cart/${userId}/${product.id}`)
        await set(cartRef,product)
    }catch(error){
        console.error(error);        
    }
}
export async function removeCart(userId : string, productId : string) : Promise<void> {
    if(!userId){
        throw new Error('유효하지 않은 사용자입니다')
    }if(!productId){
        throw new Error('유효하지 않은 상품입니다')
    }
    try{
        const cartItemRef = ref(database, `cart/${userId}/${productId}`)
        await remove(cartItemRef);
    }catch(error){
        console.error(error);
    }
}
export async function getAllProducts() : Promise<Product[]> {
    try{
        const snapshot : DataSnapshot = await get(ref(database, 'products'));
        if(!snapshot.exists()) return [];
        const data = snapshot.val() as Recode<string, Product>;
        return Object.values(data)
    }catch(error){
        console.log(error)
        return [];
    }
    
}
export async function getCategoryAllProducts(category : string) : Promise<Product[]> {
    try{
        const productRef = ref(database,'products')
        const q = query(productRef, orderByChild('category'), equalTo(category))
        const snapshot : DataSnapshot = await get(q);

        if(!snapshot.exists()){
            return []
        }
        const data = snapshot.val() as Recode<string, Product>
        return Object.values(data)
    }catch(error){
        console.error(error);
        return [];
    }
}

export { database };