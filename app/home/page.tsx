"use client"
import { useEffect } from "react"
import Homepage from "../../components/homePage"
import { setShowCustomise } from "@/store/slices/showCustomiseSlice"
import { useAppDispatch } from "@/store/hooks"


export default function Home(){
    const dispatch =useAppDispatch();
    useEffect(()=>{
        dispatch(setShowCustomise(true));
    })
    return <Homepage/>
}