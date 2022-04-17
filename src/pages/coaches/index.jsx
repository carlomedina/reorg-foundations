import React, { useCallback, useContext, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useApi, useFormInputChange } from '../../hooks';
import useCoachesHook from './coaches.hooks';
import CoachCard from './components/coach-card.components';
import AppContext from '../../contexts/app.context';

const CoachesComponent = () => {
  const { loaded, loading, error, coaches, onChangeQuery, onCoachCardClick } =
    useCoachesHook(AppContext);
  return (
    <>
      <div>Coaches</div>
      {loading && <div>Loading</div>}
      {loaded &&
        (coaches.length === 0 ? (
          <div>No coaches found</div>
        ) : (
          // CLEAN DESIGN: always add keys on mapped items
          coaches.map((user) => {
            return (
              <CoachCard
                key={user.email}
                user={user}
                onCardClick={onCoachCardClick}
              />
            );
          })
        ))}
      {error && <div>{JSON.stringify(error)}</div>}
      {[1, 2, 3].map((pageNum) => {
        return (
          <div key={pageNum} onClick={() => onChangeQuery({ page: pageNum })}>
            {pageNum}
          </div>
        );
      })}
    </>
  );
};

const Coaches = React.memo(CoachesComponent);
export default Coaches;
