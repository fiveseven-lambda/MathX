import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import './style.css';
import { convert } from './mathx';

class App extends React.Component<{}, {source: string}> {
  constructor(props: {}){
    super(props);
    this.state = {
      source: ''
    };
  }
  render(){
    let result: React.ReactNode[] = [];
    let math = false;
    let escaped = false;
    let mathText = '';
    for(const c of this.state.source){
      if(math){
        if(c === '}'){
          result.push(convert(mathText));
          mathText = '';
          math = false;
        }else{
          mathText += c;
        }
      }else if(escaped){
        result.push(c);
        escaped = false;
      }else{
        if(c === '\\'){
          escaped = true;
        }else if(c === '{'){
          math = true;
        }else{
          result.push(c);
        }
      }
    }
    return <div className='main'>
      <Input
        source={this.state.source}
        handleChange={ event => this.setState({ source: event.target.value }) }
      />
      <Output result={result}/>
    </div>
  }
}

const Input = (props: { source: string, handleChange: React.ChangeEventHandler<HTMLTextAreaElement> }) => (
  <textarea className='input' value={props.source} onChange={props.handleChange}/>
);

const Output = (props: { result: React.ReactNode }) => (
  <p className='output'>{props.result}</p>
);

ReactDOMClient
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  )