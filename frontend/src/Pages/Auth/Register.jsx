import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await register({
        username: values.name,
        password: values.password,
        email: values.email,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
    setSubmitting(false);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <section className="pl-[8rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem] w-[30rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          {({ isSubmitting }) => (
            <Form className="container w-[100%]">
              <div className="my-[1rem]">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="my-[1rem]">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="my-[1rem]">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="my-[1rem]">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-white"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
              {isSubmitting && <Loader />}
            </Form>
          )}
        </Formik>
        <div className="mt-4">
          <p className="text-white">
            Have An Account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="max-h-full w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>
  );
};

export default Register;
