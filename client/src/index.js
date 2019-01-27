import React from 'react';
import ReactDOM from 'react-dom';

import DB from './modules/database.js'

import LuxonUtils from '@date-io/luxon';
import DateTime from 'luxon/src/datetime.js'

import { MuiPickersUtilsProvider } from 'material-ui-pickers';

import UI from './components/ui/ui.js';
import Overview from './components/overview/overview.js'
import TransactionForm from './components/transaction/transactionForm.js';
import TransactionDrawer from './components/transaction/transactionDrawer.js';

import './index.css';


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> c)) / 4).toString(16)
  )
}

class App extends React.Component {

	/*********************/
	/** DATA MANAGEMENT **/
	/*********************/

	constructor(props){
		super(props);

		const months = ["Janvier", "Février", "Mars", "Avril", "May", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
		
		const categories = [
			{"label":"Transport", 	"name":"transport", 	"items":5, 	type:'spending'},
			{"label":"Nourriture", 	"name":"nourriture", 	"items":2, 	type:'spending'},
			{"label":"Services", 	"name":"services", 		"items":3, 	type:'spending'},
			{"label":"Habitation", 	"name":"habitation", 	"items":3, 	type:'spending'},
			{"label":"Assurances", 	"name":"assurances", 	"items":3, 	type:'spending'},
			{"label":"Personnel", 	"name":"personnel", 	"items":7, 	type:'spending'},
			{"label":"Revenus", 	"name":"revenus", 		"items":2, 	type:'revenue'},
		];

		const subcategories = [
			{"label":"Transport", 		"name":"transport", 		"category":"transport"},
			{"label":"Essence", 		"name":"essence", 			"category":"transport"},
			{"label":"Auto", 			"name":"auto", 				"category":"transport"},
			{"label":"Stationnement", 	"name":"stationnement", 	"category":"transport"},
			{"label":"Autre", 			"name":"autre", 			"category":"transport"},
			{"label":"Restaurant", 		"name":"restaurant",		"category":"nourriture"},
			{"label":"Épicerie", 		"name":"epicerie",			"category":"nourriture"},
			{"label":"Cellulaire", 		"name":"cellulaire",		"category":"services"},
			{"label":"Internet", 		"name":"internet",			"category":"services"},
			{"label":"Abonnements", 	"name":"abonnements",		"category":"services"},
			{"label":"Loyer", 			"name":"loyer",				"category":"habitation"},
			{"label":"Mobilier", 		"name":"mobilier",			"category":"habitation"},
			{"label":"Électricité", 	"name":"electricite",		"category":"habitation"},
			{"label":"Automobile", 		"name":"automobile",		"category":"assurances"},
			{"label":"Habitation", 		"name":"habitation",		"category":"assurances"},
			{"label":"Santé", 			"name":"sante",				"category":"assurances"},
			{"label":"Vêtements", 		"name":"vetements",			"category":"personnel"},
			{"label":"Médicaments", 	"name":"medicaments",		"category":"personnel"},
			{"label":"Services", 		"name":"services",			"category":"personnel"},
			{"label":"Charité",	 		"name":"charite",			"category":"personnel"},
			{"label":"Cadeaux", 		"name":"cadeaux",			"category":"personnel"},
			{"label":"Vacances", 		"name":"vacances",			"category":"personnel"},
			{"label":"Autres", 			"name":"autres",			"category":"personnel"},
			{"label":"Salaire", 		"name":"salaire",			"category":"revenus"},
			{"label":"Autres", 			"name":"autres",			"category":"revenus"},
		];


		// Init states
		this.state = {

			months: months, 
			categories: categories, 
			subcategories: subcategories,
			providers: [],
			groups: [],

			year: (new Date()).getFullYear(),
			month: (new Date()).getMonth(),
			category:"",
			subcategory:"",

			transactionFormOpen: false,
			transactionFormPreviousId: null,
			transactionFormPreviousSource: null,
			transactionFormInitialData: {
				category:"",
				subcategory:"",
				amount:"",
				date:DateTime.local(),
				provider:"",
				group:"",
				details:""
			},
			
			overviewData: {},
			providersData: {},			
			groupsData: {},			
			transactionsData01: {},			
			transactionsData02: {},			
			transactionsData03: {},			
			transactionsData04: {},			
			transactionsData05: {},			
			transactionsData06: {},			
			transactionsData07: {},			
			transactionsData08: {},			
			transactionsData09: {},			
			transactionsData10: {},			
			transactionsData11: {},			
			transactionsData12: {},

			overviewDataStatus: { loaded: false, upToDate: false, saving: false },
			providersDataStatus: { loaded: false, upToDate: false, saving: false },
			groupsDataStatus: { loaded: false, upToDate: false, saving: false },
			transactionsData01Status: { loaded: false, upToDate: false, saving: false },
			transactionsData02Status: { loaded: false, upToDate: false, saving: false },
			transactionsData03Status: { loaded: false, upToDate: false, saving: false },
			transactionsData04Status: { loaded: false, upToDate: false, saving: false },
			transactionsData05Status: { loaded: false, upToDate: false, saving: false },
			transactionsData06Status: { loaded: false, upToDate: false, saving: false },
			transactionsData07Status: { loaded: false, upToDate: false, saving: false },
			transactionsData08Status: { loaded: false, upToDate: false, saving: false },
			transactionsData09Status: { loaded: false, upToDate: false, saving: false },
			transactionsData10Status: { loaded: false, upToDate: false, saving: false },
			transactionsData11Status: { loaded: false, upToDate: false, saving: false },
			transactionsData12Status: { loaded: false, upToDate: false, saving: false },

		}

	}

	// Load data 
	componentDidMount() {
	    DB.loadOverview(this.state.year, this);
	    DB.loadProviders(this.state.year, this);
	    DB.loadGroups(this.state.year, this);
	    for (let month=0; month<12; month++) {
	    	DB.loadTransactions(this.state.year, month, this);
	    }
	}

	// Switch year
	handleYearChange(year){
		this.setState({
			overviewDataStatus: { loaded: false, upToDate: false, saving: false },
			providersDataStatus: { loaded: false, upToDate: false, saving: false },
			groupsDataStatus: { loaded: false, upToDate: false, saving: false },
			transactionsData01Status: { loaded: false, upToDate: false, saving: false },
			transactionsData02Status: { loaded: false, upToDate: false, saving: false },
			transactionsData03Status: { loaded: false, upToDate: false, saving: false },
			transactionsData04Status: { loaded: false, upToDate: false, saving: false },
			transactionsData05Status: { loaded: false, upToDate: false, saving: false },
			transactionsData06Status: { loaded: false, upToDate: false, saving: false },
			transactionsData07Status: { loaded: false, upToDate: false, saving: false },
			transactionsData08Status: { loaded: false, upToDate: false, saving: false },
			transactionsData09Status: { loaded: false, upToDate: false, saving: false },
			transactionsData10Status: { loaded: false, upToDate: false, saving: false },
			transactionsData11Status: { loaded: false, upToDate: false, saving: false },
			transactionsData12Status: { loaded: false, upToDate: false, saving: false },
		})

		// Load new overview data
	    DB.loadOverview(year, this);
	    DB.loadProviders(year, this);
	    DB.loadGroups(year, this);
	    for (let month=1; month<=12; month++) {
	    	DB.loadTransactions(year, month, this);
	    }
	}


	/*******************/
	/** UI MANAGEMENT **/
	/*******************/

	// Set transaction drawer
	handleOverviewClick(month, category, subcategory){
		this.setState({
			month:month,
			category:(typeof category === "string")? category : "",
			subcategory:(typeof subcategory === "string")? subcategory : "",
		})
	}

	// FAB management
	handleFABClick(){
		this.setState({
			transactionFormOpen: true,
			transactionFormPreviousId: null,
			transactionFormPreviousSource: null,
			transactionFormInitialData: {
				category:"",
				subcategory:"",
				amount:"",
				date:DateTime.local(),
				provider:"",
				group:"",
				details:""
			},
		})
	}

	// Drawer CTA management
	handleDrawerCTAClick(){
		this.setState({
			transactionFormOpen: true,
			transactionFormPreviousId: null,
			transactionFormPreviousSource: null,
			transactionFormInitialData: {
				category:this.state.category,
				subcategory:this.state.subcategory,
				amount:"",
				date:DateTime.local(this.state.year, this.state.month+1,1).toFormat('yyyy-MM-dd:HH:mm:ss.SSS'),
				provider:"",
				group:"",
				details:""
			},
		})
	}

	// Close transction form
	handleTransactionFormClose(){
		this.setState({
			transactionFormOpen: false
		})	
	}	


	/*****************************/
	/** TRANSACTIONS MANAGEMENT **/
	/*****************************/

	// Add a new transaction 
	handleTransactionFormSave(transactionData){
		this.handleTransactionFormClose();

		// Get transaction details from form data
		let date;
		if(DateTime.isDateTime(transactionData.date)) date = transactionData.date;
		else date = DateTime.fromFormat(transactionData.date, "yyyy-MM-dd:HH:mm:ss.SSS");
		const monthlabel = (((date.month < 10)? "0" + date.month : date.month)).toString();

		const transactionType = this.getTransactionType(transactionData.category);

		const transaction = {
			id: uuidv4(),
			type: transactionType,
			category:transactionData.category,
			subcategory:transactionData.subcategory,
			amount:(transactionType === "revenue")? transactionData.amount : -transactionData.amount,
			date:date.ts,
			provider:encodeURIComponent(transactionData.provider.label),
			group:(typeof(transactionData.group) == "object" && typeof(transactionData.group.label) == "string")? encodeURIComponent(transactionData.group.label) : "",
			details:encodeURIComponent(transactionData.details),
			year:this.state.year,
			month:date.month-1,
			monthlabel: monthlabel,
			period: this.state.year + monthlabel
		}

		// Get the up-to-date data
		let _transactions = {...this.state["transactionsData"+monthlabel]};
		let _overview = {...this.state.overviewData};
		let _providers = {...this.state.providersData};
		let _groups = {...this.state.groupsData};

		
		// If we modify an existing transaction, we need to remove the old transaction first
		if(this.state.transactionFormPreviousId !== null){
			const previousTransaction = this.getTransactionFromId(this.state.transactionFormPreviousId, this.state.transactionFormPreviousSource);
			
			if(previousTransaction.monthlabel === monthlabel){
				_transactions = this.removeTransaction(_transactions, previousTransaction);
			}
			else{
				let _transactions2 = {...this.state["transactionsData"+previousTransaction.monthlabel]};
				_transactions2 = this.removeTransaction(_transactions2, previousTransaction);
				this.saveTransactions(_transactions2, previousTransaction);
			} 
			
			_overview = this.updateOverview(_overview, previousTransaction, "remove");
			_providers = this.updateProviders(_providers, previousTransaction, "remove");
			_groups = this.updateGroups(_groups, previousTransaction, "remove");
		}

		// Add the transaction
		_transactions = this.addTransaction(_transactions, transaction);
		_overview = this.updateOverview(_overview, transaction, "add");
		_providers = this.updateProviders(_providers, transaction, "add");
		_groups = this.updateGroups(_groups, transaction, "add");	
		
		// Save and mutate the data
		this.saveTransactions(_transactions, transaction);
		this.saveOverview(_overview, transaction);
		this.saveProviders(_providers, transaction);
		this.saveGroups(_groups, transaction);	

	}

	// Add a new transaction 
	handleOptionMenuClick(action, transactionId, source){

		const transaction = this.getTransactionFromId(transactionId, source);

		if(action === "remove"){
			
			// Get the data
			let _transactions = {...this.state["transactionsData"+transaction.monthlabel]};
			let _overview = {...this.state.overviewData};
			let _providers = {...this.state.providersData};
			let _groups = {...this.state.groupsData};

			// Update the data
			this.removeTransaction(_transactions, transaction);
			this.updateOverview(_overview, transaction, "remove");
			this.updateProviders(_providers, transaction, "remove");
			this.updateGroups(_groups, transaction, "remove");

			// Save the data
			this.saveTransactions(_transactions, transaction);
			this.saveOverview(_overview, transaction);
			this.saveProviders(_providers, transaction);
			this.saveGroups(_groups, transaction);	

		}

		else if(action === "modify"){
			this.setState({
			transactionFormOpen: true,
			transactionFormPreviousId: transaction.id,
			transactionFormPreviousSource: source,
			transactionFormInitialData: {
				category:transaction.category,
				subcategory:transaction.subcategory,
				amount:Math.abs(transaction.amount),
				date:DateTime.fromMillis(transaction.date).toFormat('yyyy-MM-dd:HH:mm:ss.SSS'),
				provider:decodeURIComponent(transaction.provider),
				group:decodeURIComponent(transaction.group),
				details:decodeURIComponent(transaction.details)
			},
		})
		}
	}

	// Get the data from a transaction using its id
	getTransactionFromId(transactionId, source){
		const transactionData = this.state[source][transactionId];
		
		if(typeof(transactionData) == "object"){

			const transaction = {
				id: transactionId,
				type: this.getTransactionType(transactionData.category),
				category:transactionData.category,
				subcategory:transactionData.subcategory,
				amount:transactionData.amount,
				date:transactionData.date,
				provider:transactionData.provider,
				group:transactionData.group,
				details:transactionData.details,
				year:this.state.year,
				month:parseInt(source.slice(-2)-1),
				monthlabel: source.slice(-2),
				period: this.state.year + source.slice(-2)
			}

			return transaction;

		}

		return null;

	}

	// Get wether a transaction is a spending or revenue based on its category
	getTransactionType(_category){
		let type = null;
		this.state.categories.map(function(category, i){
			if(category.name === _category) 
				type = category.type
			return true
		})
		return type;
	}

	// Save a new transaction
	addTransaction(data, transaction){

		// Build transaction data to save
		const transactionData = {
			id:transaction.id,
			category:transaction.category,
			subcategory:transaction.subcategory,
			amount:transaction.amount,
			date:transaction.date,
			provider:transaction.provider,
			group:transaction.group,
			details:transaction.details
		}

		data[transaction.id] = transactionData;
		return data;

	}

	// Remove a transaction
	removeTransaction(data, transaction){
		delete data[transaction.id];
		return data;
	}

	// Save the transactions to the database
	saveTransactions(data, transaction){
		this.setState({["transactionsData"+transaction.monthlabel]:data}); 
		if(this.state["transactionsData"+transaction.monthlabel+"Status"].saving){
      		let transactionDataStatus = {...this.state["transactionsData"+transaction.monthlabel+"Status"]}
      		transactionDataStatus.upToDate = false;
			this.setState({["transactionsData"+transaction.monthlabel+"Status"]:transactionDataStatus})	
		}else DB.saveTransactions(transaction.year, transaction.month, data, this);	
	}


	// Update the overview
	updateOverview(data, transaction, action){

		// Manage addition or removal of transactions
		let transactionAmount = transaction.amount;
		let transactionAbsAmount = Math.abs(transaction.amount);
		if(action === "remove"){
			transactionAmount =	-transactionAmount;
			transactionAbsAmount = -transactionAbsAmount;
		}

		// Update totals
		let keys = [];
		keys.push(transaction.year+"."+transaction.category+"-"+transaction.subcategory);
		keys.push(transaction.year+"."+transaction.category);
		keys.push(transaction.period+"."+transaction.category+"-"+transaction.subcategory);
		keys.push(transaction.period+"."+transaction.category);

		if(transaction.type === "spending"){
			keys.push(transaction.year+".spending");
			keys.push(transaction.period+".spending");
		}

		// Keep absolute count for categories and subcategories (spending or revenue)
		for (let i=0; i<keys.length; i++) {
			data[keys[i]] = (data[keys[i]])? data[keys[i]] + transactionAbsAmount : transactionAbsAmount;
		}

		// Calculate year and period totals (revenue - spending)
		data[transaction.period+".total"] = (data[transaction.period+".total"])? data[transaction.period+".total"] + transactionAmount : transactionAmount;
		data[transaction.year+".total"] = (data[transaction.year+".total"])? data[transaction.year+".total"] + transactionAmount : transactionAmount;
		
		return data;

	}

	// Save the overview to the database
	saveOverview(data, transaction){
		this.setState({ overviewData: data });
		if(this.state.overviewDataStatus.saving){
      		let overviewDataStatus = {...this.state.overviewDataStatus}
      		overviewDataStatus.upToDate = false;
			this.setState({overviewDataStatus:overviewDataStatus})	
		}else DB.saveOverview(transaction.year, data, this);	
	}
	
	// Update the providers data
	updateProviders(data, transaction, action){
		if(transaction.provider === "") return data;

		// Manage addition or removal of transactions
		let transactionAmount = transaction.amount;
		let transactionAbsAmount = Math.abs(transaction.amount);
		if(action === "remove"){
			transactionAmount =	-transactionAmount;
			transactionAbsAmount = -transactionAbsAmount;
		}

		// Update provider
		if(typeof(data[transaction.provider]) == "object"){
			if(transaction.type === "spending") data[transaction.provider].spending += transactionAbsAmount;
			if(transaction.type === "revenue") data[transaction.provider].revenue += transactionAbsAmount;
			data[transaction.provider].total += transactionAmount;
			
			if(action === "add"){
				data[transaction.provider].transactions += (data[transaction.provider].transactions !== "")? ";" + transaction.period + ":" + transaction.id : transaction.period + ":" + transaction.id;
			}
			else if(action === "remove"){
				data[transaction.provider].transactions = data[transaction.provider].transactions.replace(";" + transaction.period + ":" + transaction.id, "");
				data[transaction.provider].transactions = data[transaction.provider].transactions.replace(transaction.period + ":" + transaction.id + ";", "");
				data[transaction.provider].transactions = data[transaction.provider].transactions.replace(transaction.period + ":" + transaction.id, "");
			}
		}

		// Add new provider
		else if(action === "add"){

			data[transaction.provider] = {
				name : transaction.provider,
				description: "", 
				spending: (transaction.type === "spending")? transactionAbsAmount : 0,
				revenue: (transaction.type === "revenue")? transactionAbsAmount : 0,
				total: transactionAmount,
				transactions : transaction.period + ":" + transaction.id,
			}

			let providersList = [...this.state.providers];
			providersList.push({
				label:decodeURIComponent(transaction.provider),
				value:decodeURIComponent(transaction.provider),
			});
			this.setState({ providers: providersList });
		}

		return data;	

	}

	// Save the providers to the database
	saveProviders(data, transaction){
		this.setState({ providersData: data });
		if(this.state.providersDataStatus.saving){
      		let providersDataStatus = {...this.state.providersDataStatus}
      		providersDataStatus.upToDate = false;
			this.setState({providersDataStatus:providersDataStatus})	
		}else DB.saveProviders(transaction.year, data, this);
	}

	// Update the groups data
	updateGroups(data, transaction, action){
		if(transaction.group === "") return data;
		
		// Manage addition or removal of transactions
		let transactionAmount = transaction.amount;
		let transactionAbsAmount = Math.abs(transaction.amount);
		if(action === "remove"){
			transactionAmount =	-transactionAmount;
			transactionAbsAmount = -transactionAbsAmount;
		}

		// Update group
		if(typeof(data[transaction.group]) == "object"){
			if(transaction.type === "spending") data[transaction.group].spending += transactionAbsAmount;
			if(transaction.type === "revenue") data[transaction.group].revenue += transactionAbsAmount;
			data[transaction.group].total += transactionAmount;
			
			if(action === "add"){
				data[transaction.group].transactions += (data[transaction.group].transactions !== "")? ";" + transaction.period + ":" + transaction.id : transaction.period + ":" + transaction.id;
			}
			else if(action === "remove"){
				data[transaction.group].transactions = data[transaction.group].transactions.replace(";" + transaction.period + ":" + transaction.id, "");
				data[transaction.group].transactions = data[transaction.group].transactions.replace(transaction.period + ":" + transaction.id + ";", "");
				data[transaction.group].transactions = data[transaction.group].transactions.replace(transaction.period + ":" + transaction.id, "");
			}
		}

		// Add new group
		else if(action === "add"){

			data[transaction.group] = {
				name : transaction.group,
				description: "", 
				spending: (transaction.type === "spending")? transactionAbsAmount : 0,
				revenue: (transaction.type === "revenue")? transactionAbsAmount : 0,
				total: transactionAmount,
				transactions : transaction.period + ":" + transaction.id,
			}

			let groupsList = [...this.state.groups];
			groupsList.push({
				label:decodeURIComponent(transaction.group),
				value:decodeURIComponent(transaction.group),
			});
			this.setState({ groups: groupsList });
		}

		return data;

	}

	// Save the groups to the database
	saveGroups(data, transaction){
		this.setState({ groupsData: data });
		if(this.state.groupsDataStatus.saving){
      		let groupsDataStatus = {...this.state.groupsDataStatus}
      		groupsDataStatus.upToDate = false;
			this.setState({groupsDataStatus:groupsDataStatus})	
		}else DB.saveGroups(transaction.year, data, this);	
	}
	


	/************/
	/** RENDER **/
	/************/
	render() {

		let status = ""
		if(!this.state.overviewDataStatus.loaded) status = "Data is loading."
		else if(!this.state.overviewDataStatus.upToDate) status = "Data requires saving."
		else if(this.state.overviewDataStatus.saving) status = "Data is saving."
		else status = "Data is up-to-date."

		return (
			<MuiPickersUtilsProvider utils={LuxonUtils}>
				<UI key="root-ui"
				sectionName="Balance annuelle"
				drawerName={this.state.months[this.state.month]}
				year={this.state.year}
				onYearChange={(year) => this.handleYearChange(year)}
				onFABClick={(year) => this.handleFABClick()}
				>
				<div>
					<Overview key="overview"
					year={this.state.year} 
					months={this.state.months}
					categories={this.state.categories}
					subcategories={this.state.subcategories}
					data={this.state.overviewData} 
					onClick={(month, category, subcategory) => this.handleOverviewClick(month, category, subcategory)}
					/>
					<p key="status" >Overview : {status}</p>
				</div>
				<TransactionDrawer key="root-transactiondrawer"
				categories={this.state.categories}
				subcategories={this.state.subcategories}
				category={this.state.category}
				subcategory={this.state.subcategory}	
				months={this.state.months}
				data={this.state['transactionsData'+((this.state.month<9)?"0"+(this.state.month+1):(this.state.month+1))]}
				onCTA={() => this.handleDrawerCTAClick()}
				onOptionMenuClick={(action, id) => this.handleOptionMenuClick(action, id, 'transactionsData'+((this.state.month<9)?"0"+(this.state.month+1):(this.state.month+1)))}
				/>
				</UI>	
				<TransactionForm key="root-transactionform"
				open={this.state.transactionFormOpen}
				onClose={() => this.handleTransactionFormClose()}
				onSave={(transaction) => this.handleTransactionFormSave(transaction)}
				categories={this.state.categories}
				subcategories={this.state.subcategories}	
				providers={this.state.providers}
				groups={this.state.groups}
				initialData={this.state.transactionFormInitialData}
				year={this.state.year}
				/>
            </MuiPickersUtilsProvider>  
		);
	}
}

// ========================================

ReactDOM.render(
  <App />,	
  document.getElementById('root')
);
