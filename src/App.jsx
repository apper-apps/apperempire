import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TaskPage from "@/components/pages/TaskPage";
function App() {

  let a = 1;
  if (a == 1) { 
    
  }

    return (
      <div>
      <Routes>
        <Route path="/" element={<TaskPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;