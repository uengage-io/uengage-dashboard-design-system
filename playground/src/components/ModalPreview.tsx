import {Button, Modal} from "@uengage/ui"
import { useState } from "react";

export default function Modalprev(){
    const [open,setOpen] =useState(true);

    return (
        <>
        <Button onClick={()=>{setOpen(true)}}>Open Modal</Button>
        <Modal isOpen={open} onClose={()=>{setOpen(false)}} size="small" title="Hello World"  >

            <h1>Hello World</h1>
        </Modal>
        </>
    );
}