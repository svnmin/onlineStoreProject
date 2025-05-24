import { getCategoryAllProducts } from "@/api/api";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./productItem";
import type { Product as ProductType } from '@/api/api'

interface MainCategoryProps{
    category : string,
}

export default function MainCategoryList({category} : MainCategoryProps){
    const [items, setItems] = useState<ProductType[]>([]);
    
    useEffect(() => {
        getCategoryAllProducts(category)
        .then(products => {
            setItems(products.slice(0,5))//최대 5개 까지의 상품만 노출
            console.log(products)
        })
        .catch((error) => {
            console.error(error);
            
        })
    },[category])

    return(
        <Container>
            <Title>{category}</Title>

            <List>
                {items.map((el)=>(
                    <li key={el.id}>
                        <ProductItem product={el}/>
                    </li>
                ))}
            </List>
        </Container>
    )
}
const Container = styled.div`
    max-width: 1200px;
    padding: 50px 0;

`
const Title = styled.h2`
    color: #000;
    font-size: 20px;
    text-align: center;
    margin-bottom: 12px;
`
const List = styled.ul`
    display: flex;
    justify-content: center;
    gap: 20px;
    list-style: none;
    li{
        max-width: 200px;
        flex-shrink: 0;
        width: 20%;
    }
`