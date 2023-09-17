import React from "react";

const HTNButton = ({text, onClick}) => {
  return (
    <button 
    className={`
      rounded-lg border-4 
      border-black text-black 
      hover:border-HTN-primary-colour hover:bg-HTN-primary-colour hover:text-white 
      p-2 w-36`
    }
    onClick={onClick}
    >
      <p className={`font-semibold text-lg`}>
        {text}
      </p>
    </button>
  )
}

export default HTNButton