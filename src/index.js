import React from 'react';
import ReactDOM from 'react-dom';

class Part extends React.Component{
    render(){
        return (
            <li><a href={this.props.url}>{this.props.title}</a></li>
        );
    } 
}

class List extends React.Component{
    render(){
        return (
            <ol>
                <Part url="./hello-world.html" title="React Hello World"></Part>
                <Part url="./jsx.html" title="JSX 初识"></Part>
                <Part url="./element-render.html" title="元素渲染"></Part>
                <Part url="./component-props.html" title="组件 & Props"></Part>
                <Part url="./state-livecycle.html" title="状态 & 生命周期"></Part>
                <Part url="./event-handler.html" title="事件处理"></Part>
            </ol>
        );
    }
}

ReactDOM.render(
    <List />,
    document.getElementById("root")
)








