import React from "react";
import { useRouter } from "next/router";
import { HiOutlineArrowCircleLeft } from "react-icons/hi"

const GoBackButton = ({prev}) => {
  const router = useRouter();
  const goBack = () => {
    router.push(`/${prev}`)
  }

  return (
    <button className="flex flex-row items-center gap-1 text-gray-300">
      <HiOutlineArrowCircleLeft onClick={goBack} className="w-8 h-8"/>
      <p className="font-semibold text-xl">Go Back</p>
    </button>
  )
}

export default GoBackButton