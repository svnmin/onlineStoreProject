

export async function uploadImg(file: File):Promise<string>{
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
    const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

    if(!preset || !url){
        throw new Error('Cloudinary 환경 변수가 설정되지 않았습니다.')
    }

    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',preset);

    const res = await fetch(url,{
        method : "POST",
        body : formData
    })

    if((!res.ok)){
        throw new Error('이미지 업로드가 실패')
    }
    const data = await res.json() as {url : string}
    console.log(data)
    console.log(data.url)
    return data.url
}