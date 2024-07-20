import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

const LoginPage = () => {
  // schema for yup validation
  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  return (
    <>
      <button
        className="btn btn-outline btn-warning btn-wide"
        onClick={() => document.getElementById('my_modal_5').showModal()}
      >
        Login
      </button>
      <dialog
        id="my_modal_5"
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
                htmlFor="username"
              >
                Username
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.username}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Abraham"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="mt-3 text-red-500 italic">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                password="password"
                type="password"
                placeholder="******************"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="mt-3 text-red-500 italic">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
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

export default LoginPage;
