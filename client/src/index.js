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

			year: (new Date()).getFullYear(),
			month: (new Date()).getMonth(),
			category:"",
			subcategory:"",

			transactionFormOpen: false,
			transactionFormInitialData: {
				category:"",
				subcategory:"",
				date:DateTime.local(),
			},
			
			overviewData: {},
			providersData: [],			
			groupsData: [],			
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
	    for (let month=1; month<=12; month++) {
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
	    for (let month=1; month<=12; month++) {
	    	DB.loadTransactions(year, month, this);
	    }
	}

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
			transactionFormInitialData: {
				category:"",
				subcategory:"",
				date:DateTime.local(),
			},
		})
	}

	// Drawer CTA management
	handleDrawerCTAClick(){
		this.setState({
			transactionFormOpen: true,
			transactionFormInitialData: {
				category:this.state.category,
				subcategory:this.state.subcategory,
				date:DateTime.local(this.state.year, this.state.month+1,2).toFormat('yyyy-MM-dd:HH:mm:ss.SSS')+'Z',
			},
		})
	}

	// Close transction form
	handleTransactionFormClose(){
		this.setState({
			transactionFormOpen: false
		})	
	}	

	// Update the overview based on a new transaction
	updateOverview(transaction, transactionType){
		const date = transaction.date.c;
		const period = date.year + "" + ((date.month < 10)? "0" + date.month : date.month);
		
		let data = {...this.state.overviewData};

		// REVENUE
		if(transactionType === "revenue"){

			let keys = [];
			keys.push(this.state.year+"."+transaction.category+"-"+transaction.subcategory);
			keys.push(this.state.year+"."+transaction.category);
			keys.push(period+"."+transaction.category+"-"+transaction.subcategory);
			keys.push(period+"."+transaction.category);

			for (let i=0; i<keys.length; i++) {
				data[keys[i]] = (data[keys[i]])? data[keys[i]] + transaction.amount : transaction.amount;
			}

			// Different calculation for total
			data[period+".total"] = (data[period+".total"])? data[period+".total"] + transaction.amount : transaction.amount;
			data[this.state.year+".total"] = (data[this.state.year+".total"])? data[this.state.year+".total"] + transaction.amount : transaction.amount;

		//SPENDINGS
		}else{

			let keys = [];
			keys.push(this.state.year+"."+transaction.category+"-"+transaction.subcategory);
			keys.push(this.state.year+"."+transaction.category);
			keys.push(this.state.year+".spending");
			keys.push(period+"."+transaction.category+"-"+transaction.subcategory);
			keys.push(period+"."+transaction.category);
			keys.push(period+".spending");

			for (let i=0; i<keys.length; i++) {
				data[keys[i]] = (data[keys[i]])? data[keys[i]] + transaction.amount : transaction.amount;
			}

			// Different calculation for total
			data[period+".total"] = (data[period+".total"])? data[period+".total"] - transaction.amount : -transaction.amount;
			data[this.state.year+".total"] = (data[this.state.year+".total"])? data[this.state.year+".total"] - transaction.amount : -transaction.amount;

		}

		this.setState({ overviewData: data });

		if(this.state.overviewDataStatus.saving){
      		let overviewDataStatus = {...this.state.overviewDataStatus}
      		overviewDataStatus.upToDate = false;
			this.setState({overviewDataStatus:overviewDataStatus})	
		}else DB.saveOverview(this.state.year, data, this);	
	}

	// Save a new transaction
	addTransaction(transaction, transactionType){
		const date = transaction.date.c;
		const monthlabel = ((date.month < 10)? "0" + date.month : date.month);

		const transactionData = {
			id:uuidv4(),
			category:transaction.category,
			subcategory:transaction.subcategory,
			amount:(transactionType === "revenue")? transaction.amount : -transaction.amount,
			date:transaction.date.ts,
			provider:encodeURIComponent(transaction.provider.label),
			group:(typeof transaction.group == "object")? encodeURIComponent(transaction.group.label) : "",
			details:encodeURIComponent(transaction.details)
		}

		let data = {...this.state["transactionsData"+monthlabel]}
		data[transactionData.id] = transactionData;
		this.setState({["transactionsData"+monthlabel]:data}); 

		if(this.state["transactionsData"+monthlabel+"Status"].saving){
      		let transactionDataStatus = {...this.state["transactionsData"+monthlabel+"Status"]}
      		transactionDataStatus.upToDate = false;
			this.setState({["transactionsData"+monthlabel+"Status"]:transactionDataStatus})	
		}else DB.saveTransactions(this.state.year, date.month-1, data, this);	

	}

	// Add a new transaction 
	handleTransactionFormSave(transaction){
		this.handleTransactionFormClose();

		const transactionType = this.getTransactionType(transaction.category);
		this.addTransaction(transaction, transactionType);
		this.updateOverview(transaction, transactionType);
	}

	getTransactionType(_category){
		let type = null;
		this.state.categories.map(function(category, i){
			if(category.name === _category) 
				type = category.type
			return true
		})
		return type;
	}

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
				/>
				</UI>	
				<TransactionForm key="root-transactionform"
				open={this.state.transactionFormOpen}
				onClose={() => this.handleTransactionFormClose()}
				onSave={(transaction) => this.handleTransactionFormSave(transaction)}
				categories={this.state.categories}
				subcategories={this.state.subcategories}	
				providers={this.state.providersData}
				groups={this.state.groupsData}
				category={this.state.transactionFormInitialData.category}
				subcategory={this.state.transactionFormInitialData.subcategory}	
				date={this.state.transactionFormInitialData.date}	
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
