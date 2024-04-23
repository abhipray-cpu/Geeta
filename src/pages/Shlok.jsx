import { useLoaderData } from "react-router-dom";
import { useState,useEffect } from "react";
import LoaderJSON from '../assets/loader.json'
import ErrorJSON from '../assets/error.json'
import {Player} from '@lottiefiles/react-lottie-player'
import Logo from '../assets/icon.png'
export default function Shlok(){
   const [data,setData] = useState({})
   const [message,setMessage] = useState('')
   const[comp,setComp] = useState(1)

   const loaderData = useLoaderData()

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
            <img src={Logo} alt="Jai Shree Ram" className='w-10 h-10' />
            <h3 className=' text-orange-500 text-xl lg:text-2xl font-medium font-mono tracking-wider'>Shreemad Bhagwat Geeta</h3>
            {comp === 0  && (<div className="flex flex-col justify-center items-center w-[94vw] lg:w-[60vw]">
              <h2 className="text-orange-500 font-medium font-sans tracking-normal text-lg lg:text-lg mt-3"><strong>Chapter Number: </strong>{data.chapter}</h2>
              <h2 className="text-orange-500 font-medium font-sans tracking-normal text-lg lg:text-lg"><strong>Verse Number: </strong>{data.verse}</h2>
               
              <h3 className="text-orange-600 font-bold font-sans tracking-normal text-lg lg:text-lg mt-4 text-center">{data.slok}</h3>
              <h3 className="text-orange-600 font-medium font-sans tracking-normal text-lg lg:text-lg text-center mt-2">{data.transliteration}</h3> 
            
              <h3 className="text-orange-600 font-medium font-sans tracking-normal text-xl lg:text-2xl text-center mt-4">Translation</h3> 
               <div className="mt-4 flex flex-col justify-start items-start lg:w-[60vw]">
               <h4 className="text-orange-500 font-bold font-serif tracking-wider text-lg lg:text-xl mb-1">{data.tej.author}</h4>
               <h4 className="text-gray-600 font-sans font-normal text-base mt-2"><strong>ht:</strong>{data.tej.ht}</h4>
               </div>
               
              <div className="mt-4 flex flex-col justify-start items-start lg:w-[60vw]">
              <h4 className="text-orange-500 font-bold font-serif tracking-wider text-lg lg:text-xl mb-1 lg:w-[60vw]">{data.siva.author}</h4>
              <h4 className="text-gray-600 font-sans font-normal text-base mt-2"><strong>et:</strong>{data.siva.et}</h4>
              <h4 className="text-gray-600 font-sans font-normal text-base mt-2"><strong>ec:</strong>{data.siva.ec}</h4>
              </div>
              
              <div className="mt-4 flex flex-col justify-start items-start lg:w-[60vw]">
              <h4 className="text-orange-500 font-bold font-serif tracking-wider text-lg lg:text-xl mb-1 lg:w-[60vw]">{data.purohit.author}</h4>
              <h4 className="text-gray-600 font-sans font-normal text-base mt-2"><strong>et:</strong>{data.purohit.et}</h4>
              </div>
              
              <div className="mt-4 flex flex-col justify-start items-start lg:w-[60vw]">
              <h4 className="text-orange-500 font-bold font-serif tracking-wider text-lg lg:text-xl mb-1 lg:w-[60vw]">{data.chinmay.author}</h4>
              <h4 className="text-gray-600 font-sans font-normal text-base mt-2"><strong>hc:</strong>{data.chinmay.hc}</h4>
              </div>

              <div className="mt-4 flex flex-col justify-start items-start lg:w-[60vw]">
              <h4 className="text-orange-500 font-bold font-serif tracking-wider text-lg lg:text-xl mb-1 lg:w-[60vw]">{data.san.author}</h4>
              <h4 className="text-gray-600 font-sans font-normal text-base mt-2"><strong>et:</strong>{data.san.et}</h4>
              </div>
              
              <div className="mt-4 flex flex-col justify-start items-start lg:w-[60vw]">
              <h4 className="text-orange-500 font-bold font-serif tracking-wider text-lg lg:text-xl mb-1 lg:w-[60vw]">{data.sankar.author}</h4>
              <h4 className="text-gray-600 font-sans font-normal text-base mt-2"><strong>et:</strong>{data.sankar.et}</h4>
              <h4 className="text-gray-600 font-sans font-normal text-base mt-2"><strong>ht:</strong>{data.sankar.ht}</h4>
              <h4 className="text-gray-600 font-sans font-normal text-base mt-2"><strong>sc:</strong>{data.sankar.sc}</h4>
              </div>
            </div>)}
            {comp === 1 && (<div className='w-screen h-[70vh] flex flex-col items-center justify-center'>
                <Player
            src={LoaderJSON}
            loop
            autoplay
            speed={2}
            style={{ height: "300px", width: "300px" }}
          />
                </div>)}
                {comp === 1 && (<div className='w-screen h-[70vh] flex flex-col items-center justify-center'>
                <Player
            src={ErrorJSON}
            loop
            autoplay
            speed={2}
            style={{ height: "300px", width: "300px" }}
          />
          <h2 className=' text-orange-500 text-xl lg:text-2xl font-medium font-mono'>{message}</h2>
                </div>)}
        </div>
    </div>
   )
}

export async function loader({params}){
    try{
        const {chapter,shlok} = params;
        const url = `https://bhagavadgitaapi.in/slok/${chapter}/${shlok}/`
        const response = await fetch(url,{method:"GET"})

        if(!response.ok){
            const message = await response.json()
            return {data:"",error:message,failed:true}
        }
        const data = await response.json()
        return{data:data,error:"",failed:false}
    }
    catch(err){
        return{data:"",error:err.message,failed:true}
    }
}