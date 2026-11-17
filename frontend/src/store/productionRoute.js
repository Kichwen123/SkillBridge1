import {createSlice} from "@reduxjs/toolkit";
const productionSlice = createSlice({
name : "prod",
initialState:{
    link:"http://localhost:4005"
}
});

export default productionSlice.reducer;// reducer is a state handler function