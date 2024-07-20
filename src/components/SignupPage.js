import React from 'react';
import userService from '../services/user';
import { useFormik } from 'formik';
import * as yup from 'yup';

const SignupPage = () => {
  // schema for yup validation
  const schema = yup.object().shape({
    usernameSignup: yup.string().required('Username is required'),
    passwordSignup: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('passwordSignup'), null], 'Passwords must match')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      usernameSignup: '',
      passwordSignup: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      console.log('im called');
      const { usernameSignup, passwordSignup } = values;
      const result = await userService.signUp({
        username: usernameSignup,
        password: passwordSignup,
      });
      console.log(result.data);
    },
    validationSchema: schema,
  });

  console.log(formik.values.passwordSignup, formik.values.confirmPassword);

  return (
    <>
      <button
        className="btn btn-ghost lg:btn-wide btn-sm lg:text-sm sm:text-xl uppercase"
        onClick={() => document.getElementById('my_modal_4').showModal()}
      >
        Sign Up
      </button>
      <dialog
        id="my_modal_4"
        className="modal modal-bottom sm:modal-middle glass"
      >
        <div className="modal-box w-full max-w-xs bg-white">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="usernameSignup"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="usernameSignup"
                name="usernameSignup"
                type="text"
                placeholder="Joseph"
                value={formik.values.usernameSignup}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} // Add this line
              />
              {formik.touched.usernameSignup && formik.errors.usernameSignup ? (
                <div className="mt-3 text-red-500 italic">
                  {formik.errors.usernameSignup}
                </div>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="passwordSignup"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="passwordSignup"
                type="password"
                placeholder="******************"
                value={formik.values.passwordSignup}
                onChange={formik.handleChange}
                name="passwordSignup"
                onBlur={formik.handleBlur} // Add this line
              />
              {formik.touched.passwordSignup && formik.errors.passwordSignup ? (
                <div className="mt-3 text-red-500 italic">
                  {formik.errors.passwordSignup}
                </div>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="******************"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                name="confirmPassword"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="mt-3 text-red-500 italic">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-secondary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SignupPage;
