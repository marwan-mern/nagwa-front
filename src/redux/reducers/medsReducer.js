import { ActionTypes } from "../constants/actionTypes"


const initialState = {
    TestData: [
    ],
};

const CounterState = {
    Counter: 0,
};
const CorrectState = {
    Correct: 0,
};

const FinalTenState = {
    Final: [

    ],
};


export const Data = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return { ...state, TestData: action.payload };
        default:
            return state;
    }
}

export const Counter = (state = CounterState, action) => {
    switch (action.type) {
        case ActionTypes.COUNTER:
            return { ...state, Counter: action.payload };
        case ActionTypes.RESET_COUNTER:
            return { ...state, Counter: action.payload };
        default:
            return state;
    }
}

export const Correct = (state = CorrectState, action) => {
    switch (action.type) {
        case ActionTypes.CHECK_ANSWER:
            return { ...state, Correct: action.payload };
        case ActionTypes.RESET_CORRECT:
            return { ...state, Correct: action.payload };
        default:
            return state;
    }
}

export const FinalTen = (state = FinalTenState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_TEN_ITEMS:
            return { ...state, Final: action.payload };
        default:
            return state;
    }
}


