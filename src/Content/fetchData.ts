// type fetchFunc<T>=(url: string,func: (data: T) =>void)=>void;

const fetchData=async<T>(url: string,func: (json: T) =>void)=>{
    const res=await fetch(url);
    const json:T=await res.json();
    func(json);
}

export default fetchData;