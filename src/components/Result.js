import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Reset } from '../redux/actions/productActions';
import { useNavigate } from 'react-router-dom';
import './Result.css';
import { motion } from 'framer-motion'





const Result = () => {
    const dispatch = useDispatch();
    const location = useNavigate();

    //import ScoresList from Redux store
    const AllScores = useSelector((state) => state.Data.TestData.scoresList)

    if (AllScores === undefined) {
        window.location.replace("/")
    }

    const Correct = useSelector((state) => state.Correct.Correct)

    //Calculate Degree Percentage
    const Degree = (Correct / 10) * 100;

    let ArrayOfLessDegrees;
    //Get an array of all the scores which are less than the degree
    ArrayOfLessDegrees = AllScores.filter((Score) => Score < Degree);

    //Get the Rank
    const Rank = (((ArrayOfLessDegrees.length) / (AllScores.length)) * 100).toFixed(2);

    const Resetting = () => {
        dispatch(Reset())
        location(`/`)
    }


    return (
        <motion.div className='ResultContainer'
            initial={{ opacity:0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, type: 'spring' }}
        >
            <p>Score : {Degree && Degree}</p>
            <p>Rank : {Rank && Rank}</p>
            <motion.button onClick={() => { Resetting() }}
            whileHover={{ scale: 1.1}}
            transition={{ duration: 2, type: 'spring' }}
            >Try Again</motion.button>
        </motion.div>
    )
}

export default Result
