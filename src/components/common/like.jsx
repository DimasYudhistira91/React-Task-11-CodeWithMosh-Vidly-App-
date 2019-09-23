import React from 'react';

const Like = (props) => {
  let heartImg = 'fa fa-heart';
  if(props.liked) heartImg += '-o'
  return (
    <i
      onClick={props.onClick}
      style={{cursor: 'pointer'}}
      className={heartImg}
      aria-hidden='true'
    />
  );
} 
 
export default Like;