import React,{useState,useCallback,useEffect} from "react";
function App() {
const [length,setLength]=useState(6)
const [numberAllowed,setnumberAllowed]=useState(false);
const [charAllowed,setcharAllowed]=useState(false);
const [password,setPassword]=useState("")

const passGenerator = useCallback(()=>{
   let pass=""
   let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
   if (numberAllowed) {
     str += "1234567890"
   }
   if (charAllowed) {
     str+= "!@#$%^&*()_+{}:<>?,./;[]-="
   }
   for (let i = 0; i < length; i++) {
    let char =Math.floor(Math.random()*str.length)
    pass += str.charAt(char)
   }
   
   setPassword(pass)
   
},[length,numberAllowed,charAllowed,setPassword])
const[copied,setCopied]=useState(false)
const copyText = useCallback( ()=>{
  window.navigator.clipboard.writeText(password)
  setCopied(true)
  setTimeout(()=>{
    setCopied(false)
  },1500)
},[password])



useEffect(()=>{
  passGenerator()
},[length,numberAllowed,charAllowed,passGenerator]
)
    return (
    <>
      <div className="relative w-full max-w-md mx-auto shadow-md rounded-lg px-2 py-9 my-4 bg-gray-700">
        <h1 className="text-center text-white text-3xl my-2">
      Password Generator</h1>
      <br/>
        <div className="flex shadow rounded-lg overflow-hidden  mb-4">
        
        <input
        type="text"
        value={password}
        className='outline-none bg-white w-full rounded  py-1 px-3'
        placeholder="Password"
       readOnly
       />
       <button 
       onClick={copyText}
       className=" text-white bg-blue-800 rounded px-4
       hover:scale-105 hover:brightness-120" >Copy</button>
       {copied && (
         <div className="absolute top-2 right-2  bg-blue-500 text-white px-3 py-1 rounded-md text-sm shadow-lg">
         Copied!
         </div>
         )}
         </div>
         <div className="flex flex-col text-md gap-y-2">
        <div className="flex items-center gap-x-3 ">
          <label className= "text-white"> Password Length : {length}
       </label>
        <input
        type="range"
        min={6}
        max={50}
        value={length}
        className="cursor-pointer w-64"
        onChange={(e)=>{setLength(e.target.value)}}
      />
       
      </div>

      <div className="flex items-center gap-x-2">
        <input
        type="checkbox"
        id="numberInput"
        dafaultChecked={numberAllowed}
        onChange={()=>{
          setnumberAllowed((prev)=>!prev);
        }}

        />
        <label htmlFor="numberInput" className="text-white">
      Include Numbers
    </label>
      </div>
      <div className="flex items-center gap-x-2">
        <input
        type="checkbox"
        id="charAll"
        dafaultChecked={charAllowed}
        onChange={()=>{
          setcharAllowed((prev)=>!prev);
        }}

        />
        <label htmlFor="charAll" className="text-white">
      Include Characters
    </label>
     </div>
    </div>
    </div>
    
    </>
    )
  
}

export default App
