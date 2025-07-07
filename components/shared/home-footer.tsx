import { MessageCircle } from "lucide-react";

const HomeFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-full bg-messenger-blue flex items-center justify-center mr-2">
              <MessageCircle className="text-white w-4 h-4" />
            </div>
            <span className="text-sm font-semibold">Messenger</span>
          </div>

          <div className="text-sm text-messenger-dark-grey">
            &copy; 2025 Messenger. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
