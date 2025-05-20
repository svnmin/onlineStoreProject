import { Product as ProductType } from "@/api/api";
import { FC, useState } from "react";
import styled from "styled-components";
import Product from "./product";

interface Props{
    slug : string,
    products : ProductType[];
}

const CategoryProductList : FC <Props> =  ({slug, products}) => {
    return(
            <ProductList>
                <Product products = {products}/>
            </ProductList>
    )
}

export default CategoryProductList

const ProductList = styled.div`
    
`
