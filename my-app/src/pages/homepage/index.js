import React from "react";
import { withRouter } from "next/router";

import 'tailwindcss/tailwind.css'; // fix config file and then remove this line

const Homepage = ({}) => {
  return(
    <div className="items-center justify-center w-full h-full">
      <img src="/EYE'm-HUNGRY-logo.png" style={{ "width": "700px", "height": "500px"}}/>
      {/* <p className="text-HTN-primary-colour font-bold text-7xl">EYE'm Hungry!</p> */}
    </div>
    
  )
}

export default withRouter( Homepage )