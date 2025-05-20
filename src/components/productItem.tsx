
import { Product as ProductType } from "@/api/api";
import { FormatCurrency } from "@/utility/formatCurrency";
import { useRouter } from "next/navigation";
import { FC } from "react";
import styled from "styled-components";

interface Props{
    product : ProductType,
}


const ProductItem : FC<Props> = ({product}) => {

    const router = useRouter();
    const detailNavigate = () => {
        router.push(`/products/details/${product.id}`)
    }
    return(
        <ItemCard onClick={detailNavigate}>
            <ImgWrap>
                <img src={product.image} alt={product.title}/>
            </ImgWrap>

            <Content>
                <Title>{product.title}</Title>

                <InfoRow>
                    <Price>{FormatCurrency(product.price)}</Price>
                    <Option>{product.option}</Option>
                </InfoRow>
                <ColorRow>
                    {product.colors?.map((c,i) => (
                        <ColorDot key={i} color={c}/>
                    ))}
                </ColorRow>
            </Content>
        </ItemCard>
    )
}
export default ProductItem
const ItemCard = styled.div`
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    transition: 300ms;
    &:hover{
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }
`
const ImgWrap = styled.div`
    position: relative;
    width: 100%;
`
const Content = styled.div`
    padding: 12px;
    box-sizing: border-box;
`
const Title = styled.h3`
    font-size: 20px;
    margin-bottom: 6px;
`
const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`
const Price = styled.p`
    font-size: 16px;
`
const Option = styled.p`
    font-size: 14px;
`
const ColorRow = styled.div`
    display: flex;
    gap: 6px;
` 
const ColorDot = styled.div<{color : string}>`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({color}) => color};
    border: solid 1px #666;
`
