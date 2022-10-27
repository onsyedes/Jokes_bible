import React from 'react'
import { JokeDetails, Top10Categories } from '../components'

const JokeStats = () => {
  return (
    <>
    
<div className="row">
  <div className="column col1" >
    <JokeDetails/>
  </div>
  <div className="column col2" >
    <Top10Categories/>
  </div>
</div>
    </>

  )
}

export default JokeStats