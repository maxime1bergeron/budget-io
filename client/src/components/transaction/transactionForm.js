import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from './select.js';
import Autocomplete from './autocomplete.js';
import { InlineDatePicker } from 'material-ui-pickers';


const styles = theme => ({
  formContainer: {
    clear: 'both'
  },
  halfWidth: {
    width: '50%',
    float: 'left',
    "&:first-child": {
      paddingRight: theme.spacing.unit,
    },
    "&:last-child": {
      paddingLeft: theme.spacing.unit,
    }
  },
  spaceAfter: {
    marginBottom: theme.spacing.unit*2,
  },
  dialog: {
    width:500,
  },  
  datePicker: {
    width: '100%',
  },
  noOverflow: {
    '& textarea': {
      overflow:'hidden',      
    },
  }
});

class TransactionForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      category:"",
      categories:[],
      subcategory:"",
      subcategories:[],
      subcategoryDisabled:true,      
      amount:"",
      date:this.props.date,
      provider:"",
      group:"",
      details:"",
      errors: {},
    }

//    this.resetState = this.state;

  }

  getSubcategories(category){
    let subcategories = [];
    this.props.subcategories.map(function(subcategory, i){
      if(subcategory.category === category)
        subcategories.push(subcategory)
      return true
    })
    return subcategories;
  }

  handleChangeInput(name, value) {
    this.setState({[name]:value});
    if(name === "category") this.handleChangeCategory(value);

    let errors = {...this.state.errors}
    errors[name] = false
    this.setState({errors:errors});
  }

  handleChangeCategory(category){
    this.setState({ 
      subcategory:"",
      subcategories:this.getSubcategories(category),
      subcategoryDisabled:false
    })
  }

  handleEnter() {

    const category = (this.props.category === "spending")? "" : this.props.category;

    let subcategories = [];
    let subcategoryDisabled = true;
    if(category !== ""){
      subcategories = this.getSubcategories(category);
      subcategoryDisabled = false
    }

    console.log(this.props.date);

    this.setState({
      category:category,
      categories:this.props.categories,
      subcategory:this.props.subcategory,
      subcategories:subcategories,
      subcategoryDisabled:subcategoryDisabled,      
      amount:"",
      date:this.props.date,
      provider:"",
      group:"",
      details:"",
      errors: {},
    })
    this.resetState = this.state;
  }

  handleExit() {
   // this.setState(this.resetState);
  }

  handleSave(){

    let valid = true;
    let errors = {};
    if(this.state.category === "") {
      errors.category = true;
      valid = false;
    }else if(this.state.subcategory === "") {
      errors.subcategory = true;
      valid = false;
    }
    if(this.state.amount === "") {
      errors.amount = true;
      valid = false;
    }
    if(this.state.provider === "") {
      errors.provider = true;
      valid = false;
    }

    this.setState({errors:errors})
    
    if(valid){
      const transaction = {
        category:this.state.category,
        subcategory:this.state.subcategory,
        amount:parseFloat(this.state.amount),
        date:this.state.date,
        provider:this.state.provider,
        group:this.state.group,
        details:this.state.details,
      }
      this.props.onSave(transaction);
    }
  }

  render() {
    const { classes } = this.props;
 
    const avatarClasses = {
      transport: { backgroundColor: '#ff00ff' },
      nourriture: { backgroundColor: '#4a86e6' },
      services: { backgroundColor: '#fe9900' },
      habitation: { backgroundColor: '#fd0005' },
      assurances: { backgroundColor: '#9b00fc' },
      personnel: { backgroundColor: '#68a94f' },
    };

    return (
      <Dialog
        open={this.props.open}
        onEnter={() => this.handleEnter()}
        onClose={() => this.props.onClose()}
        onExited={() => this.handleExit()}
        disableBackdropClick={true}
        aria-labelledby="form-dialog-title"        
      >
        <DialogTitle id="form-dialog-title">Enregistrer une dépense</DialogTitle>
        <DialogContent className={classes.dialog} >
          <form autoComplete="off">

            <div className={classes.formContainer}>
              <div className={classNames([classes.halfWidth, classes.spaceAfter])}>
                <Select
                  name="category"
                  label="Categorie *"
                  value={this.state.category}
                  required
                  options={this.state.categories}
                  onChange={(value) => this.handleChangeInput('category', value)}
                  showAvatar={true}
                  avatarClasses={avatarClasses}
                  error={this.state.errors.category? this.state.errors.category : false}
                />
              </div>
              <div className={classNames([classes.halfWidth, classes.spaceAfter])}>
                <Select
                  name="subcategory"
                  label="Sous-Catégorie *"
                  value={this.state.subcategory}
                  onChange={(value) => this.handleChangeInput('subcategory', value)}
                  required
                  options={this.state.subcategories}
                  disabled={this.state.subcategoryDisabled} 
                  error={this.state.errors.subcategory? this.state.errors.subcategory : false}   
                />
              </div>
            </div>

            <div className={classes.formContainer}>
              <div className={classNames([classes.halfWidth,classes.spaceAfter])}>
                <TextField 
                id="amount"
                label="Montant *"
                type="Number"
                value={this.state.amount}
                fullWidth
                onChange={(event) => this.handleChangeInput('amount', event.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                error={this.state.errors.amount? this.state.errors.amount : false}   
                />
              </div>

              <div className={classNames([classes.halfWidth,classes.spaceAfter])}>
                <InlineDatePicker
                label="Date *"
                onlyCalendar
                value={this.state.date}
                onChange={(value) => this.handleChangeInput('date', value)}
                animateYearScrolling={false}
                autoOk
                minDate={new Date(new Date().getFullYear(), 0, 1)}                  
                maxDate={new Date(new Date().getFullYear()+1, 0, 0)}
                className={classes.datePicker}
                />
              </div>
            </div>

            <div className={classNames([classes.formContainer,classes.spaceAfter])}>
              <Autocomplete
                label="Commerçant *"
                name="provider"
                placeholder="Entrer un commerçant"
                suggestions={this.props.providers}
                value={this.state.provider}
                onChange={(value) => this.handleChangeInput('provider', value)}
                error={this.state.errors.provider? this.state.errors.provider : false}   
              />
            </div>
            
            <div className={classNames([classes.formContainer,classes.spaceAfter])}>
              <Autocomplete
                label="Dépenses groupées"
                name="group"
                placeholder="Entrer un groupe de dépenses"
                suggestions={this.props.groups}
                value={this.state.group}
                onChange={(value) => this.handleChangeInput('group', value)}
              />
            </div>

            <div className={classes.formContainer}>
              <TextField 
                id="details"
                label="Details"
                value={this.state.details}
                fullWidth
                multiline
                onChange={(event) => this.handleChangeInput('details', event.target.value)}
              />
            </div>

          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => this.props.onClose()} color="primary">
            Annuler
          </Button>
          <Button onClick={() => this.handleSave()} color="primary">
            Enregistrer
          </Button>
        </DialogActions>

      </Dialog>
    );
  }
}

TransactionForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionForm);