import React from 'react';
import ReactDOM from 'react-dom';

class About extends React.Component{
    render(){
        return(
            <div>
                <p>
                    about
                </p>
            </div>
        )
    }
};

class Inbox extends React.Component{
    render(){
        return(
            <div>
                <p>
                    Inbox
                </p>
            </div>
        )
    }
};

class Home extends React.Component{
    render(){
        return(
            <div>
                <p>
                    Home
                </p>
            </div>
        )
    }
};


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1)
        }
    };

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    };

    render() {
        let Child
        switch (this.state.route) {
            case '/about': Child = About; break;
            case '/inbox': Child = Inbox; break;
            default:      Child = Home;
        }

        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/inbox">Inbox</a></li>
                </ul>
                <Child/>
            </div>
        )
  }
};

ReactDOM.render(
    <App />, 
    document.getElementById('root')
)