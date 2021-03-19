import './App.css';
import Test from './component/Test';
import SimpleFullPages from './component/simplefullpages';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <SimpleFullPages>
          <Test title="第一页" bg="orange" />
          <Test title="第二页" bg="dodgerblue" />
          <Test title="第三页" bg="tomato" />
        </SimpleFullPages>
      </header>
    </div>
  );
}

export default App;
