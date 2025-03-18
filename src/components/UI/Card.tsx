import React from "react"

type props = {
    children: React.ReactNode
}

const Card = ({ children }: props) => {
    return (
        <div className="container">
            {children}
        </div>
    )
}

export default Card