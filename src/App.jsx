import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import EmailSend from "./pages/EmailSend";
import SendImmediately from "./pages/SendImmediately";
import SendAfterTime from "./pages/SendAfterTime";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/sendemail" element={<EmailSend />} />
          <Route path="/sendimmediately" element={<SendImmediately />} />
          <Route path="/aftertime" element={<SendAfterTime />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
