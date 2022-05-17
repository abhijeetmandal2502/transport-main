import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginLeft: 0,
    marginRight: 0,
  },
});

function DatePickers(props) {
  const { classes, register } = props;
  const [date, setDate] = useState('');


  const dateSelect = (e) => {

  };

  return (
    // <form className={classes.container} noValidate id="datepickerdiv" >

    // </form>
    <TextField
      fullWidth
      id="date"
      // label="Date"
      variant="outlined"
      // placeholder="date"
      type="date"
      {...register}
      // className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(e) => dateSelect(e.target.value)}
    />
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
