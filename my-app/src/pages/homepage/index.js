import React from "react";
import { withRouter } from "next/router";

import 'tailwindcss/tailwind.css'; // fix config file and then remove this line

const Homepage = ({}) => {
  return(
    <div>
      <p className="text-HTN-primary-colour font-bold text-7xl">EYE'm Hungry!</p>
    </div>
    
  )
}

export default withRouter( Homepage )