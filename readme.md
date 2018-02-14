# React学习记录

## JSX简介

* JSX使用实例：
    ```javascript
    const element = <h1>Hello, world!</h1>;
    ```  
    
* JSX中使用javascript表达式，表达式被包含在`{}`中：

    ```javascript
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
    
    ```javascript
    function getGreeting(user) {
        if (user) {
            return <h1>Hello, {formatName(user)}!</h1>;
        }
        return <h1>Hello, Stranger.</h1>;
    }
    ```
* JSX属性

    1. 可以通过引号定义以`字符串`为值的属性：
    ```javascript
    const element = <div tabIndex="0"></div>;
    ```
    
    2. 可以通过`{}`来定义以JavaScript表达式为值的属性：
    ```javascript
    const element = <img src={user.avatarUrl}></img>;
    ```
    
* JSX嵌套

    JSX标签可以相互嵌套：
    ```javascript
    const element = (
        <div>
            <h1>Hello!</h1>
            <h2>Good to see you here.</h2>
        </div>
    );
    ```
    >**警告:**
    >
    >因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。<br>
    >例如，class 变成了 className，而 tabindex 则对应着 tabIndex.
* JSX防注入攻击

    React DOM 在渲染之前默认会过滤所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。
    
* JSX代表Objects

    `Babel`转译器会把JSX转换成一个名为`React.createElement()`的方法调用。
    ```javascript
    const element = (
        <h1 className="greeting">
            Hello, world!
        </h1>
    );
    ```
    等价于
    ```javascript
    const element = React.createElement(
        'h1',
        {className: 'greeting'},
        'Hello, world!'
    );
    ```
## 元素渲染

* 元素是构成React应用的最小单元，用来描述屏幕上看到的内容。
    ```javascript
    const element = <h1>Hello, world</h1>;
    ```

* 元素并非组件，元素只是组件的一部分

* React元素都是不可变的，要实现元素更新有两种方法：
    1. 使用`ReactDOM.render`创建新元素;

    2. 使用`组件状态`实现DOM更新;

* React只会更新改变的部分。

## 组件 & Props

* 组件定义
    1. 函数定义
    ```javascript
    function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
    }
    ```

    2. 类定义
    ```javascript
    class Welcome extends React.Component {
        render() {
            return <h1>Hello, {this.props.name}</h1>;
        }
    }
    ```
* 组件渲染

    1. React元素可以是DOM标签，也可以是`自定义组件`。因此组件的使用类似DOM标签的使用：
    ```javascript
    const element = <Welcome name="Sara" />;
    ```

    2. 自定义组件渲染时，JSX会将属性作为`"props"`对象，传递给组件。<br>
    如下面这段代码，React将`name="Sara"`被作为props对象`{name:"Sara"}`传递给了组件，因此页面渲染的效果为：Hello, Sara
    ```javascript
    function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
    }

    const element = <Welcome name="Sara" />;
    
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
    ```
    >**警告:**
    >
    >组件名称必须以大写字母开头。
    >例如，<div /> 表示一个DOM标签，但 <Welcome /> 表示一个组件，并且在使用该组件时你必须定义或引入它。

* 组合组件
    1. 在React应用中，按钮、表单、对话框、整个屏幕的内容等，这些通常都被表示为组件。

    2. 组件可以在它的输出中引用其它组件，这就可以让我们用同一组件来抽象出任意层次的细节。<br>
    如，App组件在输出组多次引用了Welcome组件：
    ```javascript
    function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
    }

    function App() {
        return (
            <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
            </div>
        );
    }

    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
    ```
    >**警告:**
    >
    >组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因。

    3. 提取组件<br>
    当制作大型组件时，可以提取出若干小组件，以达到复用的效果。

* Props的只读属性
    1. 无论以何种形式声明组件，都不能修改组件的props值。

    2. javascript 函数分两种`纯函数`和`非纯函数`，**所有的React组件必须像`纯函数`那样使用它们的props。**

    >纯函数（不改变输入参数的值）
    ```javascript
    function sum(a, b) {
        return a + b;
    }
    ```
    
    >非纯函数（改变输入参数的值）
    ```javascript
    function withdraw(account, amount) {
        account.total -= amount;
    }
    ```
## State & 生命周期

* **只有通过class形式定义的组件才能添加状态**

* 添加局部状态
    添加一个`类构造函数`来初始化`this.state`。
    ```javascript
    class Clock extends React.Component {
        constructor(props) {
            super(props);
            this.state = {date: new Date()};
        }

        render() {
            return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
            );
        }
    }
    ```
* componentDidMount() 组件`挂载`生命周期方法
    ```javascript
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    ```
    >**注意**

    >在时钟例子中，我们在挂载方法中设置了定时器ID：this.timerId<br>
    >在React中this.props与this.state具有特殊含义，一般用于存储视觉输出内容。<br>
    >其他不用于视觉输出内容，可以收统向组件类中添加其他字段<br>
    >不在render()方法中使用的内容也不应该出现在state中<br>

* componentWillUnmount() 组件`卸载`生命周期方法
    ```javascript
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    ```

* state使用方法

    1. 除了构造函数，不要直接使用this.state更新状态，
    ```javascript
    this.state.comment = 'Hello';//错误姿势
    ```

    2. 应使用setState()
    ```javascript
    this.setState({comment: 'Hello'});//正确姿势
    ```

    3. 多个状态可以在一个setState()中合并更新
    ```javascript
    this.setState({
        date: new Date(),
        num: parseInt(this.state.num) + parseInt(this.props.increment)
    })
    ```

    4. 多个状态也可以独立更新
    ```javascript
    componentDidMount() {
        fetchPosts().then(response => {
            this.setState({
                posts: response.posts
            });
        });

        fetchComments().then(response => {
            this.setState({
                comments: response.comments
            });
        });
    }
    ```

    5. setState()既可以接收`对象`，也可以接收一个`函数`

    >接收对象
    ```javascript
    this.setState({
        date: new Date(),
        num: parseInt(this.state.num) + parseInt(this.props.increment)
    })
    ```

    >接收函数
    ```javascript
    this.setState(function(prevState, props){
        return {
            date: new Date(),
            num: parseInt(prevState.num) + parseInt(props.increment)
        }
    })
    ```

    6. **状态更新可能是异步的，因此不应该使用状态的值来计算下一个状态的值**
    ```javascript
    this.setState({
        counter: this.state.counter + this.props.increment //错误姿势
    });
    ```

    7. 要通过状态值来计算下一状态值，需要使用setState()接受函数的方式

    >第一个参数prevState：上一状态；第二个参数props：主键属性<br>
    >下方使用了`箭头函数`
    ```javascript
    this.setState((prevState, props) => ({
        counter: prevState.counter + props.increment
    }));
    ```

* state数据流向，自顶向下流动

    1. 组件彼此隔离，父组件和子组件都不能知道某个组件的状态，也不应该关心某组件的定义形式。

    2. 状态之所以被称为`局部`或`封装`，是因为除了组件本身外，其他组件都不可访问。

    3. 父组件可将其状态作为属性传递给子组件
    
    ```javascript
    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    ```

    >FormattedDate组件并不知道其属性中接收的date来自父组件的状态，还是属性，或者其他...<br>
    >这通常被称为自顶向下或单向数据流。 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。
    ```javascript
    <FormattedDate date={this.state.date} />

    function FormattedDate(props) {
        return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
    }
    ```
    
