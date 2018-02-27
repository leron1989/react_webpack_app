import React from 'react';
import ReactDOM from 'react-dom';


class BoilingVerdict extends React.Component{

    render(){
        if(this.props.celsius >= 100){
            return <p>水会烧开</p>
        }
        return <p>水不会烧开</p>
    }
}

const scaleName = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        // this.state={temperature:""};
    };

    handelChange(e){
        // this.setState({temperature:e.target.value});
        //TemperatureInput 也能接受来自 Calculator 父组件的 temperature 变量和 onTemperatureChange 方法作为props属性值
        this.props.onTempChange(e.target.value);
    };

    render(){
        // const temperature = this.state.temperature; 状态提升，把temperature状态改为属性
        const temperature = this.props.temperature;
        return (
            <fieldset>
                <legend>请输入温度（{scaleName[this.props.scale]}）</legend>
                <input type="text" value={temperature} onChange={this.handelChange.bind(this)}/>
            </fieldset>
        )
    };
}

/**
 * 在React应用中，对应任何可变数据理应只有一个单一“数据源”。
 * 通常，状态都是首先添加在需要渲染数据的组件中。
 * 此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。
 * 你应该在应用中保持 自上而下的数据流，而不是尝试在不同组件中同步状态
 * 
 * 状态提升比双向绑定方式要写更多的“模版代码”，
 * 但带来的好处是，你也可以更快地寻找和定位bug的工作。
 * 因为哪个组件保有状态数据，也只有它自己能够操作这些数据，
 * 发生bug的范围就被大大地减小了。
 * 此外，你也可以使用自定义逻辑来拒绝或者更改用户的输入。
 */
class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temperature:"",
            scale:"c"
        }
    }

    handelCelsiusCange(temp){
        this.setState({scale:"c", temperature: temp});
    }

    handelFahrenheitChange(temp){
        this.setState({scale:"f", temperature: temp});
    }

    render(){
        const scale = this.state.scale;
        const temp = this.state.temperature;
        // const celsius = scale === "c"?temp:tryConvert(temp, toFahrenheit);
        // const fahrenheit = scale === "f"?temp:tryConvert(temp, toCelsius);
        const celsius = scale === 'f' ? tryConvert(temp, toCelsius) : temp;
        const fahrenheit = scale === 'c' ? tryConvert(temp, toFahrenheit) : temp;
        return (
            <div>
                <TemperatureInput 
                    scale="c"
                    temperature={celsius}
                    onTempChange={this.handelCelsiusCange.bind(this)}/>
                <TemperatureInput 
                    scale="f"
                    temperature={fahrenheit}
                    onTempChange={this.handelFahrenheitChange.bind(this)}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        )
    };
}

function toCelsius(fahrenheit){
    return (fahrenheit - 32) * 5 /9;
}

function toFahrenheit(celsius){
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}







ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);