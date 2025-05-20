"use client"

import { getCategoryProduct, Product } from "@/api/api";
import CategoryProductList from "@/components/categoryProductList";
import { useParams, usePathname } from "next/navigation"
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import NoProduct from "./noProduct";


const  CategoryPage : FC = () => {

    const { slug } = useParams() as { slug : string}
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!slug){
            setError('잘못된 경로입니다.')
            setLoading(false)
            return
        }
        setLoading(true)
        getCategoryProduct(slug)
        .then((list) =>setProducts(list))
        .catch((error) =>setError('제품을 가져오던 중에 에러가 발생했습니다.'))
        .finally(() =>setLoading(false));

    },[slug])

    return(
        <Container>
            <Title>{slug} page</Title>
            {products.length > 0 ? (
                <CategoryProductList slug={slug} products={products}/>
            ) : (
                <NoProduct/>
            )}
        </Container>
        
    )
}

export default CategoryPage;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 12px;
`
const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    color: #56b3ff;
`