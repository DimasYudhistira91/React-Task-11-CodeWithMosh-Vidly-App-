import React from 'react';

const Like = (props) => {
  return (
    <i
      onClick={props.onClick}
      style={{cursor: 'pointer'}}
      className={props.liked ? 'fas fa-heart' : 'far fa-heart'}
    />
  );
} 
 
export default Like;