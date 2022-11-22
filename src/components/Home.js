import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FetchData , Reset} from '../redux/actions/productActions';
import  './Home.css'
import {motion} from 'framer-motion'



const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchData())
    dispatch(Reset())
}, [dispatch])

  return (
    <div className='HomeContainer'>
      <motion.button 
      initial={{x:'-100vw'}}
      animate={{x:0}}
      transition={{duration:2 , type:'spring' }}
      className='StartButton'><Link to={'/Exam'}>Start Exam</Link></motion.button>
    </div>
  )
}

export default Home
