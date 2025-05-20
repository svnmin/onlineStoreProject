"use client"

import { addProducts } from "@/api/api";
import { uploadImg } from "@/api/imageupload";
import { CategoryContext } from "@/context/categorycontext";
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components";


export default function UploadPage(){

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fileRef = useRef();
    //파일에 있는 값을 비울 때에는 ref로 돔을 직접적으로 컨트롤 하는 방식으로 접근
    
    const {categoryList} = useContext(CategoryContext);
    const color = [
        '#CB0404','#F4631E','#FFB22C','#309898','#27548A','#183B4E','#ffffff','#dddddd','#aaaaaa','#000000'
    ]

    const [products, setProducts] = useState({
        title : "",
        price : "",
        option : "",
        category : "",
        colors : [],
    })

    useEffect(() => {
        if(!file){
            setPreview(null);
            return
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => {
            URL.revokeObjectURL(objectUrl)
        }
    },[file])

    
    const productInfoChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target
        if(name === 'file' && files && files[0]){
            setFile(files[0])
        }
        setProducts(prev => ({...prev,[name]:value}))
    }
    const colorPicker = (color) => {
        setProducts((prev) => ({
            ...prev, colors : prev.colors.includes(color) ?
            prev.colors : [...prev.colors, color]
            //includes  : 문자열이 다른 문자열에 포함되어 있는지 확인하는 메서드
        }))
    }
    const handleUpload = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccess(null);
        setError(null);
        try{
            const url = await uploadImg(file)
            await addProducts(products,url);
            setSuccess('업로드가 완료되었습니다.');
            setTimeout(() => {
                setSuccess(null)
            },2000)
            setFile(null);
            setProducts({
                title : "",
                price : "",
                option : "",
                category : "",
                colors : [],
            })
            if(fileRef.current){
                fileRef.current.value = ''
            }

        }catch(error){
            console.error(error);
            setError('업로드에 실패했습니다.')
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <Container>
            <Title>제품 업로드</Title>
            <ImgUploadWrapper>
                {file && <img src={preview} alt="image"/>}
                {/* URL.createObjectURL(file) : URL에서 받아온 이미지 링크주소를 렌더링*/}
                {/* 데이터베이스에 이미지가 등록되기 전에 미리보기 하는 기능 */}
            </ImgUploadWrapper>
            <Form onSubmit={handleUpload}>
                <Input 
                    type="file"
                    name="file"
                    accept="images/*"
                    //accept="images/*" 속성은 파일입력에서 이미지 파일만 선택할 수 있도록 브라우저에게 제시(png,jpg,gif 같은 여러 이미지 확장자를 허용)
                    onChange={productInfoChange}
                    ref={fileRef}
                />
                <Input
                    type="text"
                    name="title"
                    placeholder="상품명을 입력하세요"
                    value={products.title}
                    onChange={productInfoChange}
                />
                {/* 상품명 */}
                <Input
                    type="text"
                    name="price"
                    placeholder="상품가격을 입력하세요"
                    value={products.price}
                    onChange={productInfoChange}
                />
                <select 
                    name="category"
                    value={products.category}
                    onChange={productInfoChange}
                >
                    <option value="">분류 선택</option>
                    {categoryList.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>

                <Input
                    type="text"
                    name="option"
                    placeholder="상품 옵션을 ,로 구분해서 입력하세요"
                    value={products.option}
                    onChange={productInfoChange}
                />
                <ColorChip>
                    {color.map((item,idx) => (
                        <div 
                            className="colorChipItem" 
                            key={idx} 
                            style={{backgroundColor:item}}
                            onClick={() => colorPicker(item)}
                        />
                    ))}
                </ColorChip>
                <ColorSelect>
                    {products.colors.map((item,idx) => (
                        <div key={idx} style={{backgroundColor:item}}>{item}</div>
                    ))}
                </ColorSelect>

                <SubmitButton type = "submit" disabled={isLoading}>
                    {isLoading ? '업로드 중' : '제품등록하기'}
                </SubmitButton>
                {success && (<ResultText>{success}</ResultText>)}
                {error && (<ResultTextErr>{error}</ResultTextErr>)}
            </Form>
        </Container>
    )
}

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 0px;
    display: flex;
    gap: 40px;
`
const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    color: #56b3ff;
`
const ImgUploadWrapper = styled.div`
    max-width: 500px;
    img{
        display: block;
        width: 100%;
        height: auto;
    }
`
const Form = styled.form`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
`
const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    padding: 6px 12px;
    border-radius: 4px;
    border: solid 1px rgba(0.,0,0,0.5);
`
const SubmitButton = styled.button`
    padding: 12px;
    border: none;
    background: #56b3ff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
`
const ColorChip = styled.div`
    display: flex;
    gap: 6px;
    .colorChipItem{
        width: 20px;
        height: 20px;
    }
`
const ColorSelect = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    div{
        width: 100px;
        height: 30px;
        color: #fff;
        border: solid 1px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
const ResultText = styled.p`
    color: teal;
`
const ResultTextErr = styled.p`
    color: #e90890;
`