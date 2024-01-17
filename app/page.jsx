import LoginForm from "../components/LoginForm";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute  top-0 left-0 w-full z-50 h-screen bg-black">
        <LoginForm />
      </div>

    </div>
  );
}
