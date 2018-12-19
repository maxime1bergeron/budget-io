import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import BasicSelect from '@material-ui/core/Select';


const styles = theme => ({
 selectAvatar: {
    width: 14,
    height: 14,
    marginRight: 10,
    float: 'left',
    top: 2,
    backgroundColor: 'gray'
  },  
});

function OptionAvatar(props) {
  if(props.showAvatar){
    return <Avatar className={props.classes.selectAvatar} style={props.avatarClass} />
  }
  return null;  
}

class Select extends React.Component {

  handleChange = event => {
    if(this.props.onChange){
      this.props.onChange(event.target.value);
    }
  }

  empty() {
    this.setState({ value: "" });
  }

  render() {
    const { classes } = this.props;

    return (
      <FormControl fullWidth >
        <InputLabel 
        error={this.props.error? this.props.error : false}
        htmlFor={this.props.name}
        >
          {this.props.label}
        </InputLabel>
        <BasicSelect
        value={this.props.value}
        onChange={this.handleChange}
        required={this.props.required? this.props.required : false}
        disabled={this.props.disabled? this.props.disabled : false}
        error={this.props.error? this.props.error : false}
        inputProps={{
          name: this.props.name,
          id: this.props.name,
        }}
        >
        {
          this.props.options.map((option, i) => {
            return (
              <MenuItem               
              key={"select-"+this.props.name+"-"+option.name} 
              value={option.name} 
              >
                <OptionAvatar 
                classes={classes}
                showAvatar={this.props.showAvatar? this.props.showAvatar : false}
                avatarClass={this.props.avatarClasses? this.props.avatarClasses[option.name] : false}
                />
                {option.label}
              </MenuItem>
            )
          })
        }                 
        </BasicSelect>
      </FormControl>
    );
  }
}

Select.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Select);