import Logo from '../assets/icon.png'
import { useLoaderData,useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
import LoaderJSON from '../assets/loader.json'
import ErrorJSON from '../assets/error.json'
import BookJSON from '../assets/book.json'
import { Player } from '@lottiefiles/react-lottie-player' 
export default function Landing(){
    const[data,setData] = useState({})
    const[comp,setComp] = useState(1)
    const [message,setMessage] = useState("")
    const loaderData = useLoaderData()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(loaderData)
        if(loaderData && loaderData.failed === true){
            setMessage(loaderData.error)
            setComp(2)
        }
        if(loaderData && loaderData.failed === false){
            setData(loaderData.data)
            setComp(0)
        }
    },[loaderData])
    return(
        <div className="w-screen min-h-screen bg-white py-2">
            <div className="pl-3 pt-3 flex flex-col items-center">
                <img src={Logo} alt="Jai Shree Ram" className='w-20 h-20' />
                <h3 className=' text-orange-500 text-xl lg:text-2xl font-medium font-mono tracking-wider'>Shreemad Bhagwat Geeta</h3>

                {comp === 0 && (<></>)}
                {comp === 1 && (<div className='w-screen h-[70vh] flex flex-col items-center justify-center'>
                <Player
            src={LoaderJSON}
            loop
            autoplay
            speed={2}
            style={{ height: "300px", width: "300px" }}
          />
                </div>)}
                {comp === 2 && (<div className='w-screen h-[70vh] flex flex-col items-center justify-center'>
                <Player
            src={ErrorJSON}
            loop
            autoplay
            speed={2}
            style={{ height: "300px", width: "300px" }}
          />
          <h3 className='text-orange-700 font-sans font-medium text-xl lg:text-2xl mt-2'>{message}</h3>
                </div>)}
            </div>
        </div>
    )
}

export async function loader(){
    try{
        const response = await fetch("https://bhagavadgitaapi.in/chapters", { method: "get" });

        if(!response.ok){
            const message = await response.json()
            return{data:"",error:message.message,failed:true}
        }
        const data = response.json()
        return {data:data,error:"",failed:false}
    }
    catch(err){
        return{data:"",error:err.message,failed:true}
    }
}