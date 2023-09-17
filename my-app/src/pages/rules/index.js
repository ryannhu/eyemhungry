import React from "react";
import { useRouter, withRouter } from "next/router";
import GoBackButton from "@/components/backbutton";

const Rules = () => {

  const router = useRouter()
  const clickedAdHawk = () => {
    router.push(`https://www.adhawkmicrosystems.com/`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">
      <div className="fixed top-0 left-0 p-4">
        <GoBackButton prev={"homepage"} colour={"text-HTN-primary-colour"}/>
      </div>

      <span className="font-semibold text-5xl">RULES</span>
      <div className="flex flex-col gap-1 text-center justify-center items-center">
        <span className="font-normal text-lg flex flex-row">Using your &nbsp; 
        <button>
          <p className="font-bold text-HTN-primary-colour underline decoration-2" onClick={clickedAdHawk}> AdHawk </p>
        </button> &nbsp; Mindlink Glasses...</span>
        
        <div className="flex flex-col gap-5 text-center">
          <span className="font-medium text-3xl">1. Move your eyes up, down, or side to side to move Eye</span>
          <span className="font-medium text-3xl">2. Eat as many food items as you can by touching them</span>
          <span className="font-medium text-3xl">3. Be fast! You only have 30 seconds!</span>
        </div>
        <img src="/images/Eye-red.png" style={{ "width": "500px"}}/>
        <span className="font-medium text-3xl"></span>
      </div>


    </div>
  )
}

export default withRouter(Rules)