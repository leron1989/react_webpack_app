import React from 'react';
import ReactDOM from 'react-dom';
import './composition-inheritance.css'


class FancyBorder extends React.Component{
     render(){
         console.log(this.props.children[0].type)
         return(
            <div className={'FancyBorder FancyBorder-' + this.props.color}>
                {this.props.children}
            </div>
         )
     }
}

class WelcomeDialog extends React.Component{

    render(){
        return(
            <FancyBorder color="blue">
                <h1 className="Dialog-title">
                    你好
                </h1>
                <p>
                    这是【组合 VS 继承】的学习章节
                </p>
            </FancyBorder>
        )
    }
}

function Contacts() {
    return <div className="Contacts" />;
}

function Chat() {
    return <div className="Chat" />;
}

class SplitPane extends React.Component{

    render(){
        return(
            <div className="SplitPane">
                <div className="SplitPane-left">
                    {this.props.left}
                </div>
                <div className="SplitPane-right">
                    {this.props.right}
                </div>
            </div>
        )
    }
}

class App extends React.Component{

    render(){
        return (
            <SplitPane left={<Contacts />} right={<Chat />}/>
        )
    }
}



ReactDOM.render(
    <div>
        <WelcomeDialog />
        <App />
    </div>,
    document.getElementById('root')
);