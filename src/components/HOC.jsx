import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'

/* fake ajax */
var testDB = {
	"ListA":[{"A":"Jason","B":"15","C":"Yes"},{"A":"Tom","B":"32","C":"No"},{"A":"Zack","B":"28","C":"Yes"}],
	"ListB":[{"A":"Devon","B":"25","C":"Yes"},{"A":"John","B":"17","C":"Yes"},{"A":"Bob","B":"22","C":"No"}]
};
var eventPool = {
	"ListA":[],
	"ListB":[]
}
const fakeFetchData = (listName)=>{
	return new Promise((resolve, reject) => {
	    window.setTimeout(()=>{
	    	resolve(JSON.stringify(testDB[listName]));
	    },1000);
	});
}

const fakeAddData = (listName, addData)=>{
	return new Promise((resolve, reject) => {
	    window.setTimeout(()=>{
	    	testDB[listName].push(addData);
	    	eventPool[listName].forEach(func=>{ func() });
	    	resolve();
	    },1000);
	});
}

const fakeAddDataUpdateEvent = (listName,func)=>{
	eventPool[listName].push(func);
}

const fakeRemoveDataUpdateEvent = (listName,func)=>{
	eventPool[listName].splice(eventPool[listName].indexOf(func),1);
}



const withDataAPI = ( WrappedComponent, listName ) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
	      	this.state = {
	      		data:[]
	      	}

	      	this._addDataHandler = this.addRow.bind(this);
	      	this._dataUpdateEventHandler = this._dataUpdateHandler.bind(this);
	    }

	    componentDidMount() {
      		this.loadData();
      		fakeAddDataUpdateEvent(listName,this._dataUpdateEventHandler);
    	}

	    componentWillUnmount() {
	      	//這邊要註銷AJAX(promise.abort())/Timer(clearTimeout)，本範例不是真的AJAX
	      	fakeRemoveDataUpdateEvent(listName,this._dataUpdateEventHandler);
	    }

	    _dataUpdateHandler(){
	    	this.loadData();
	    }

	    loadData(){
	    	fakeFetchData(listName).then((data)=>{
	    		this.setState({...this.state,data:JSON.parse(data)});
	    	});
	    }

	    addRow(rowData){
	    	fakeAddData(listName, rowData);
	    	alert("Add Data!:" + JSON.stringify(rowData));
	    }

	    render(){
	    	return <WrappedComponent data={this.state.data} onAddData={this._addDataHandler}  {...this.props} />;
	    }
	}
}

class EasyDataList extends React.Component {
	constructor(props) {
      	super(props);
    }

    render(){
    	return ( 
	    	<ul>
	    		{this.props.data.map((rowData,index)=>{
	    			let Objkeys = Object.keys(rowData);
	    			return (
	    				<li key={index}>
		    				{Objkeys.map((dataKey,index)=>{
		    					return <span key={dataKey}>{dataKey}:{rowData[dataKey]}</span>
		    				})}
	    				</li>
	    			)
	    		})}
	    	</ul>
	    )
    }
}

export const ListAWithDataAPI = withDataAPI(EasyDataList,"ListA");
export const ListBWithDataAPI = withDataAPI(EasyDataList,"ListB");

class EasyListWithRowInput extends React.Component {
	constructor(props) {
      	super(props);
      	this._submitEventHandler = this._submitHandler.bind(this);
    }

    _submitHandler(ev){
    	this.props.onAddData({
    		A:this.refs.AField.value,
    		B:this.refs.BField.value,
    		C:this.refs.CField.value
    	});
    	ev.preventDefault();
    	return false;
    }

    render(){
    	return ( 
	    	<div>
	    		<h1>Data List:</h1>
	    		<EasyDataList {...this.props} />
	    		<hr />
	    		<h1>Add Data:</h1>
	    		<form onSubmit={this._submitEventHandler}>
	    			<input ref="AField" type="text" placeholder="value of A" />
	    			<input ref="BField" type="text" placeholder="value of B" />
	    			<input ref="CField" type="text" placeholder="value of C" />
	    			<input type="submit" value="Add Row" />
	    		</form>
	    	</div>
	    )
    }
}

export const ListAndInputWithDataAPI = withDataAPI(EasyListWithRowInput,"ListA");
export const ListBndInputWithDataAPI = withDataAPI(EasyListWithRowInput,"ListB");