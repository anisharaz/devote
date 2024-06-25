import React from "react";

export function NavBar() {
  return (
    <div className="flex justify-between px-2 py-1 bg-green-400">
      <div>logo</div>
      <div className="flex gap-3">
        <div>Registrar</div>
        <div>22</div>
        <div>Github</div>
      </div>
    </div>
  );
}
