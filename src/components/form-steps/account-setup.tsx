import Input from "../form/input";

const AccountSetupForm = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Account Information
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Please fill in your account information below.
      </p>

      <div className="space-y-2">
        <Input name="userName" placeHolder="Username" />
        <Input name="password" placeHolder="Password" type="password" />
        <Input
          name="confirmPassword"
          placeHolder="Confirm Password"
          type="password"
        />
      </div>
    </div>
  );
};

export default AccountSetupForm;
