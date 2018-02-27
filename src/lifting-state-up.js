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