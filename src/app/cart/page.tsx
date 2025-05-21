"use client"
import CartListItem from "@/components/cartItem";
import useCart from "@/service/useCart"
import { CartItem } from "@/types/type";
import { FormatCurrency } from "@/utility/formatCurrency";
import styled from "styled-components";


export default function CartPage(){

    const {cartInfo} = useCart();
    const products : CartItem[] = cartInfo.data ?? [];
    const isItem : boolean = products.length > 0;

    const totalPrice = products.reduce(
        (sum,item) => sum + item.price * item.quantity,0)

    return(
        <Container>
            <h2>장바구니 리스트</h2>
            {!isItem ? (
                <p>장바구니에 상품이 없습니다.</p>
            ) : (
                <CartList>
                    {products.map((el,idx) => (
                        // <p key={el.id}>{el.title}</p>
                        <CartListItem key={el.id} product={el} index={idx}/>
                    ))}
                </CartList>
            )}
            <SummaryWrap>
                <span>총 합계 </span>
                <strong>{FormatCurrency(totalPrice)}원</strong>
            </SummaryWrap>
        </Container>
    )
}

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 0;
    h2{
        font-size: 20px;
        color: #56b3ff;
        margin-bottom: 20px;
    }
`
const CartList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-top: solid 1px rgba(0,0,0,0.2);

`
const SummaryWrap = styled.div`
    
`