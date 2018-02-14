import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 组建的两种写法，一种时javascript方法的形式，
 * 另一种是es6 class的形式，继续React.Component.
 * 组建名称必须以大写字母开头，并且在使用时必须定义或者引入它
 * 组建的使用可以通过组建创建React元素，通过ReractDOM.render调用
 */
// function Welcome(props){
//     return <h1>Hello, {props.name}</h1>;
// }

// class Welcome extends React.Component{
//     render(){
//         return <h1>Hellor, {this.props.name}, he's come from {this.props.address}</h1>;
//     }
// }

// const element = <Welcome name="zhangshan" address="zhejiang"></Welcome>

// ReactDOM.render(
//     element,
//     document.getElementById("root")
// )

/**
 * 组合组建
 * 组建可以在输出中引用其它组建
 * 组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因
 * 出现以下错误的原因基本上是单词写错了，打自己一耳光子
 * Super expression must either be null or a function, not undefined
 */
// function Welcome(props){
//     return <h1>hello, {props.name}</h1>;
// }

// class App extends React.Component{
//     render(){
//         return <div>
//                     <Welcome name="zhangshan"></Welcome>
//                     <Welcome name="lisi"></Welcome>
//                     <Welcome name="wangwu"></Welcome>
//                     <Welcome name="zhaoliu"></Welcome>
//                 </div>;
//     }
// }

// ReactDOM.render(
//     <App></App>,
//     document.getElementById("root")
// )

/**
 * 组建提取
 */

//提取前
// function Comment(props) {
//     return (
//       <div className="Comment">
//         <div className="UserInfo">
//           <img className="Avatar"
//             src={props.author.avatarUrl}
//             alt={props.author.name}
//           />
//           <div className="UserInfo-name">
//             {props.author.name}
//           </div>
//         </div>
//         <div className="Comment-text">
//           {props.text}
//         </div>
//         <div className="Comment-date">
//           {formatDate(props.date)}
//         </div>
//       </div>
//     );
// }

//提取后
function Avatar(props){
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}



function UserInfo(props) {
    return (
      <div className="UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">
          {props.user.name}
        </div>
      </div>
    );
}



function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
        {formatDate(props.date)}
        </div>
      </div>
    );
}

function formatDate(date){
    return date;
}

const zhangshan = {avatarUrl:"www.baidu.com",name:"zhangshan"};
const element = <Comment author={zhangshan} text="今天好冷啊" date={new Date().toLocaleTimeString()}></Comment>;
ReactDOM.render(
    element,
    document.getElementById("root")
)

// /**
//  * Props的只读性
//  * 无论是使用函数或者类来声明一个组建，都不能修改自己的props。
//  * javascript函数分两种，如下列第一种是：纯函数（不改变输入值），第二张是非纯函数（改变自身的输入值）
//  * 如果需要动态改变组建，需要用到State
//  */
// //纯函数
// function sum(a, b) {
//     return a + b;
// }
// //非纯函数
// function withdraw(account, amount) {
//     account.total -= amount;
// }