import React from 'react'

const EspCard = ({esp}) => {
  return (
    <div className='espCard'>
        <div className='espName'>
            <span >Dawid esp</span>
            <ul>
            <li className='info'>
               temperature:{esp.Temp} 
            </li>
            <li className='info'>
                Humid:{esp.Humid}
            </li>
            <li className='info'>
              Time: {esp.Time}
            </li>
            <li className='info'>
              Test: 25
            </li>
            <li className='info'>
              Test: 25
            </li>
          </ul>
        </div>

           
        

    </div>
  )
}
export default EspCard

