import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const PasswordField = ({
  label,
  id,
  placeholder,
  errorField,
  errorMessage,
  ...props
}: {
  label: string;
  id: string;
  placeholder?: string;
  errorField?: boolean;
  errorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...props}
          className="border-messenger-grey focus-visible:ring-messenger-blue pr-10" // Add padding for icon
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-messenger-dark-grey"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {errorField && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default PasswordField;
