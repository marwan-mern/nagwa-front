import { ActionTypes } from "../constants/actionTypes";
import api from '../../api/items.js'



export const FetchData = () => {
    return async (dispatch, getState) => {
        const response = await api.get('/Data')
        dispatch({ type: ActionTypes.FETCH_DATA, payload: response.data })
    }
};

export const Check = (Answer, CorrectAnswer) => {
    return async (dispatch, getState) => {
        if (Answer === CorrectAnswer) {
            //Right answer
            if (getState().Counter.Counter < 9) {
                //If not at the last question

                //Increase the number of Correct answers by one
                dispatch({ type: ActionTypes.CHECK_ANSWER, payload: getState().Correct.Correct + 1 })
                setTimeout(() => {
                    //The Question stays for 150ms after the answer then shifting to the next question
                    document.getElementById(`${Answer}`).classList.remove(`Red`)
                    dispatch({ type: ActionTypes.COUNTER, payload: getState().Counter.Counter + 1 })
                }, 150)
            } else {
                //Last question hide the questions and show the submit button
                document.getElementById(`Data`).style.display=`none`
                document.getElementById(`Submit`).style.display=`block`
            }
        } else {
            //Wrong answer
            if (getState().Counter.Counter < 9) {
                setTimeout(() => {
                    document.getElementById(`${Answer}`).classList.remove(`Red`)
                    dispatch({ type: ActionTypes.COUNTER, payload: getState().Counter.Counter + 1 })
                }, 150)
            } else {
                document.getElementById(`Data`).style.display=`none`
                document.getElementById(`Submit`).style.display=`block`
            }
        }
    }
};

export const FetchTenItems = () => {
    return async (dispatch, getState) => {
        let PosArray = [];
        let adverbIndexes = [];
        let verbIndexes = [];
        let nounIndexes = [];
        let adjectiveIndexes = [];

        //Get an array with all poses of the questions
        getState().Data.TestData.wordList.length > 0 && getState().Data.TestData.wordList.map((item) => PosArray.push(item.pos))

        PosArray.length > 0 && PosArray.map((Item, index) => {
            if (Item === "adverb") {
                //Make an array of all the indexs of the adverb answer from the psoArray
                adverbIndexes.push(index)
            } else if (Item === "verb") {
                //Make an array of all the indexs of the verb answer from the psoArray
                verbIndexes.push(index)
            } else if (Item === "noun") {
                //Make an array of all the indexs of the noun answer from the psoArray
                nounIndexes.push(index)
            } else {
                //Make an array of all the indexs of the adjective  answer from the psoArray
                adjectiveIndexes.push(index)
            }
            return null;
        })

        //Get Random Index From Every Array
        const RandomAdverbIndex = adverbIndexes[Math.floor(Math.random() * adverbIndexes.length)]
        const RandomVerbIndex = verbIndexes[Math.floor(Math.random() * verbIndexes.length)]
        const RandomNounIndex = nounIndexes[Math.floor(Math.random() * nounIndexes.length)]
        const RandomAdjectiveIndex = adjectiveIndexes[Math.floor(Math.random() * adjectiveIndexes.length)]

        //Get array with the rest of indexes which not includes the selected indexes above
        const TheRestIndexes = Array.from(Array(getState().Data.TestData.wordList.length).keys()).filter((item, Posindex) => Posindex !== RandomAdverbIndex && Posindex !== RandomVerbIndex && Posindex !== RandomNounIndex && Posindex !== RandomAdjectiveIndex)

        //Get From TheRestIndexes Array a small array with only 6 indexes
        const SixRandomItems = TheRestIndexes.sort(() => Math.random() - 0.5).slice(0, 6)

        //Merge The 6 random indexes with the specific indexes selected above and mixed them randomly
        const FinalTenRandomIndexes = [RandomAdverbIndex, RandomVerbIndex, RandomNounIndex, RandomAdjectiveIndex, ...SixRandomItems].sort(() => Math.random() - 0.5)

        let FinalTenRandom = []
        //Get the Words of the final 10 indexes from the wordList
        FinalTenRandomIndexes.length > 0 && FinalTenRandomIndexes.map((item) => {
            return (
                FinalTenRandom.push(getState().Data.TestData.wordList[item])
            )
        })
        dispatch({ type: ActionTypes.FETCH_TEN_ITEMS, payload: FinalTenRandom })
    }
};


export const Reset = () => {
    return async (dispatch, getState) => {
        dispatch({ type: ActionTypes.RESET_CORRECT, payload: 0 })
        dispatch({ type: ActionTypes.RESET_COUNTER, payload: 0 })
    }
};



