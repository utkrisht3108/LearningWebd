import React from 'react';

const Home = (props: { name: string }) => {
  return (
    <div>
      <h1>
        Hi {props.name ? ' ' + props.name : ', You are not authenticated'}
      </h1>
    </div>
  );
};

export default Home;
