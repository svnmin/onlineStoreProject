"use client"

import { getAllProducts } from "@/api/api";
import Product from "@/components/product";
import { useEffect, useState } from "react"
import styled from "styled-components";


export default function ProductsPage(){

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            try{
                const data = await getAllProducts();
                setProduct(data);
                console.log(data)
            }catch(error){
                console.error(error);
            }
        }
        fetchProducts()
    },[])

    return(
        <Container>
            <Product products={product}/>
        </Container>
    )
}
const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 0;
`