import { combineReducers } from "redux";
import { Data , Counter , Correct ,FinalTen} from "./medsReducer";


const reducers = combineReducers({
    Data:Data,
    Counter:Counter,
    Correct:Correct,
    FinalTen:FinalTen
});

export default reducers