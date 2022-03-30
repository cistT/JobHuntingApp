import { useEffect, useRef, VFC } from "react";

const useEffectCustom:
    (func:()=>void, dependencyList:any)=>void = (func, dependencyList) => {
  const fisrtFlgRef = useRef(true);

  useEffect(() => {
    if (!fisrtFlgRef.current) {
      func();
    } else {
      fisrtFlgRef.current = false;
    }
  }, dependencyList);
};

export default useEffectCustom;

//useEffect 初回レンダリングで走るな!!!
//https://qiita.com/irico/items/4b2ff1c25b49ea6a4abf