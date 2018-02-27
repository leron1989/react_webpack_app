import React from 'react';
import ReactDOM from 'react-dom';


/**
 * 在HTML当中，像<input>,<textarea>, 和 <select>这类表单元素会维持自身状态，并根据用户输入进行更新。
 * 但在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState()方法进行更新
 * React仍然控制用户后续输入时发生的变化，元素的值由React控制的元素称为“受控组件”
 */
class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value:''};

    };

    handelChange(event){
        this.setState({value: event.target.value});
    };

    handelSubmit(event){
        alert("input value was changed, new value is:" + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handelSubmit.bind(this)}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handelChange.bind(this)}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

/**
 * 在React中，<textarea>会用value属性来代替。
 * 表单中的<textarea> 类似于使用单行输入的表单
 */
class TextareaForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:"这是一个textarea表单组件"
        }
    };

    handelChange(event){
        this.setState({
            value: event.target.value
        });
    };

    handelSubmit(event){
        alert("textarea value was changed, new value is:" + this.state.value);
        event.preventDefault();
    };

    render(){
        return(
            <form onSubmit={this.handelSubmit.bind(this)}>
                <label>
                    TextArea:
                    <textarea value={this.state.value} onChange={this.handelChange.bind(this)} ></textarea>
                </label>
                <input type="submit" value="Submit1"/>
            </form>
        )
    }
}

/**
 * 在React中，并不使用之前的selected属性，而在根select标签上用value属性来表示选中项。
 * 这在受控组件中更为方便，因为你只需要在一个地方来更新组件
 */
class SelectedForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'wangwu',
            text: '王五'
        }
    }

    handelChange(event){
        this.setState({
            value: event.target.value,
            text: event.target.options[event.target.selectedIndex].text
        })
    }

    handelSubmit(event){
        const s = event.target.children[0].children[0];
        const i = s.selectedIndex;
        console.log(s.options[i].text)
        alert("select value was changed, new value is:" + this.state.text);
        event.preventDefault();
    }


    render(){
        return(
            <form onSubmit={this.handelSubmit.bind(this)}>
                <label>
                    <select onChange={this.handelChange.bind(this)} value={this.state.value}>
                        <option value="zhangsan">张三</option>
                        <option value="lisi">李四</option>
                        <option value="wangwu">王五</option>
                        <option value="zhaoliu">赵六</option>
                        <option value="tianqi">田七</option>
                    </select>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

/**
 * 复杂表单
 */
class MultipleForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'张三',
            male: true,
            sf:true,
            hh:false,
            lq:true
        }
    }

    handelFormChange(event){
        var value;
        if(event.target.type == "text"){
            value = event.target.value;
        }else if(event.target.type == "radio"){
            value = event.target.value == "MALE" ? true:false;
        }else if(event.target.type == "checkbox"){
            value = event.target.checked;
        }
        var name = event.target.name;
        var state = {};
        state[name] = value;
        this.setState(state);
    };

    handelSubmit(event){
        console.log("form was changed, new value is:");
        for(var key in this.state){
            console.log(key + ": " + this.state[key])
        };
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handelSubmit.bind(this)}>
                <label>
                    <input name="name" type="text" value={this.state.name} onChange={this.handelFormChange.bind(this)}/>
                    <br/>
                    性别：
                    男<input name="male" type="radio" value="MALE" checked={this.state.male} onChange={this.handelFormChange.bind(this)}/>
                    女<input name="male" type="radio" value="FEMALE" checked={!this.state.male} onChange={this.handelFormChange.bind(this)}/>
                    <br/>
                    爱好：
                    书法<input name="sf" type="checkbox" value="sf" checked={this.state.sf} onChange={this.handelFormChange.bind(this)}/>
                    绘画<input name="hh" type="checkbox" value="hh" checked={this.state.hh} onChange={this.handelFormChange.bind(this)}/>
                    篮球<input name="lq" type="checkbox" value="lq" checked={this.state.lq} onChange={this.handelFormChange.bind(this)}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

class Page extends React.Component{
    render(){
        return(
            <div>
                <NameForm />
                <TextareaForm />
                <SelectedForm />
                <MultipleForm />
            </div>
        )
    }
}


ReactDOM.render(
    <Page />,
    document.getElementById('root')
);