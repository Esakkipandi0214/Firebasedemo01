import { useState } from "react";
import { auth } from '@/firebase'; // Adjust this import based on your Firebase config path
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import Link from "next/link";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      console.log("Logged in. Token:", token);
      localStorage.setItem('Mhytoken', token);
      console.log("Login successfull..!")
      router.push("/GetFoodItems")
    } catch (error) {
      console.error(error);
      console.log('LOgin Failed..!')
      alert("Login Failed ...!")
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          <p className="text-gray-600">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded-md">
                {error}
              </div>
            )}
          </div>
          <div className="mt-6">
          <p><Link href="/ " className=" hover:text-blue-500 underline">Register</Link></p>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
