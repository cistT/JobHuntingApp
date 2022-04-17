
const deleteData=async<T>(url:string,data:T)=>{
    const response=await fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    // window.alert("削除が完了しました");
}

export default deleteData;