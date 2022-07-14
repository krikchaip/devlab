import "~/styles/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "~/app";

const render = (id: string, elem: React.ReactNode) => {
  const mountElem = document.getElementById(id)!;
  return createRoot(mountElem).render(<StrictMode>{elem}</StrictMode>);
};

render("root", <App />);
