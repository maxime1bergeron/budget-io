import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  
});

class TransactionCard extends React.Component {

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
      <div>Hello World !</div>
    );
  }
}

TransactionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionCard);