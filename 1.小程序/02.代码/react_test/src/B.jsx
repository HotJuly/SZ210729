import React,{Component} from 'react';

class B extends Component{
    state={
        msg:0
    }

    input666 = React.createRef();

    handleClick=()=>{
        // console.log('msg1',this.state.msg)
        // this.setState({
        //     msg:this.state.msg+1
        // })
        // console.log('msg2',this.state.msg)
        // this.setState({
        //     msg:this.state.msg+1
        // })
        // console.log('msg3',this.state.msg)
        // this.setState({
        //     msg:this.state.msg+1
        // })
        // console.log('msg4',this.state.msg)
        console.log('handleClick')
    }

    handleClick1=()=>{
        console.log('handleClick1')
    }
    render(){
        return (
            <div>
                B
                <h1>{this.state.msg}</h1>
                {/* <button onClick={this.handleClick}>+1</button> */}
                <button ref={this.input666}  onClick={this.handleClick1}>+1</button>
            </div>
        )
    }
    componentDidMount(){
        this.input666.current.onclick=this.handleClick;
    }
}

export default B;