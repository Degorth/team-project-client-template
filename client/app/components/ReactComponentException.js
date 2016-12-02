import React from 'react';

export default class ReactComponentException extends React.Component{
  render(){
      switch(this.props.type){
        case "1": {
          return <h1>Sorry For Some Reason This Component Broke the Application!</h1>;
        }
        default:{
          return <h1>Sorry For Some Reason This Component is Unimplemented!</h1>;
        }
      }
  }
}
