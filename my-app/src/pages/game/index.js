import React from "react";
import { useRouter, withRouter } from "next/router";
import GoBackButton from "@/components/backbutton";

const Game = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="fixed top-0 left-0 p-4">
        <GoBackButton prev={"homepage"} colour={"text-red-900"} />
      </div>
    </div>
  )
}

export default withRouter(Game)