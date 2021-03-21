import "./App.css";
import Test from "./component/Test";
import SimpleFullPages from "./component/simplefullpages";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* size={3} //页数
        speed={1000} //翻页速度
        mouse={1000} //滚轮cd
        drag={500} //拖拽cd
        draggingDistance={30}
        nav={true} //小圆点导航 */}
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
