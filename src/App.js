import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './component/todo/ToDo'

function App() {
  return (
    <div className="App">
      <div className="container">
        <ToDo />
      </div>
    </div>
    //some comment
  );
}


export default App;
