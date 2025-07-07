import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InputField = ({
  id,
  placeholder,
  type,
  errorField,
  errorMessage,
  label,
  ...props
}: {
  id: string;
  placeholder: string;
  type: string;
  errorField: boolean;
  errorMessage: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...props}
        className="border-messenger-grey focus-visible:ring-messenger-blue"
      />
      {errorField && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
