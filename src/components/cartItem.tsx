import useCart from "@/service/useCart"
import { CartItem } from "@/types/type"
import { FormatCurrency } from "@/utility/formatCurrency"
import React from "react"
import styled from "styled-components"



interface CartItemProps{
    product : CartItem,
    index : number
}
const CartListItem : React.FC<CartItemProps> =({ product, index }) => {

    const {addItemCart, removeItemCart} = useCart();
    const plusQuantity = () => {
        addItemCart.mutate({...product, quantity : product.quantity + 1})
    }
    const minusQuantity = () => {
        if(product.quantity < 2){
            alert('상품의 갯수는 1보다 작을 수 없습니다.')
            return
        }
        addItemCart.mutate({...product, quantity : product.quantity - 1})
    }
    const itemDelete = () => {
        removeItemCart.mutate(product.id)
    }
    return(
        <Li>
            <IndexNum>{index}</IndexNum>
            <img src={product.image} alt={product.title}/>

            <InfoWrap>
                <h3>상품명 : {product.title}</h3>
                <p className="option">옵션 : {product.option}</p>
                <Color>
                    <p>컬러</p>
                    <div className="colorChip" style={{backgroundColor : product.color}}></div>
                </Color>
                <p className="price">가격 : {FormatCurrency(product.price)}</p>
                <Quantity>
                    <span>수량 : {product.quantity}개</span>
                    <button onClick={plusQuantity}>+</button>
                    <button onClick={minusQuantity}>-</button>
                    
                </Quantity>
            </InfoWrap>
            <button className="removeBtn" onClick={()=>itemDelete(product.id)}>삭제</button>
        </Li>
    )
}

export default CartListItem

const Li = styled.li`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: solid 1px rgba(0,0,0,0.2);
    img{
        display: block;
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
`
const IndexNum = styled.p`
    width: 24px;
    text-align: center;
`
const InfoWrap = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`
const Color = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    .colorChip{
        width: 16px;
        height: 16px;
        border: solid 1px #ccc;
    }
`
const Quantity = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    button{
        background: none;
        border: none;
        
    }
`