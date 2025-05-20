import styled from "styled-components"


export default function NoProduct(){
    return(
        <Container>
            <h2>상품이 없습니다.</h2>
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2{
        font-size: 40px;
        color: #56b3ff
    }
`