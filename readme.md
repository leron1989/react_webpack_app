# React学习记录

## JSX简介

* JSX使用实例：

    `const element = <h1>Hello, world!</h1>;`  
    
* JSX中使用javascript表达式，表达式被包含在`{}`中：

    ```
    function formatName(user) {
    return user.firstName + ' ' + user.lastName;
    }
    
    const user = {
    firstName: 'Harper',
    lastName: 'Perez'
    };
    
    const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
    );
    
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
    ```
    >书写JSX的时候一般都会带上换行和缩进，这样可以增强代码的可读性。与此同时，我们同样推荐在 JSX 代码的外面扩上一个小括号，这样可以防止 分号自动插入 的bug
* JSX本身其实也是一种表达式

    编译之后的JSX被转化为普通的javaScript对象，因此可以将JSX赋值给变量，作为参数传入，或者作为返回值返回。
    
    ```
    function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
    }
    ```
* JSX属性

    1. 可以通过引号定义以`字符串`为值的属性：
    `const element = <div tabIndex="0"></div>;`
    2. 可以通过`{}`来定义以JavaScript表达式为值的属性：
    `const element = <img src={user.avatarUrl}></img>;`
    
* JSX嵌套

    JSX标签可以相互嵌套：
    ```
    const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
    );
    ```
    >警告:
    >因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。<br>
    >例如，class 变成了 className，而 tabindex 则对应着 tabIndex.
* JSX防注入攻击

    React DOM 在渲染之前默认会过滤所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。
    
* JSX代表Objects

    `Babel`转译器会把JSX转换成一个名为`React.createElement()`的方法调用。
    ```
    const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
    );
    ```
    等价于
    ```
    const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
    );
    ```
