import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  //   useEffect(() => {
  //     setUsername(userInfo.username);
  //     setEmail(userInfo.email);
  //   }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const initialValues = {
    name: userInfo.username,
    email: userInfo.email,
    password: "",
    confirmPassword: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      const res = await updateProfile({
        username: values.name,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile has been Updated");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4 mt-[4rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validate={validate}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-white mb-2">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    className="form-input p-4 rounded-sm w-full"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    value={userInfo.email}
                    placeholder="Enter Email"
                    className="form-input p-4 rounded-sm w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">New Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="form-input p-4 rounded-sm w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">Name</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-input p-4 rounded-sm w-full"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                  >
                    Update
                  </button>
                  <Link
                    to="/user-orders"
                    className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
                  >
                    My Orders
                  </Link>
                </div>
                {isSubmitting && <Loader />}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
