import { all } from "redux-saga/effects";
import { watchEmployeesAsync } from "./employees";

export default function* rootSaga() {
    yield all([
        watchEmployeesAsync()
    ])
}