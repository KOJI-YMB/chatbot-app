import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const Answer = (props) => {
  return (
    <Button variant="contained" color='primary' onClick={() => props.select(props.content, props.nextId)}>
      {props.content}
    </Button>
  );
};

export default Answer;
