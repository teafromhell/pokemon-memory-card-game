import React from 'react'
import './End.scss'

function End({fetchData}) {
  return (
    <div className='end'>
        <div className='end__window'>
        <b>You match all Pokemon</b>
        <button onClick={fetchData} >Play again?</button>
        </div>
    </div>
  )
}

export default End