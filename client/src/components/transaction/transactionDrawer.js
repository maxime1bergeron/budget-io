import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
  card: {
    minWidth: 275,
    marginBottom: 12,
  },
  cardOptionButtons: {
    float:'right',
    top:-7,
    right:-10,
  },
  title: {
    fontSize: 14,
  },
  amount: {
    marginTop:5, 
  },
  provider: {
    marginTop: 3,
  },
  details: {
    marginTop: 6,
    whiteSpace: 'pre-wrap',
  },
  group: {
    marginTop: 6,
    whiteSpace: 'pre-wrap',
    fontStyle: 'italic',
  },
  categoryAvatar: {
    width: 12,
    height: 12,
    marginRight: 6,
    float: 'left',
    top: 7,
    backgroundColor: 'gray'
  },
  amountSpending: {
  },
  amountRevenue: {
    color:'green',
  },
  subtitle: {
    marginTop:-20,
    marginBottom:20,
  },
  subtitleCategoryAvatar: {
    width: 12,
    height: 12,
    marginRight: 6,
    float: 'left',
    top: 5,
    backgroundColor: 'gray'
  },
  button: {
    height:50,
    marginTop:20,
    left:'50%',
    transform:'translateX(-50%)'
  },
  transactionsInfos: {
    fontSize: 4,
    marginBottom: 20,
  }
});

const avatarClasses = {
      transport: { backgroundColor: '#ff00ff' },
      nourriture: { backgroundColor: '#4a86e6' },
      services: { backgroundColor: '#fe9900' },
      habitation: { backgroundColor: '#fd0005' },
      assurances: { backgroundColor: '#9b00fc' },
      personnel: { backgroundColor: '#68a94f' },
    };

function TransactionSubtitle(props){
  if(props.category === "spending"){
    return(
      <div className={props.classes.subtitle}>
        <Avatar className={props.classes.subtitleCategoryAvatar} />
        <Typography component="p">Dépenses</Typography>
      </div>
    )
  }else if(props.category === "revenue"){
    return(
      <div className={props.classes.subtitle}>
        <Avatar className={props.classes.subtitleCategoryAvatar} />
        <Typography component="p">Revenus</Typography>
      </div>
    )
  }else if(props.category && props.categoryname && props.subcategoryname){
    return(
      <div className={props.classes.subtitle}>
        <Avatar className={props.classes.subtitleCategoryAvatar} style={avatarClasses[props.category]} />
        <Typography component="p">
          {props.categoryname} / {props.subcategoryname}
        </Typography>
      </div>
    )
  }else if(props.category && props.categoryname){
    return(
      <div className={props.classes.subtitle}>
        <Avatar className={props.classes.subtitleCategoryAvatar} style={avatarClasses[props.category]} />
        <Typography component="p">
            {props.categoryname}
        </Typography>
      </div>
    )
  }else{
    return(
      <div className={props.classes.subtitle}>
        <Avatar className={props.classes.subtitleCategoryAvatar} />
        <Typography component="p">Toutes les transactions</Typography>
      </div>
    )
  }
}

function TransactionDetails(props){
  if(props.details){
    return(
      <Typography className={props.classes.details} color="textSecondary">
        {props.details}
      </Typography>
    )
  }
  else return null;
}

function TransactionGroup(props){
  if(props.group){
    return(
      <Typography className={props.classes.group} color="textSecondary">
        Groupé sous <strong>{props.group}</strong>
      </Typography>
    )
  }
  else return null;
}


function TransactionAmount(props){
    
    let modifierClass = {}
    let modifierText = "";
    if(parseFloat(props.amount) > 0 ){
      modifierClass = props.classes.amountRevenue
      modifierText = "+ "
    }
    else if(parseFloat(props.amount) < 0 ){
      modifierClass = props.classes.amountSpending
      modifierText = "- "
    }

    return(
      <Typography variant="h5" component="h2" className={modifierClass}>
          {modifierText + Math.abs(parseFloat(props.amount)).toFixed(2) + " $"}
      </Typography>
    )
}

function TransactionCard(props){
    return(
      <Card className={props.classes.card}>           
        <CardContent>

          <IconButton 
          className={props.classes.cardOptionButtons}
          onClick={(e) => props.onOptionMenuOpenClick(e)}
          >
            <MoreVertIcon/>
          </IconButton>          

          <TransactionAmount 
          className={props.classes.amount}
          classes={props.classes}
          amount={props.amount}
          />

          <Avatar className={props.classes.categoryAvatar} style={avatarClasses[props.category]} />
          <Typography className={props.classes.provider} component="p">
            {props.subcategoryname} / {props.provider}
          </Typography>

          <Typography className={props.classes.title} gutterBottom>
            {(new Date(parseInt(props.date))).getDate() + " " + props.months[(new Date(parseInt(props.date))).getMonth()] + " " + (new Date(parseInt(props.date))).getFullYear()}
          </Typography>

          <TransactionGroup 
          classes={props.classes}
          group={props.group} 
          />

          <TransactionDetails 
          classes={props.classes}
          details={props.details} 
          />
        </CardContent>
      </Card>
    )
}

function TransactionCards(props){

  let numberOfCards = 0;
  let revenus = 0;
  let spending = 0;
  let cards = [];

  Object.keys(props.data).sort(sortTransactions(props.data)).map((transaction,_) => {
    const data = props.data[transaction];
    
    if((props.category === "spending" && data.category !== "revenus") ||
      ((props.category === "" || (data.category === props.category)) &&
       (props.subcategory === "" || (data.subcategory === props.subcategory)))) {

      if(data.category === "revenus") revenus += data.amount;
      else spending += data.amount;

      numberOfCards++;
      cards.push(
        <TransactionCard 
        key={"transaction-"+data.id}
        classes={props.classes}
        months={props.months}
        date={data.date}
        amount={data.amount}
        provider={decodeURIComponent(data.provider)}
        category={data.category}
        subcategoryname={props.subcategories[data.category+"-"+data.subcategory]}
        group={decodeURIComponent(data.group)}
        details={decodeURIComponent(data.details)}
        onOptionMenuOpenClick={(e) => props.onOptionMenuOpenClick(e, data.id)}
        />
      );

    }
    return null;

  })


  if(numberOfCards > 0){
    cards.unshift(
      <div className={props.classes.transactionsInfos} key="transactions-infos">
        <Typography component="p">
          <b>{(numberOfCards>1)? numberOfCards + " transactions" : "1 transaction"}</b><br/>
          {"Total : " + (revenus+spending).toFixed(2) + " $"}
        </Typography>
      </div>
    )
    return cards;
  }else{
    return (
      <div className={props.classes.noResultText}>
        <Typography component="p" variant="subheading">
          Aucun résultat
        </Typography>
      </div>
    )
  }
}

function sortTransactions(data){
  return function(a, b){
    const ta = data[a];
    const tb = data[b];
    if(ta.date > tb.date) return -1
    else if(ta.date < tb.date) return 1
    else return 0
  }
}

class TransactionDrawer extends React.Component {
  
  constructor(props){
    super(props);
  
    const categories = {}
    this.props.categories.forEach(function(item) {
      return categories[item.name] = item.label;
    });

    const subcategories = {}
    this.props.subcategories.forEach(function(item) {
      return subcategories[item.category+"-"+item.name] = item.label;
    });

    this.state = { 
      categories: categories,
      subcategories: subcategories,  
      optionsMenuAnchorEl: null,
    }

  }  

  handleOptionMenuOpenClick = (event, id) => {
    this.setState({ 
      optionsMenuAnchorEl: event.currentTarget,
      optionMenuCardID: id
    });
  };

  handleOptionMenuClose = (action, callback) => {
    if(typeof(callback) === "function")
      callback(action, this.state.optionMenuCardID);
    this.setState({ optionsMenuAnchorEl: null });
  };

  render() {
    const { classes } = this.props;
 
    return (
      <div>

        <TransactionSubtitle 
        classes={classes}
        category={this.props.category}
        categoryname={this.state.categories[this.props.category]}
        subcategoryname={this.state.subcategories[this.props.category+"-"+this.props.subcategory]}
        />

        <TransactionCards
        classes={classes}
        data={this.props.data}
        months={this.props.months}
        subcategories={this.state.subcategories}
        category={this.props.category}
        subcategory={this.props.subcategory}
        onOptionMenuOpenClick={(e, id) => this.handleOptionMenuOpenClick(e, id)}
        />

        <Button 
        variant="contained" 
        size="large" 
        className={classes.button}
        onClick={() => this.props.onCTA()}
        >
          Ajouter une transaction
        </Button>

        <Menu
          id="simple-menu"
          anchorEl={this.state.optionsMenuAnchorEl}
          open={Boolean(this.state.optionsMenuAnchorEl)}
          onClose={this.handleOptionMenuClose}
          >
            <MenuItem onClick={() => this.handleOptionMenuClose("modify", this.props.onOptionMenuClick)}>Modifier</MenuItem>
            <MenuItem onClick={() => this.handleOptionMenuClose("remove", this.props.onOptionMenuClick)}>Retirer</MenuItem>
            <MenuItem onClick={() => this.handleOptionMenuClose("adjust", this.props.onOptionMenuClick)}>Ajuster</MenuItem>
          </Menu>

      </div>
      
    );
  }
}

TransactionDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionDrawer);