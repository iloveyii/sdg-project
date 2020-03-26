import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
var urlpath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAILURE":
    case "ACCOUNT_CREATED":
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, registerUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  fetch(`${urlpath}/loadUser/?user=${login}&pass=${password}`)
  .then(response => response.json())
  .then(function(response){
    if (response["status"]){     
        if (response["payload"]['trials'] > 3){
          dispatch({ type: "LOGIN_FAILURE" });
          setError(true);
          setIsLoading(false);
        }
        localStorage.setItem("id_token", "1");
        localStorage.setItem("fullname", response["payload"]['fullname']);
        localStorage.setItem("email", response["payload"]['email']);
        localStorage.setItem("mobilephone", response["payload"]['mobilephone']);
        localStorage.setItem("usergroup", response["payload"]['usergroup']);
        localStorage.setItem("userid", response["payload"]['userid']);
        localStorage.setItem("location", response["payload"]['location']);
        localStorage.setItem("locationdescription", response["payload"]['locationdescription']);
        dispatch({ type: "LOGIN_SUCCESS" });
        setError(null);
        setIsLoading(false);
  
        history.push("/app/dashboard");
    } else {

      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);
    }
  })
  .catch(err => console.error(err))  
}


function registerUser(dispatch, login, password, name, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  fetch(`${urlpath}/saveUser/`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: login,
      password: password,
      name: name,
      usergroup: 'Admin',
      location: 'Kristianstad'
    })
  })
  .then(response => response.json())
  .then(function(response){
    if (response["status"]){
      dispatch({ type: "ACCOUNT_CREATED" });
      setError(null);
      setIsLoading(false);
    } else {
      console.log("failed");
    }
    
  })
  .catch(err => console.error(err))  

}

function signOut(dispatch, history) {
  window.sessionStorage.clear();
  localStorage.clear();

  // localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
