import { IoIosBook } from "react-icons/io";
import { MdHeadphones } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
const IntroSection = () => {
  return (
    <div className="flex  flex-col items-center justify-center h-screen text-center py-10 bg-primary-50">
      {/* Main Heading */}
      <h1 className="text-3xl max-sm:text-2xl font-bold text-gray-900 mb-4">
        How can you contribute <br /> to the Tibetan Community?
      </h1>

      {/* Subheading */}
      <p className="text-gray-600 text-lg max-sm:text-base max-w-xl mx-auto mb-8 max-sm:mb-6">
        The Collaborative Platform to Preserve and Promote the Tibetan Language
        Contribute by Image Translating, Reading, Listening, and Writing.
      </p>

      {/* Icons Section */}
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-secondary-600 flex items-center justify-center">
            <MdInsertPhoto className="text-white w-8 h-8" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-secondary-600 flex items-center justify-center">
            <MdHeadphones className="text-white w-8 h-8" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-secondary-600 flex items-center justify-center">
            <FaPenNib className="text-white w-8 h-8" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-secondary-600 flex items-center justify-center">
            <IoIosBook className="text-white w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
