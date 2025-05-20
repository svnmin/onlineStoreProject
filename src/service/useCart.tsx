import { useAuthContext } from "@/context/authContext"


interface CartItem{
    id : string,
    title : string,
    price : number,
    image : string,
    option : string,
    color : string,
    quantity : number
}

export default function useCart(){
    const {uid} = useAuthContext();
    //yarn add @tanstack/react-query
    //서버 상태관리 쿼리문 데이터를 동기화, 캐싱, 업데이트하는 라이브러리
    // const cartInfo = 
}