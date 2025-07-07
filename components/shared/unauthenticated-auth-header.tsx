import { MessageCircle } from "lucide-react";
import { PageTransition } from "../ui/transitions";

const UnauthenticatedAuthHeader = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-messenger-blue flex items-center justify-center mb-4 shadow-lg">
              <MessageCircle className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-messenger-black">
              {title}
            </h1>
            <p className="text-messenger-dark-grey mt-2 text-center">
              {subtitle}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl">{children}</div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UnauthenticatedAuthHeader;
