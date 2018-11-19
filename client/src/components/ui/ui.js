import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  select: {
    color: 'white',
    borderColor: 'white',
    '&:before': {
      borderColor: 'white!important',
    },
    '&:hover:before': {
      borderColor: 'white!important',
    },
    '& svg': {
      fill: 'white',
    },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  drawerSidebar: {
    width:400,
  },
  drawerSidebarContent: {
    width:400,
    padding: theme.spacing.unit * 5,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  contentTitle: {
    marginBottom: theme.spacing.unit * 3,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 5 + 64,
    position: 'relative',
  },
  yearPicker: {
    position: 'absolute',
    right: theme.spacing.unit * 5,
  },
  fab: {
    position: 'fixed',
    right: 400 + theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2
  }
});

class UI extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      year:this.props.year
    }

  }


  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onYearChange(event.target.value);
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <MonetizationOnIcon/>
            <Typography variant="h6" color="inherit" noWrap>
               &nbsp;Budget.IO
            </Typography>
            <form 
              className={classes.yearPicker} 
              autoComplete="off"
            >
              <FormControl className={classes.formControl}>
                <Select
                  value={this.state.year}
                  onChange={this.handleChange}
                  displayEmpty
                  name="year"
                  className={classes.select}
                >
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
              <ListItem button key="overview">
                <ListItemIcon><AccountBalanceIcon/></ListItemIcon>
                <ListItemText primary="Balance" />
              </ListItem>
              <ListItem button key="transactions">
                <ListItemIcon><CreditCardIcon/></ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItem>
              <ListItem button key="providers">
                <ListItemIcon><StoreMallDirectoryIcon/></ListItemIcon>
                <ListItemText primary="Commerçants" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key="settings">
                <ListItemIcon><SettingsIcon/></ListItemIcon>
                <ListItemText primary="Paramètres" />
              </ListItem>
          </List>
        </Drawer>            
        <main className={classes.content}>
          <Typography variant="h4" color="inherit" noWrap className={classes.contentTitle}>
            {this.props.sectionName}
          </Typography>
          {this.props.children[0]}         
        </main>
        <Drawer
          className={classes.drawerSidebar}
          variant="permanent"
          anchor="right"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerSidebarContent}>
            <div className={classes.toolbar} />
            <Typography variant="h4" color="inherit" noWrap className={classes.contentTitle}>
              {this.props.drawerName}
            </Typography>
            {this.props.children[1]}
          </div>
        </Drawer>  
         <Button variant="fab" color="primary" aria-label="Add" className={classes.button, classes.fab} onClick={() => this.props.onFABClick()}>
            <AddIcon />
          </Button>  
      </div>
    );
  }
}

UI.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UI);