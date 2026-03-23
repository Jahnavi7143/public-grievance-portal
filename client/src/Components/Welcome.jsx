import React from "react"
import Navbar from "./Navbar"
import WelcomeContent from "./WelcomeContent"

export default function Welcome(){
    return(
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />
            <div className="flex-grow">
               <WelcomeContent />
            </div>
        </main>
    )
}