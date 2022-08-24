import React from 'react'

const EspCard = ({esp}) => {
  return (
    
    <div className='espCard'>
      <div className='espName'>
        <span>
          Dawid esp
        </span>  
      </div>
    
      <ul>

        <li>
          <div style={{ display: 'flex', flexflexDirection: 'row'}}>          
            <div className='status'>
            </div>
            <span className='info'>
              Temperature: 25
            </span> 
          </div>
        </li>
        <li>
          <div style={{ display: 'flex', flexflexDirection: 'row'}}>          
            <div className='status'>
            </div>
            <span className='info'>
              Humid:
            </span> 
          </div>
        </li>
        <li>
         <div style={{ display: 'flex', flexflexDirection: 'row'}}>          
            <div className='status'>
            </div>
            <span className='info'>
              Time: 
            </span> 
          </div>
        </li>
        <li>
          <div style={{ display: 'flex', flexflexDirection: 'row'}}>          
            <div className='status'>
            </div>
            <span className='info'>
            Test: 25
            </span> 
          </div>
        </li>
        <li>
          <div style={{ display: 'flex', flexflexDirection: 'row'}}>          
            <div className='status'>
            </div>
            <span className='info'>
              Test: 25
            </span> 
          </div>
        </li>
      </ul>
    <div className='espBottom'>

    </div>

  </div>


    
  )
}
export default EspCard

