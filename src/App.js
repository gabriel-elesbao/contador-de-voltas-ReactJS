import {BiPlus} from 'react-icons/bi'
import {BiMinus} from 'react-icons/bi'




import {useState, useEffect} from 'react'

import MostraVoltas from './ShowLaps'
import MostraTempo from './ShowTime'
import Button from './Button'

import './styles.css'





function App() {

  const [numVoltas,setNumVoltas] = useState(0)
  const [running, setRunning] =  useState(false)
  const [tempo,setTempo] = useState(0)

  useEffect(()=>{
    
    let timer = null
    if(running){

      timer = setInterval(()=>{
        setTempo(old => old +1)
      },500)
    }
    return ()=>{
      if(timer){ // vai retornar um truthy, valor que é convertido para verdadeiro
        clearInterval(timer)
      }
    }
  },[running]) //Ao passar o colchetes, ele so vai ser chamado na primeira vez
  
  const toggleRunning=()=>{
    setRunning(!running)
  }

  const increment = ()=>{
    setNumVoltas(numVoltas+1)
    
  }

  const decrement = ()=>{
    if(numVoltas > 0){
      setNumVoltas(numVoltas-1)
    }
    
  }

  const reset = ()=>{
    setNumVoltas(0)
    setTempo(0) 
  }


  return (
    <div className="App">
      <MostraVoltas voltas ={numVoltas}/>

      <div className='button-increments'>
        <Button className='bigger' text = {<BiPlus className='icon'  />} onClick = {increment}/>
        <Button className ='smaller' text = {<BiMinus className='icon'/>} onClick={decrement}/>
      </div>

      <div className='ControlTime'>
        
          {
            numVoltas > 0 &&
            <MostraTempo tempo={Math.round(tempo/numVoltas)} />
          }
       
         
          
      </div>
      
        <Button onClick={toggleRunning} text = {running ? 'Pausar' : 'Iniciar'}/>
        <Button onClick ={reset} text = 'Reiniciar'/>  
      
      
      
    </div>
  );
}

export default App;
