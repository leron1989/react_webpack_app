import React from 'react';
import ReactDOM from 'react-dom';


/**
 * 渲染多个组建可以通过{}在JSX内构建一个元素集合
 * 
 * 当我们运行这段代码，将会看到一个警告 
 * a key should be provided for list items ,
 * 意思是当你创建一个元素时，必须包括一个特殊的 key 属性
 */
const numbers = [1,2,3,4,5];
const listItems = numbers.map((number) => 
    <li>{number}</li>
)

/**
 * Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。
 * 因此你应当给数组中的每一个元素赋予一个确定的标识。
 * 一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。
 * 通常，我们使用来自数据的id作为元素的key。
 * 元素的key只有在它和它的兄弟节点对比时才有意义。
 * 元素的key在他的兄弟元素之间应该唯一
 * 
 */
class NumberList extends React.Component{

    render(){
        const number = this.props.numbers;
        const listItems = numbers.map((number, index) => 
            <li key={index}>{number}</li>
        );

        return (
            <div>
                <h2>列表组建中key的使用</h2>
                <ul>{listItems}</ul>
                <hr/>
            </div>
            
        )
    }
}

class ListItemsErr extends React.Component{

    render(){
        const value = this.props.value;
        //错误示范，不应该在li里面指定key属性
        return (
            <li key={value.toString()}>
                {value}
            </li>
        )
    }
}

class ListItemsCorrect extends React.Component{

    render(){
        return (
            <li>
                {this.props.value}
            </li>
        )
    }
}

class NumberListTest extends React.Component{

    render(){
        const numbers = this.props.numbers;
        //key应该在这里指定
        const listItemsErr = numbers.map((number) => 
            <ListItemsErr value={number} />    
        );

        //正确示范，key应该在ListItemsCorrect中指定
        const listItemsCorrect = numbers.map((number, index) => 
            <ListItemsCorrect key={index} value={number}/>
        );
        return(
            <div>
                <h2>key的错误示范</h2>
                <ul>
                    {listItemsErr}
                </ul>
                <hr />
                <h2>key的正确示范</h2>
                <ul>
                    {listItemsCorrect}
                </ul>
            </div>
            
        );
    }
}



ReactDOM.render(
    <div>
        <ul>{listItems}</ul>
        <NumberList />
        <NumberListTest numbers={numbers}/>
    </div>,
    
    document.getElementById('root')
);