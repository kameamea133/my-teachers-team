import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  console.log("Home component rendering");
  
  return (
     <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Welcome to the homepage!</h1>
        <p>Only authenticated users can see this page.</p>
      </div>
    </ProtectedRoute>
  );
}
