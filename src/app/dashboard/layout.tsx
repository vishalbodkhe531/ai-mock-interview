import React from "react";
import { Toaster } from "react-hot-toast";

function dashLeyout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default dashLeyout;
