import React from "react";
import { useRouter, withRouter } from "next/router";
import GoBackButton from "@/components/backbutton";

const Rules = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">
      <div className="fixed top-0 left-0 p-2">
        <GoBackButton prev={"homepage"} />
      </div>

      <span className="font-semibold text-5xl">RULES</span>
      <div className="flex flex-col gap-1 text-center">
        <span className="font-normal text-lg">Using you AdHawk Glasses...</span>
        
        <div className="flex flex-col gap-5 text-center">
          <span className="font-medium text-3xl">1. Move your eyes up, down, or side to side to move Eye</span>
          <span className="font-medium text-3xl">2. Eat at many Fruits as you can within 30 seconds</span>
        </div>
        
        <span className="font-medium text-3xl"></span>
      </div>


    </div>
  )
}

export default withRouter(Rules)