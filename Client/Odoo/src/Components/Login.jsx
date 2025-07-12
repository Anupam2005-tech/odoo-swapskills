import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../reuseableComponents/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../connection'; 

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      if (response?.msg === 'Login successful') {
        // Optional: Save token or set state
        navigate('/dashboard'); // Redirect after successful login
      } else {
        alert(response?.msg || 'Login failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-x-hidden">
      {/* Left Side - Illustration */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-sky-600 text-white p-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold mt-4">Welcome Back!</h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-white dark:bg-black p-8">
        <div className="w-full max-w-md rounded-xl p-6 bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
            Log in to your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Email"
              name="email"
              placeholder="john@example.com"
              type="email"
              register={register}
              required={true}
              errors={errors}
            />
            <FormInput
              label="Password"
              name="password"
              placeholder="••••••••"
              type="password"
              register={register}
              required={true}
              errors={errors}
            />

            <div className="text-right text-sm mt-1 mb-4">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gray-950 text-white font-semibold rounded-md hover:bg-gray-800 transition-all cursor-pointer"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;