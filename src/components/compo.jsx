import React from 'react';

function Compo(props) {
  const { msg } = props;
  return (
    <>
      <div>
            Called from
        {' '}
        {msg}
      </div>
    </>
  );
}

export default Compo;
