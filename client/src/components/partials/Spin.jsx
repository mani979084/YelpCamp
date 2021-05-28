import React from 'react'
import './spin.css'

const Spin = () => {
    return (
        <div className='h-100 w-100 spin-back d-flex justify-content-center align-items-center'>
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </div>
    )
}

export default Spin
