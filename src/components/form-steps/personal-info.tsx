import Input from "../form/input";

const PersonalInfoForm = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Personal Information
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Please fill in your personal information below.
      </p>

      <div className="space-y-2">
        <Input name="name" placeHolder="Full Name" />
        <Input name="email" placeHolder="Email Address" />
        <Input name="phone" placeHolder="Phone Number" />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
