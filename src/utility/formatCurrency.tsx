

export function FormatCurrency(value : number) : string {
    return value.toLocaleString("ko-KR")
    //toLocaleString() : 지역에 맞는 단위를 자동으로 구분해서 콤마를 찍어줌,
    //ko-KR 한국, en-US 미국, ja-JP 일본, zh - CN 중국
}