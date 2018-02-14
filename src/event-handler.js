import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            num: 1
        };
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    /**
     * 通过类定义的组件方法不会绑定this
     * errIncrease未绑定this，因此获取this为undefined
     */
    errIncrease(){
        console.log(this)
        this.setState(function(prevStte){
            return{
                num : prevState.num + 1
            }
        })
    }

    increase(e){
        console.log(e)
        this.setState(function(prevState){
            return {
                num: prevState.num + 1
            }
        });
    }

    decrease(){
        this.setState(prevState => ({
            num: prevState.num - 1
        }))
    }

    /**
     * 使用这个语法有个问题就是每次渲染的时候都会创建一个不同的回调函数。
     * 在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。
     * 我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。
     * @param {*} e 
     */
    backArrowFuncDecrease(e){
        console.log("event is:", e);
        this.setState(prevState => ({
            num: prevState.num - 2
        }))
    }

    render(){
        return (
            <div>
                <h2>数量：{this.state.num}</h2>
                <button onClick={this.errIncrease}>错误示例</button><br/>
                <button onClick={this.increase}>增加</button><br/>
                <button onClick={this.decrease}>减少</button><br/>
                <button onClick={(e) => this.backArrowFuncDecrease(e)}>
                    回调函数中使用箭头函数绑定this
                </button><br/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);