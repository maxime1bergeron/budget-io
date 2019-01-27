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

	// SAVE TRANSACTIONS DATA
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


	/*****************/
	/* PROVIDERS API */
	/*****************/

	// LOAD PROVIDERS DATA
	static loadProviders(year, app){
		this.async_loadProviders(year)
		.then((res) => {

			// Build providers list
			let providersList = [];
			Object.keys(res).map(function(provider,_){
				return providersList.push({
					label: decodeURIComponent(provider),
					value: decodeURIComponent(provider)
				})
			})

			// Save providers to application data
      		let providersDataStatus = {...app.state.providersDataStatus}
      		providersDataStatus.loaded = true;
      		providersDataStatus.upToDate = true;
      		app.setState({ 
      			providers: providersList,
      			providersData: res,
      			providersDataStatus: providersDataStatus
      		})
      	})
      	.catch(err => console.log(err));
	}
	static async_loadProviders = async (year) => {
	    const response = await fetch('/api/providers/'+year);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    if(response.status !== 200) throw Error(body.error);
		    else return body;
	    } return {};
	}

	// SAVE PROVIDERS DATA
	static saveProviders(year, data, app) {
      	let providersDataStatus = {...app.state.providersDataStatus}
      	providersDataStatus.saving = true;
		providersDataStatus.upToDate = true;
		app.setState({providersDataStatus:providersDataStatus});

	    this.async_saveProviders(year, data)
	    .then((res) => {
	    	if(app.state.providersDataStatus.upToDate === false){
	    		this.saveProviders(app);
	    	}else{
		      	let providersDataStatus = {...app.state.providersDataStatus}
		      	providersDataStatus.saving = false;
	    		app.setState({providersDataStatus:providersDataStatus})	
	    	}	      	
	    })
	    .catch(err => console.log(err));

	}
	static async_saveProviders = async (year, data) => {
		const options = {
			method: "POST",
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify({ data:data })
		}
	    const response = await fetch('/api/providers/'+year, options);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    throw Error(body.error);
	    } return true;
	};


	/*****************/
	/* GROUPS API */
	/*****************/

	// LOAD GROUPS DATA
	static loadGroups(year, app){
		this.async_loadGroups(year)
		.then((res) => {

			// Build groupd list
			let groupsList = [];
			Object.keys(res).map(function(group,_){
				return groupsList.push({
					label: decodeURIComponent(group),
					value: decodeURIComponent(group)
				})
			})

			// Save groups to application data
      		let groupsDataStatus = {...app.state.groupsDataStatus}
      		groupsDataStatus.loaded = true;
      		groupsDataStatus.upToDate = true;
      		app.setState({ 
      			groups: groupsList,
      			groupsData: res,
      			groupsDataStatus: groupsDataStatus
      		})
      	})
      	.catch(err => console.log(err));
	}
	static async_loadGroups = async (year) => {
	    const response = await fetch('/api/groups/'+year);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    if(response.status !== 200) throw Error(body.error);
		    else return body;
	    } return {};
	}

	// SAVE GROUPS DATA
	static saveGroups(year, data, app) {
      	let groupsDataStatus = {...app.state.groupsDataStatus}
      	groupsDataStatus.saving = true;
		groupsDataStatus.upToDate = true;
		app.setState({groupsDataStatus:groupsDataStatus});

	    this.async_saveGroups(year, data)
	    .then((res) => {
	    	if(app.state.groupsDataStatus.upToDate === false){
	    		this.saveGroups(app);
	    	}else{
		      	let groupsDataStatus = {...app.state.groupsDataStatus}
		      	groupsDataStatus.saving = false;
	    		app.setState({groupsDataStatus:groupsDataStatus})	
	    	}	      	
	    })
	    .catch(err => console.log(err));

	}
	static async_saveGroups = async (year, data) => {
		const options = {
			method: "POST",
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify({ data:data })
		}
	    const response = await fetch('/api/groups/'+year, options);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    throw Error(body.error);
	    } return true;
	};


}
