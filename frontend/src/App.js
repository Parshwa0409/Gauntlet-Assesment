import './App.css';
import Navbar from './components/NavBar.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
