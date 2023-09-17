import React from "react";
import { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";

import 'tailwindcss/tailwind.css'; // fix config file and then remove this line
import HTNButton from "@/components/HTNButton";

const Homepage = ({ }) => {

  const router = useRouter()
  const [clickedPlay, setClickedPlay] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isVisible) {
      // Wait for the fade-out animation to complete before hiding the element
      const timeout = setTimeout(() => {
        setIsVisible(false)
      }, 300) // Adjust the duration to match your animation duration

      return () => clearTimeout(timeout)
    }
  }, [isVisible])

  const handleFadeOut = () => {
    setIsVisible(false)
  }

  const clickPlay = () => {
    setClickedPlay(true)

    setTimeout(() => {
      router.push(`/game`);
    }, 2500);
  }

  const clickRules = () => {
    router.push(`/rules`);
  }

  return (
    <div className={`flex justify-center items-center w-full min-h-screen ${clickedPlay && "bg-black"}`}>
      <div className="flex flex-col">
        {isVisible ?
          <div className={`${clickedPlay ? "animate-fadeout" : "hover:animate-pulse"}`} onAnimationEnd={handleFadeOut}>
            <img src="/images/EYE'm-HUNGRY-logo-2.png" style={{ "width": "700px", "height": "500px" }} />
          </div> :
          <div style={{ "width": "700px", "height": "500px" }} />
        }

        <div className="flex flex-row gap-2 justify-center">
          <HTNButton text={"Rules"} onClick={clickRules}/>
          <HTNButton text={"Play"} onClick={clickPlay} />
        </div>
      </div>
      {/* <p className="text-HTN-primary-colour font-bold text-7xl">EYE'm Hungry!</p> */}
    </div>

  )
}

export default withRouter(Homepage)