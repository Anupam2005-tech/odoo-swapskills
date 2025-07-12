import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../reuseableComponents/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../connection'; 

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response?.msg === 'User created successfully') {
        alert('Registration successful!');
        navigate('/login'); // Redirect after success
      } else {
        alert(response?.msg || 'Registration failed. Try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full overflow-x-hidden">
      {/* Left Side - Illustration */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-bold mb-2">Welcome!</h1>
          <p className="text-lg text-gray-300">Join us and start your journey</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 items-center justify-center bg-white dark:bg-black p-6">
        <div className="w-full max-w-md shadow-xl rounded-xl p-6 bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Create your account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Full Name"
              name="name"
              placeholder="John Doe"
              register={register}
              required={true}
              errors={errors}
            />
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
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-gray-950 text-white font-semibold rounded-md hover:bg-gray-800 transition-all cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;