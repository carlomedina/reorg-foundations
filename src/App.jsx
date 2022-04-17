import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import React, { useContext, useEffect, useMemo } from 'react';
import NavBar from './components/layout/navbar';
import AppContext, { AppProvider } from './contexts/app.context';
import { useApi } from './hooks';
import Login from './pages/login';
import Coaches from './pages/coaches';
import LoginModal from './components/layout/login-modal';

export default function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <NavBar />
          <LoginModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="test-auth" element={<TestAuth />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Placeholder container="signup" />} />
            <Route path="logout" element={<Logout />} />
            <Route path="coaches">
              <Route index element={<ExploreRedirect what="coaches" />} />
              <Route path=":slug" element={<User />} />
            </Route>
            <Route path="careers">
              <Route index element={<ExploreRedirect what="careers" />} />
              <Route path=":slug" element={<Career />} />
            </Route>
            <Route path="events">
              <Route index element={<ExploreRedirect what="events" />} />
            </Route>
            <Route path="videos">
              <Route index element={<ExploreRedirect what="events" />} />
            </Route>

            {/* definitely need to be logged in to reach this */}
            <Route path="/my">
              <Route path="profile" element={<MyProfile />}>
                <Route path="edit" element={<EditProfile />} />
              </Route>
              <Route path="coaches" element={<MyCoaches />} />
              <Route path="availability" element={<MyAvailability />} />
              <Route path="kadets" element={<MyKadets />} />
            </Route>
            <Route path="explore" element={<Explore />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AppProvider>
    </>
  );
}

function Home() {
  const { loggedUser, isAuth } = useContext(AppContext);
  return (
    <div>
      <span>{JSON.stringify(loggedUser)}</span>
    </div>
  );
}

function useLogoutHooks(context) {
  const { remLoggedUser, isAuth } = useContext(context);

  useEffect(() => {
    remLoggedUser();
  }, []);

  return { isAuth };
}

function Logout() {
  const { isAuth } = useLogoutHooks(AppContext);

  return (
    <div>
      <span>Status: Logged In? {`${isAuth}`}</span>
    </div>
  );
}

// TEST: when this page loads for the first time, the user gets 401
// it should trigger the login modal to popup and block the whole screen
function useTestAuthHook(context) {
  const { showLoginModal, setShowLoginModal } = useContext(context);
  const { statusCode } = useApi({
    url: 'https://httpstat.us/401?username=123&password=abc',
    method: 'GET',
  });

  useEffect(() => {
    if (statusCode === 401) {
      setShowLoginModal(true);
    }
  }, [statusCode]);

  return { showLoginModal };
}

function TestAuth() {
  const { showLoginModal } = useTestAuthHook(AppContext);
  return null;
}

function useUserHook(context) {
  const navigate = useNavigate();
  const params = useParams();
  const username = params.slug;

  const URL = {
    page: 'https://reqres.in/api/users',
    noPage: 'https://jsonplaceholder.typicode.com/users',
  }['noPage'];
  const { result, loading, loaded, error } = useApi({
    url: URL,
    params: { username },
  });

  return {
    username,
    user: loaded && result.length > 0 ? result[0] : null,
    loading,
    loaded,
    error: loaded && result.length === 0 ? { error: 'User not found' } : error,
  };
}

function User() {
  const { username, user, loading, loaded, error } = useUserHook(AppContext);
  return (
    <>
      {loading && <div>Loading</div>}
      {loaded && user ? (
        <div>
          User {username}
          <div>{JSON.stringify(user)}</div>
        </div>
      ) : (
        <div>{JSON.stringify(error)}</div>
      )}
    </>
  );
}

function ExploreRedirect({ what }) {
  return <Navigate to={`/explore?what=${what}`} replace />;
}

function Career() {
  const params = useParams();
  const careerSlug = params.slug;
  return <div>Career {careerSlug} </div>;
}

function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <a href="/partners">KadaPartners</a>
          </li>
          <li>
            <a href="/careers">Build the next-gen digital native workforce</a>
          </li>
          <li>
            <a href="mailto:hege@example.com">Email us</a>
          </li>
        </ul>
      </nav>
      <small>Made with ❤️</small>
      <address>Somewhere and Everywhere</address>
    </footer>
  );
}

function Placeholder({ container }) {
  return <div>{container}</div>;
}

function EditProfile() {
  return <div>Edit Profile</div>;
}

function MyProfile() {
  return <div>My Profile</div>;
}

function MyCoaches() {
  return <div>My Coaches</div>;
}

function MyKadets() {
  return <div>My Kadets</div>;
}

function MyAvailability() {
  return <div>My Availability</div>;
}

function Explore() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('what');
  const main = useMemo(() => {
    switch (tab) {
      case 'coaches':
        return <Coaches />;
      case 'careers':
        return <div>Explore {searchParams.get('what')}</div>;
      case 'events':
        return <div>Explore {searchParams.get('what')}</div>;
      default:
        return <Coaches />;
    }
  }, [tab]);

  return (
    <>
      <h1>Explore KadaKareer!</h1>
      <nav style={{ display: 'flex' }}>
        {[
          { label: 'Coaches', stub: 'coaches' },
          { label: 'Careers', stub: 'careers' },
          { label: 'Events', stub: 'events' },
        ].map(({ label, stub }) => {
          return (
            <button
              onClick={() => navigate(`/explore?what=${stub}`)}
              key={stub}
              style={{ margin: 10 }}
            >
              {label}
            </button>
          );
        })}
      </nav>
      <main>{main}</main>
    </>
  );
}
