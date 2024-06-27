import "./NavBar.css";
export function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="nav-main flex justify-between px-2 py-1 items-center h-16">
      <div className="text-white border rounded-full px-2 p-1 text-lg">
        DEVOTE
      </div>
      {children}
    </div>
  );
}
