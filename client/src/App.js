import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App relative overflow-x-hidden overflow-y-hidden bg-slate-50">
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="fixed top-0 -right-32 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="fixed -bottom-32 left-32 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="fixed -bottom-32 right-32 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <Home />
    </div>
  );
}

export default App;