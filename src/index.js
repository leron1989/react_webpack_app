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
                <Part url="./condition-rendering.html" title="条件渲染"></Part>
                <Part url="./list-key.html" title="列表 & Keys"></Part>
                <Part url="./form.html" title="表单"></Part>
                <Part url="./lifting-state-up.html" title="状态提升"></Part>
                <Part url="./composition-inheritance.html" title="组合 VS 继承"></Part>
                <Part url="./thinking-react.html" title="React 理念"></Part>
                <Part url="./react-router-demo.html" title="React Router 体验"></Part>
            </ol>
        );
    }
}

ReactDOM.render(
    <List />,
    document.getElementById("root")
)








