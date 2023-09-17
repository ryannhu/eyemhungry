import React from "react";
import { useRouter, withRouter } from "next/router";

const Game = () => {
  return (
    <div className="bg-black min-h-screen">
      <p className="text-white">hello</p>
    </div>
  )
}

export default withRouter(Game)