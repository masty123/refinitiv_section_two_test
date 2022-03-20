
import React, { Component} from "react";


class QuestionOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: false,
      choice_list: [
        {value: "isPrime"},
        {value: "isFibonacci"},
      ],
      select_choice: "isPrime",
      number: 0,
    };
  }

  isPerfectSquareCheck(number){
    var temp_num = Math.sqrt(number);
    return (temp_num*temp_num === number);
  }

  onChangeSelectDropdown = (event) => {
      // console.log(event.target.value);
      const {number} = this.state;
      var func_result = false;
      console.log(number);
      if(number !== undefined && number !== ""){
        if(event.target.value === "isPrime"){
          // console.log("1 - prime");
          func_result = this.isPrime(number);

        } else if (event.target.value === "isFibonacci") {
          // console.log("2 - fibo");
          if( this.isPerfectSquareCheck(5*number*number + 4) || this.isPerfectSquareCheck(5*number*number - 4)){
            func_result = true;
          } else {
            func_result = false;
          }
        }
        console.log(func_result);
        this.setState({
          result: func_result,
          select_choice: event.target.value
        })
      }
  }

  isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
  
    var sqrt_res = Math.sqrt(num);
  
    for (var i = 2; i <= sqrt_res; i++) 
      if (num % i === 0) return false;
    return true;
  }

  getInputNumber = (event) => {
    // console.log(event.target.value);
    const {select_choice} = this.state;
    var event_num  = event.target.value;

    if(event.target.value !== undefined){
      var func_result = false;
        if(select_choice === "isPrime" ){

          func_result = this.isPrime(event_num);

        } else if (select_choice === "isFibonacci"){
          if(this.isPerfectSquareCheck(5*event_num*event_num + 4) ||  this.isPerfectSquareCheck(5*event_num*event_num - 4)){
            func_result = true;
          } else {
            func_result = false;
          }
        }
    } 

    this.setState({
      number: event_num,
      result: func_result
    })

  }

  


  render() {
    const {result, choice_list, number} = this.state;
    return (

      <div className="content">

        <div className="left" style={{border: "1px solid black"}}> 
            <input type="number" onChange={this.getInputNumber} value={number}/>
        </div>
        <div className="middle" style={{border: "1px solid black"}}>
                 <select placeholder="please select" onChange={(value) => this.onChangeSelectDropdown(value)}>
                             {choice_list.map((item, index) =>
                             (
                                 <option value={item.value}  key={index}>{item.value}</option>
                             ))}
                 </select>
        </div>
        <div className="right" style={{border: "1px solid black"}}>
            <span className={result? "c-green" : "c-red"} >{result.toString()}</span>
          </div>
    </div>
    );
  }


}


export default QuestionOne;
