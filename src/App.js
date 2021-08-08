import axios from "axios";

const API_BASE = 'http://localhost:3001'

function App() {
  axios.get(`${API_BASE}/${encodeURIComponent("유명하다")}`).then(res => {
    axios.get(`${API_BASE}/match/${encodeURIComponent(res.data)}`).then(re => {
      console.log(re);
    })
  });

  return (
    <div className="App">
      <div>hi</div>
    </div>
  );
}

export default App;
