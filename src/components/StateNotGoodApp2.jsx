import React from 'react'
import PropTypes from 'prop-types'

class StateNotGood extends React.Component {
	constructor(props) {
	    super(props);
	    this.state= {
	    	name:props.data.name,
	    	keyword:props.data.keyword || []
	    }
	}

    componentWillReceiveProps(nextProps){
    	this.state({...this.state,name:props.name,keyword:props.keyword || []});
    }

    deleteKeyword(k){
    	this.updateKeyword(this.state.keyword.splice(this.state.keyword.findIndex(i=>i==k)));
    }

    updateKeyword(kArray){
    	this.setState({...this.state,keyword:kArray});
    }

    render(){
    	return(
    		<div>
    			<h3>{this.state.name}</h3>
    			<ul>{this.state.keyword.map(k=>{
    				return <li key={k} onClick={()=>this.deleteKeyword(k)}>{k}</li>
    			})}</ul>
    		</div>
    	)
    }

}

StateNotGood.propTypes = {
  data:PropTypes.object.isRequired
}


const bookData = [
	{ uqid:"r001",name:"React Guide", keyword:["react","frontEnd","javascript"] },
	{ uqid:"e001",name:"ES2016 Guide", keyword:["es2016","frontEnd","javascript"] },
	{ uqid:"r002",name:"Rxjs Guide", keyword:["rxjs","frontEnd","javascript"] }
];

const StateNotGoodApp = () => {
	return bookData.map(book=>{
		return <StateNotGood key={book.uqid} data={book} />
	})
}
export default StateNotGoodApp;
