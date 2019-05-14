import React from "react";
import SeriesA from "./components/SeriesA"
import SeriesAA from "./components/SeriesAA"
import SAFE from "./components/SAFE"
import {Button} from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
  state = {index: 0}
  
renderForm = () => {

  if(this.state.index == 0) return <SeriesA/>
  if(this.state.index == 1) return <SeriesAA/>
  if(this.state.index == 2) return <SAFE/>
}

  render() {
    return(
      <div>
      <div>
        <Button onClick={()=>this.setState({index:0})}> Series A</Button>
        <Button onClick={()=>this.setState({index:1})}>Series AA</Button>
        <Button onClick={()=>this.setState({index:2})}>SAFE</Button>
      </div>
      {this.renderForm()}
      </div>
    )
  }
}

export default App;