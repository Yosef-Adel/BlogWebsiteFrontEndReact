const redux = require("redux");

const dataReducer = (state = {login: false ,username: "",email: "" , id:0}, action) =>{
    
    if(action.type=== "signOut"){
        return {
            login:false,
            username: "",
            id: 0,
            email: ""
        }
    }
    if(action.type ==="Login" ){
        return {
            login:action.login,
            username: action.username ,
            id: action.id,
            email: ""
            
        }
    }

    if(action.type === "check"){
        return {
            login:false,
            username: "",
            id: 0,
            email: action.email
        }
    }

   
    return state;
    
}

const store = redux.createStore(dataReducer);

export default store 