
import React, { Component} from "react";
import axios from "axios";

class QuestionTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: false,
      table: [],
      master_table: []
    };
  }


  componentDidMount(){

    axios.get(`https://api.publicapis.org/categories`)
    .then((res) => {
      console.log(res);
      if(res.data.categories.length > 0){
     
        this.setState({
          table: res.data.categories ,
          master_table: res.data.categories,
        })
      }
    })
  }

  search = (event) => {
    // console.log(event.target.value);
    const {master_table} = this.state;

    var search_value = event.target.value;

    if(search_value){

        const filtered_data = master_table.filter((value) => {
          const search_lowerC = search_value.toLowerCase();
          const matched = value.toLowerCase().includes(search_lowerC);
          return matched
        });

  
      this.setState({
        table: filtered_data
      })
    } else {
      this.setState({
        table: master_table
      })
    }
  }

  render() {
    const {table} = this.state;
    return (
        <div className="row">
              <div className="col-12 my-2">
                    <input onChange={(value) => this.search(value)}/>
              </div>
              <div className="col-12">
                      <table id="simple-board" border="2">
                        <tbody>
                             <tr>
                                <th>Categories</th>
                            </tr>
                            {(table.length > 0 ? table : []).map((item, i) => (
                                <tr key={i} style={{border: "1px solid black"}}>
                                    <td>{item}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
  }


}


export default QuestionTwo;
