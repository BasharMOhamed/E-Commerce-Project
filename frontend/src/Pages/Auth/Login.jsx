import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    setSubmitting(false);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div>
      <section className="pl-[8rem] flex flex">
        <div className="mr-[4rem] mt-[5rem] w-[30rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitHandler}
          >
            {({ isSubmitting }) => (
              <Form className="container w-[100%]">
                <div className="my-[1rem]">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 border rounded w-full"
                    placeholder="Enter email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
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
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>

                {isSubmitting && <Loader />}
              </Form>
            )}
          </Formik>

          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className=" hidden max-h-full max-w-[52rem] xl:block md:hidden  rounded-lg"
        />
      </section>
    </div>
  );
};

export default Login;
