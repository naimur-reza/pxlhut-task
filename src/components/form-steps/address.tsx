import Input from "../form/input";

const AddressForm = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Personal Information
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Please fill in your personal information below.
      </p>

      <div className="space-y-2">
        <Input name="street" placeHolder="Street Address" />
        <Input name="city" placeHolder="City" />
        <Input name="zip" placeHolder="Zip Code" />
      </div>
    </div>
  );
};

export default AddressForm;
