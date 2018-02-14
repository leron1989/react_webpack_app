import React from 'react';
import ReactDOM from 'react-dom';

// function Clock(props){
//     return (
//         <div>
//             <h1>Hello Leron!</h1>
//             <h2>It is {props.date.toLocaleTimeString()}.</h2>
//         </div>
//     );
// }

// function tick(){
//     ReactDOM.render(
//         <Clock date={new Date()} />,
//         document.getElementById("root")
//     )
// }

// setInterval(tick, 1000);
/**
 * 只有通过类方式定义的组件才能设置state
 * 虽然 this.props 由React本身设置以及this.state 具有特殊的含义，但如果需要存储不用于视觉输出的东西，则可以手动向类中添加其他字段。
 * 如果你不在 render() 中使用某些东西，它就不应该在状态中
 * React组件只能有一个根元素
 * Adjacent JSX elements must be wrapped in an enclosing tag
 */

 class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            num: 1
        };
    }

    componentDidMount(){
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );

        this.changeNum();
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    changeNum(){
        console.log(this.state)
        this.setState((prevState, props) => ({
            num: prevState.num + parseInt(props.increment)
        }))
    }

    tick(){
        this.setState({
            date: new Date()
        })
        // //this.setDate接收函数写法（箭头函数写法）
        // this.setState((prevState, props) => ({
        //     date: new Date(),
        //     num: prevState.num + parseInt(props.increment)
        // }))

        //this.setState接收函数写法
        // this.setState(function(prevState, props){
        //     return {
        //         date: new Date(),
        //         num: parseInt(prevState.num) + parseInt(props.increment)
        //     }
        // })

        // this.setState({
        //     date: new Date(),
        //     //因为 this.props 和 this.state 可能是异步更新的，不应该依靠它们的值来计算下一个状态
        //     //可以使用第二种形式的 setState() 来接受一个函数而不是一个对象。 
        //     //该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数
        //     num: parseInt(this.state.num) + parseInt(this.props.increment)
        // })
        
        //v错误方式更改状态
        // this.state.date = new Date()
    }

    render(){
        return (
            <div>
                <h1>Hello {this.props.name}</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
                <h2>Count num: {this.state.num}</h2>
            </div>
        );
    }
 }

class App extends React.Component{
    render(){
        return (
            <div>
                <Clock name="zhangshan" increment="1" />
                <Clock name="lisi" increment="2" />
                <Clock name="wangwu" increment="3" />
                <Clock name="zhaoliu" increment="4" />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
