import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            num: 1
        };
        this.increase = this.increase.bind(this);
        this.increaseByProps = this.increaseByProps.bind(this, this.props.increaseNum)
    }

    /**
     * 通过类定义的组件方法不会绑定this
     * errIncrease未绑定this，因此获取this为undefined
     * 
     * 在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为
     */
    errIncrease(e){
        console.log(this)
        // return false;
        e.preventDefault();
        this.setState(function(prevStte){
            return{
                num : prevState.num + 1
            }
        })
    }

    /**
     * 通过构造函数绑定this
     * @param {*} e 
     */
    increase(e){
        console.log(e)
        this.setState(function(prevState){
            return {
                num: prevState.num + 1
            }
        });
    }

    /**
     * 通过onClick调用时绑定this
     */
    decrease(n, e){
        console.log(n)
        console.log(e)
        this.setState(prevState => ({
            num: prevState.num - 1
        }))
    }

    /**
     * 使用这个语法有个问题就是每次渲染的时候都会创建一个不同的回调函数。
     * 在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。
     * 我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。
     * 
     * 箭头函数必须显示的传递事件对象e
     * @param {*} e 
     */
    backArrowFuncDecrease(n, e){
        console.log(n)
        console.log("event is:", e);
        this.setState(prevState => ({
            num: prevState.num - parseInt(n)
        }))
    }

    increaseByProps(n, e){
        console.log(n)
        console.log("event is", e)
        this.setState((prevState) => ({
            num: prevState.num + parseInt(n)
        }))
    }

    handleClick(e){
        // return false;
        console.log("通过return false阻止默认行为测试");
        e.preventDefault();
        console.log("通过preventDefault阻止默认行为测试")
    }

    render(){
        return (
            <div>
                <h2>数量：{this.state.num}</h2>
                <button onClick={this.errIncrease}>错误示例</button><br/>
                <button onClick={this.increase}>增加</button><br/>
                <button onClick={this.decrease.bind(this, this.props.increaseNum)}>减少</button><br/>
                <button onClick={(e) => this.backArrowFuncDecrease(this.props.increaseNum, e)}>
                    回调函数中使用箭头函数绑定this
                </button><br/>
                <button onClick={this.increaseByProps}>传递参数</button><br/>
                <a href="http://localhost:8080" onClick={this.handleClick}>阻止默认行为测试</a>
            </div>
        )
    }
}

ReactDOM.render(
    <App increaseNum="10" />,
    document.getElementById("root")
);