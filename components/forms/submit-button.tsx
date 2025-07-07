import { Button } from "../ui/button";

const SubmitButton = ({
  isLoading,
  label,
  afterSubmit,
}: {
  isLoading: boolean;
  label: string;
  afterSubmit: string;
}) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full bg-messenger-blue hover:bg-messenger-light-blue"
    >
      {isLoading ? afterSubmit : label}
    </Button>
  );
};

export default SubmitButton;
