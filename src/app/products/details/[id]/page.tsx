"use client"

import { getProducts, googleLogin, Product } from "@/api/api";
import { useAuthContext } from "@/context/authContext";
import useCart from "@/service/useCart";
import { FormatCurrency } from "@/utility/formatCurrency";
import { useParams } from "next/navigation";
import { title } from "process";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";


const ProductDetailPage : FC = () => {
    
    const {id} = useParams() as { id? : string}
    const {user} = useAuthContext();
    // console.log(user)
    const {addItemCart} = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selected, setSelected] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');

    useEffect(() => {
        if(!id){
            setError('제품 정보를 찾아 올 수 없습니다.')
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try{
                const data = await getProducts(id);
                if(!data) throw new Error('해당 제품이 존재하지 않습니다.');
                setProduct(data);
                console.log(data)
                console.log(product)
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    },[id])

    if(loading) return <p>로딩 중</p>
    if(error) return <p>{error}</p>
    if(!product) return null

    const handleAddCart = () => {
        if(!user){
            alert('로그인이 필요합니다.')
            googleLogin()
            return
        }
        if(!selected || selectedColor){
            alert('옵션을 모두 선택해주세요')
            return
        }
        const productToAdd = {
            id : product.id,
            title : product.title,
            price : product.price,
            image : product.image,
            option : selected,
            color : selectedColor,
            quantity : 1,
        }
        addItemCart.mutate(productToAdd,{
            onSuccess : () => {
                alert('장바구니에 추가되었습니다.')
            },
            onError : (error) => {
                alert('장바구니 추가에 실패했습니다.')
                console.error(error);
            }
        })

    }

    return(
        <Container>
            <ImgWrap>
                <img src={product.image} alt={product.title}/>
            </ImgWrap>
            <DetailWrap>
                <h3>{product.title}</h3>
                <Price>가격 : <span>{FormatCurrency(product.price)}원</span></Price>

                <div className="detailOpt">
                    <label className="labelText"htmlFor="optSelect">옵션</label>
                    <select id="opSelect" value={selected} onChange={e=>setSelected(e.target.value)}>
                        <option value=''>선택하세요</option>
                        {product.option?.split(",").map((opt) =>(
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="colorOptWrap">
                    <p>색상 선택</p>
                    <div>
                        {product.colors?.map((c) => (
                            <div className="colorDot"
                                key = {c}
                                color = {c}
                                style = {{backgroundColor : c}}
                                onClick = {() => setSelectedColor(c)}
                            >
                            </div>
                        ))}
                    </div>
                </div>
                <DetailBtns>
                <button className="cartBtn" onClick={handleAddCart}>장바구니</button>
                <button className="buyBtn">바로구매</button>
                </DetailBtns>
            </DetailWrap>
            
        </Container>
    )
}

export default ProductDetailPage;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 0;
    display: flex;
    gap: 40px;
`
const ImgWrap = styled.div`
    max-width: 800px;
    width: 100%;
    img{
        width: 100%;
        display: block;
    }
`
const DetailWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    h3{
        font-size: 24px;
        color: #000;
        font-weight: normal;
        border-bottom: solid 1px rgba(255,255,255,0.2);
        padding-bottom: 20px;
    }
    .detailOpt{
        display: flex;
        gap: 30px;
        align-items: center;
        select{
            width: 80%;
            padding: 6px;
            background: transparent;
        }
    }
    .colorOptWrap{
        display: flex;
        align-items: center;
        gap: 12px;
        height: 20px;
        >div{
            height: 100%;
            display: flex;
            gap: 20px;
            .colorDot{
                width: 20px;
                height: 100%;
            }
        }
        .colorDot{
            width: 20px;
        }
    }
`
const Price = styled.p`
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(0,0,0,0.8)
    span{
        color: rgba(0,0,0,1);
    }
`
const DetailBtns = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    button{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        cursor: pointer;
        border: none;
        background: transparent;
        &.cartBtn{
            background: #56b3ff;
        }
        &.buyBtn{
            background: #165f9c;
            color: #fff;
        }
    }
`