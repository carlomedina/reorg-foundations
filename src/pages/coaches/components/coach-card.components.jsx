import React from 'react';

const CoachCardComponent = ({ user, onCardClick }) => {
  return (
    <div
      onClick={onCardClick}
      style={{ border: '2px solid black', margin: 10, cursor: 'pointer' }}
      data-username={user.username}
    >
      {user.email && <div>{user.email}</div>}
      {user.username && <div>{user.username}</div>}
    </div>
  );
};

const CoachCard = React.memo(CoachCardComponent);
export default CoachCard;
