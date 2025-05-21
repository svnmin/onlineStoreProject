import { getCart, removeCart, updateCart } from "@/api/api";
import { useAuthContext } from "@/context/authContext"
import { CartItem } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { error } from "console";

export default function useCart(){
    const {uid} = useAuthContext();
    const queryClient = useQueryClient();
    //yarn add @tanstack/react-query
    //서버 상태관리 쿼리문 데이터를 동기화, 캐싱, 업데이트를 하는 라이브러리

    //장바구니 목록 조회
    const cartInfo = useQuery<CartItem[]>({
        queryKey : ["cart",uid],
        queryFn : ()=>getCart(uid),
        enabled : !!uid,
    })
    //장바구니 항목 추가
    const addItemCart = useMutation<void,Error,CartItem>({
        mutationFn : (product) => updateCart(uid!,product),
        onSuccess : () => {
            queryClient.invalidateQueries(['cart', uid])
        },
        onError : (error) => {
            console.error(error);
            
        }
    })
    //장바구니 항목 삭제
    const removeItemCart = useMutation<void, Error, string>({
        mutationFn: (productId) => removeCart(uid!, productId),
        onSuccess :() => {
            queryClient.invalidateQueries(['cart',uid])
        },
        onError :(error) => {
            console.error(error);
        }
    })
    return {addItemCart, cartInfo, removeItemCart}
}

