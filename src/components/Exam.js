import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Check, FetchTenItems } from '../redux/actions/productActions';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';
import {  motion } from 'framer-motion'
import './Exam.css';





const Exam = () => {
    const dispatch = useDispatch();
    const location = useNavigate();

    //import All the Word List
    const AllWords = useSelector((state) => state.Data.TestData.wordList)

    if (AllWords === undefined) {
        window.location.replace("/")
    }

    //dispatch this action each time we enter the component
    useEffect(() => {
        dispatch(FetchTenItems())
    }, [dispatch])

    //Counter is the number of the current question from redux store
    const Counter = useSelector((state) => state.Counter.Counter)

    //Import the final ten random question from redux store
    const FinalTenRandom = useSelector((state) => state.FinalTen.Final)

    const Submit = () => {
        location(`/Result`)
    }

    //Check the answer by dispatching a Check action with the Answer and the Correct Answer
    const CheckTheCorrectAnswer = (Answer, CorrectAnswer) => {
        if (Answer !== CorrectAnswer) {
            document.getElementById(`${Answer}`).classList.add(`Red`)
        }
        dispatch(Check(Answer, CorrectAnswer))
    }


    return (
        <div className='ExamContainer' >
            <motion.div id='Data'
                initial={{ y: '-100vw' }}
                animate={{ y: 0 }}
                exit={{ y: '-100vw' }}
                transition={{ duration: 2, type: 'spring' }}
            >
                <div className='Word'><p >{FinalTenRandom.length > 0 && FinalTenRandom[Counter].word}</p></div>
                <div className='Buttons'>
                    <motion.button whileHover={{ scale: 1.1, originX: 0 }} transition={{ duration: 1, type: 'spring' }} value="adverb" id='adverb' onClick={(e) => { CheckTheCorrectAnswer(e.target.value, FinalTenRandom[Counter].pos) }}>adverb</motion.button>
                    <motion.button whileHover={{ scale: 1.1, originX: 0 }} transition={{ duration: 1, type: 'spring' }} value="verb" id="verb" onClick={(e) => { CheckTheCorrectAnswer(e.target.value, FinalTenRandom[Counter].pos) }}>verb</motion.button>
                    <motion.button whileHover={{ scale: 1.1, originX: 0 }} transition={{ duration: 1, type: 'spring' }} value="noun" id="noun" onClick={(e) => { CheckTheCorrectAnswer(e.target.value, FinalTenRandom[Counter].pos) }}>noun</motion.button>
                    <motion.button whileHover={{ scale: 1.1, originX: 0 }} transition={{ duration: 1, type: 'spring' }} value="adjective" id="adjective" onClick={(e) => { CheckTheCorrectAnswer(e.target.value, FinalTenRandom[Counter].pos) }}>adjective</motion.button>
                </div>
                <div className='progressBar'>
                    <ProgressBar completed={Counter * 10} />
                </div>
            </motion.div>
                <motion.div id='Submit' className='SubmitDiv' hidden={true}
                    initial={{ y:10 }}
                    animate={{ y:0 }}
                    transition={{ repeat:Infinity ,duration:0.5 , repeatDelay:0.2} }
                >
                    <button onClick={() => { Submit() }}>Submit</button>
                </motion.div>
        </div>
    )
}

export default Exam
