export default class Database {


	/****************/
	/* OVERVIEW API */
	/****************/

	// LOAD OVERVIEW DATA
	static loadOverview(year, app){
		this.async_loadOverview(year)
		.then((res) => {
      		let overviewDataStatus = {...app.state.overviewDataStatus}
      		overviewDataStatus.loaded = true;
      		overviewDataStatus.upToDate = true;
      		app.setState({ 
      			year: year,
      			overviewData: res,
      			overviewDataStatus: overviewDataStatus
      		})
      	})
      	.catch(err => console.log(err));
	}
	static async_loadOverview = async (year) => {
	    const response = await fetch('/api/overview/'+year);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    if(response.status !== 200) throw Error(body.error);
		    else return body;
	    } return {};
	};


	// SAVE OVERVIEW DATA
	static saveOverview(year, data, app) {
      	let overviewDataStatus = {...app.state.overviewDataStatus}
      	overviewDataStatus.saving = true;
		overviewDataStatus.upToDate = true;
		app.setState({overviewDataStatus:overviewDataStatus});

	    this.async_saveOverview(year, data)
	    .then((res) => {
	    	if(app.state.overviewDataStatus.upToDate === false){
	    		this.saveOverview(app);
	    	}else{
		      	let overviewDataStatus = {...app.state.overviewDataStatus}
		      	overviewDataStatus.saving = false;
	    		app.setState({overviewDataStatus:overviewDataStatus})	
	    	}	      	
	    })
	    .catch(err => console.log(err));

	}
	static async_saveOverview = async (year, data) => {
		const options = {
			method: "POST",
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify({ data:data })
		}
	    const response = await fetch('/api/overview/'+year, options);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    throw Error(body.error);
	    } return true;
	};


	/********************/
	/* TRANSACTIONS API */
	/********************/

	// LOAD TRANSACTIONS DATA
	static loadTransactions(year, month, app){
		const monthlabel = ((month<9)?"0"+(month+1):(month+1))
		const period = year + "" + monthlabel;
		this.async_loadTransactions(period)
		.then((res) => {
      		let transactionDataStatus = {...app.state['transactionsData'+monthlabel+'Status']}
      		transactionDataStatus.loaded = true;
      		transactionDataStatus.upToDate = true;
      		app.setState({ 
      			['transactionsData'+monthlabel]: res,
      			['transactionsData'+monthlabel+'Status']: transactionDataStatus
      		})
      	})
      	.catch(err => console.log(err));
	}
	static async_loadTransactions = async (period) => {
	    const response = await fetch('/api/transactions/'+period);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    if(response.status !== 200) throw Error(body.error);
		    else return body;
	    } return {};
	}

	// SAVE OVERVIEW DATA
	static saveTransactions(year, month, data, app) {
		const monthlabel = ((month<9)?"0"+(month+1):(month+1))
		const period = year + "" + monthlabel;
      	let transactionsDataStatus = {...app.state['transactionsData'+monthlabel+'Status']}
      	transactionsDataStatus.saving = true;
		transactionsDataStatus.upToDate = true;
		app.setState({['transactionsData'+monthlabel+'Status']:transactionsDataStatus});

	    this.async_saveTransactions(period, data)
	    .then((res) => {
	    	if(app.state['transactionsData'+monthlabel+'Status'].upToDate === false){
	    		this.saveTransactions(app);
	    	}else{
		      	let transactionsDataStatus = {...app.state['transactionsData'+monthlabel+'Status']}
		      	transactionsDataStatus.saving = false;
	    		app.setState({['transactionsData'+monthlabel+'Status']:transactionsDataStatus})	
	    	}	      	
	    })
	    .catch(err => console.log(err));

	}
	static async_saveTransactions = async (period, data) => {
		const options = {
			method: "POST",
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify({ data:data })
		}
	    const response = await fetch('/api/transactions/'+period, options);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    throw Error(body.error);
	    } return true;
	};


}
