import React from 'react';
import ReactDOM from 'react-dom';


class UserGreeting extends React.Component{
    render(){
        return <h1>Welcome back!</h1>;
    }
}

class GuestGreeting extends React.Component{
    render(){
        return <h1>Please sign up.</h1>;
    }
}

/**
 * 条件渲染-根据条件返回
 */
class Greeting extends React.Component{
    render(){
        console.log(this.props.isLoggedIn)
        if(this.props.isLoggedIn){
            return <UserGreeting />
        }else{
            return <GuestGreeting />
        }
    }
}

class LoginButton extends React.Component{
    render(){
        return (
            <button onClick={this.props.onClick}>
                Login
            </button>
        )
    }
}

class LogoutButton extends React.Component{
    render(){
        return (
            <button onClick={this.props.onClick}>
                Logout
            </button>
        )
    }
}

class LoginControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    handleLoginClick(){
        this.setState(
            {
                isLoggedIn: true
            }
        )
    }

    handleLogoutCLick(){
        this.setState(
            {
                isLoggedIn: false
            }
        )
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        /** 
         * 条件渲染-元素变量
         *  
        */
        let button = null;
        if(isLoggedIn){
            button = <LogoutButton onClick={this.handleLogoutCLick.bind(this)} />
        }else{
            button = <LoginButton onClick={this.handleLoginClick.bind(this)} />
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}


class WarningBanner extends React.Component{
    render(){
        console.log(this.props.warn)
        /**
         * 通过返回null来组织渲染
         */
        if(!this.props.warn){
            return null;
        }

        return (
            <div className="warning">
                Warning!
            </div>
        )
    }
}

class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {showWarning: true};
    }

    handleToggleCLick(){
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }

    render(){
        return (
            <div>
                <LoginControl />
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleCLick=this.handleToggleCLick.bind(this)}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        )
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);

/**
 * 还可通过与运算符（&&）
 * 三目运算符 进行条件渲染，不举例子
 */