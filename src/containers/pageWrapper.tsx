import React, { FC, MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useDispatch } from 'react-redux';
import { increment , decrement } from '../store/actions'; 


const PageWrapper:FC = () =>{

  const dispatch = useDispatch();

  const counterFunc = (type:string) =>{
    switch(type){
      case '+': 
        dispatch(increment())
      break;
      case '-':
        dispatch(decrement());
      break;
    }
  }

  return (
    <ButtonGroup size="small" aria-label="small outlined button group" color="primary">
      <Button onClick={()=>counterFunc('+')}>+</Button>
      <Button onClick={()=>counterFunc('-')}>-</Button>
    </ButtonGroup>
  );
}

export default PageWrapper;