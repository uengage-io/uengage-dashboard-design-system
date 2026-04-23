import {Button} from "@uengage/ui"
import { set } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ButtonPreview(){
const [loading,setLoading]=useState(false)
    return(
        <>
            <Button 
            variant="primary" 
            title="Primary Button"
            size="sm"
            loading={loading}
            leftIcon={<ArrowLeft />}
            onClick={()=>{console.log("Clicking")
                setLoading(true)
                setTimeout(()=>{
                    setLoading(false)
                },2000)
                
            }}
            />
            <Button 
            variant="secondary" 
            title="Secondary Button"
            size="sm"
            leftIcon={<ArrowLeft />}
            onClick={()=>{console.log("Clicking")}}
            />
            <Button 
            variant="tertiary" 
            title="Tertiary Button"
            size="sm"
            leftIcon={<ArrowLeft />}
            onClick={()=>{console.log("Clicking")
            }}
            />
            <Button 
            variant="alertPrimary" 
            title="Alert Primary Button"
            size="sm"
            leftIcon={<ArrowLeft />}
            onClick={()=>{console.log("Clicking")}}
            />
             <Button 
            variant="alertSecondary" 
            title="Alert Secondary Button"
            size="sm"
            leftIcon={<ArrowLeft />}
            onClick={()=>{console.log("Clicking")}}
            />
             <Button 
            variant="warningPrimary" 
            title="Warning Primary Button"
            size="sm"
            leftIcon={<ArrowLeft />}
            onClick={()=>{console.log("Clicking")}}
            />

        </>
    );
}