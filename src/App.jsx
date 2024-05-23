import './App.css'
import { useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback } from "react";
import NaoCodeContext from './main';
import SomeChild from './SomeChild';
import useLocalStorage from './useLocalStorage';


const reducer = (state, action) => { // useReduce
  switch(action.type){
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default :
      return state;
  }
}

function App() {

  //useState： 仮想DOM
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount( count + 1);
  };


  //useEffect： 発火のタイミングを決める []の中で指定
  useEffect(() => {
    console.log("Hello Hooks");
  // setCount(count +1); 無限ループになるので禁止
  }, [count])


  //useContext： どこを起点にするかを決める。Reduxのstore機能と類似。
  const naocodeInfo = useContext(NaoCodeContext);


  //useRef： 情報を取得する
  const ref = useRef();
  const handleRef = () => {
    console.log(ref);
    console.log(ref.current.value);
    console.log(ref.current.offsetHeight);
  }


  //useReducer: 前の状態から＋１０をする
  const [state, dispatch] = useReducer(reducer, 0);


  //useMemo: メモ化（ブラウザのメモリに値を保存）やたらと使わない
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // const square = () => {
  //   let i = 0;
  //   while(i < 2000000000){
  //     i++;
  //   }
  //  console.log('Clicked')
  //   return count02 * count02;
  // };

  const square = useMemo(() => {
    let i = 0;
    while(i < 200000000){ //重い処理
      i++;
    }
    console.log('Clicked')
    return count02 * count02;
  }, [count02]); //この処理を走らせたとき（count02をカウントアップのとき）だけ重い処理をするように依存関係を指定する


  //useCallback: コールバック関数をメモ化する.親だけレンダリングして子をレンダリングしないようにもできる
  // const [counter, setCounter ] = useState(0);

  // const showCount = () => {
  //   alert(`これは重い処理です`);
  // }

  const showCount = useCallback(() => {
    alert(`これは重い処理です`);
  }, [counter]);


  //customHook
  const [age, setAge] = useLocalStorage("age", 20); // LocalStorageはkeyとvalueで作成



  return (    
    <div className="App">

      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>

      <hr />

      <h1>useContext</h1>
      <p>{naocodeInfo.name}</p>
      <p>{naocodeInfo.age}</p>

      <hr />

      <h1>useRef</h1>
      <input type="text" ref={ref}/>
      <button onClick={handleRef}>useRef</button>

      <hr />

      <h1>useReducer</h1>
      <p>Count: {state} </p>
      <button onClick={() => dispatch({ type: "increment"})}>+</button>
      <button onClick={() => dispatch({ type: "decrement"})}>-</button>

      <hr />

      <h1>useMemo</h1>
      <div>Count1: {count01}</div>
      <div>Count2: {count02}</div>
      {/* <div>Result: {square()}</div> useMemo使わない場合*/} 
      <div>Result: {square}</div>
      <button onClick={() => setCount01(count01 +1)}>+</button>
      <button onClick={() => setCount02(count01 +1)}>+</button>


      <hr />

      <h1>useCallback</h1>
      {/* <SomeChild showCount={showCount} /> */}


      <hr />

      <h1>Custom Hook</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>Set Age</button>
    </div> 
  )
}

export default App
