import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [numbers, setNumbers] = useState(false)
  const [alpha, setAlpha] = useState(false)
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState("")
  const passwordRef=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let str="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    let pass=""
    if(numbers) str+="1234567890"
    if(alpha) str+="!@#$%^&*+*"
    for(let i=1;i<=length;i++){
      const pos=Math.floor(Math.random()*str.length)
      pass+=str[pos];
    }
    setPassword(pass)
    
},[numbers,alpha,length,setPassword]);
const copy=useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
})
 useEffect(()=>{passwordGenerator()},[length,numbers,alpha])


  return (
    <>
    <div className='top-3 px-14 py-5 flex-grow justify-center text-center bg-green-200 w-full max-w-max mx-auto'>
    <h1 className='text-2xl'>THIS IS A PASSWORD GENERATOR</h1>
    </div><br /><br />
    <div className='justify-center flex max-w-max bg-slate-500 mx-auto'>
      <input type="text" placeholder="PASSWORD" value={password} readOnly className='w-full py-1 px-3' ref={passwordRef} />
      <button onClick={copy} className=' transition-transform duration-100 ease-in-out active:scale-95 bg-slate px-3 py-0.5 shrink-0 text-white outline-dotted outline-black'>copy</button>
    
    <div className='fixed flex flex flex-wrap justify-center top-52 inset-x-0 px-2 gap-2'>
      <input type="range" min={6} max={20} value={length} className=' cursor-pointer' onChange={(e)=>setLength(e.target.value)}/>
      <label className=' gap-0 text-sm'>Length:{length}</label>
      <input type="checkbox" defaultChecked={numbers} id='numberInput' onChange={()=>{setNumbers((numbers)=> !numbers)}}/>
      <label className=' gap-0 text-sm'>Numbers Allowed</label>
      <input type="checkbox" defaultChecked={alpha} id='numberInput' onChange={()=>{setAlpha((alpha)=> !alpha)}}/>
      <label className=' gap-0 text-sm'>special characters Allowed</label>

    </div>
    </div>
    </>
  )
}

export default App
