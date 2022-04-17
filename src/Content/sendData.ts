
const sendData=async<T>(url:string,data:T)=>{
    const response=await fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    // window.alert("登録が完了しました");
}

export default sendData;