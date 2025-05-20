import { Product as ProductType } from "@/api/api";
import { FC } from "react";
import styled from "styled-components";
import ProductItem from "./productItem";

interface ProductListProps{
    products : ProductType[]
}
const Product : FC<ProductListProps> = ({products}) => {
    return(
        <ProductList>
            {products && products.map((el) => (
                <li key={el.id}>
                    <ProductItem product={el}/>
                </li>
            ))}
        </ProductList>
    )
}

const ProductList = styled.ul`
    display: flex;
    gap: 20px 5%;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
        width: 30%;
        flex-shrink: 0;
        img{
            width: 100%;
        }
    }
`

export default Product