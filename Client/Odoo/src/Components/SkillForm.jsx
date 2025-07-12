import React from 'react';
import { useForm } from 'react-hook-form';

const SkillForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Offer & Seek Skills</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none"
            placeholder="Enter your full name"
          />
          {errors.name && <span className="text-red-400 text-sm">Name is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Skills Offered</label>
          <input
            type="text"
            {...register('skillsOffered')}
            className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none"
            placeholder="e.g. Web Development, Writing"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Skills Wanted</label>
          <input
            type="text"
            {...register('skillsWanted')}
            className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none"
            placeholder="e.g. Graphic Design, Marketing"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Availability</label>
          <input
            type="text"
            {...register('availability')}
            className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none"
            placeholder="e.g. Weekdays after 6PM"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Profile</label>
          <textarea
            {...register('profile')}
            className="w-full mt-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none"
            placeholder="Brief profile description"
            rows="4"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;