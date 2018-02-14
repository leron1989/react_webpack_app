import React from 'react';
import ReactDOM from 'react-dom';



// const element = <h1>Hello, world! </h1>;


function formatName(user) {
    return user.firstName + ' ' + user.lastName;
};
  
const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    getGreeting(user)
);

function getGreeting(user) {
    if (user) {
      return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}
  

ReactDOM.render(
    element,
    document.getElementById("root")
);




  
  