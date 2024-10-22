import { IoIosBook } from "react-icons/io";
import { MdHeadphones } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4 space-y-4">
        <div className="font-bold text-lg">Dashboard</div>
        <button className="bg-gray-300 py-2 px-4 rounded-md">
          About KeyikLen
        </button>
        <nav className="space-y-6">
          <div className="flex items-center space-x-2">
            <i className="book-icon"></i>
            <span>Speak</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="headphone-icon"></i>
            <span>Listen</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="pen-icon"></i>
            <span>Write</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="image-icon"></i>
            <span>OCR</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-4 space-y-4">
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
          <div className="flex items-center space-x-4">
            <img
              src="/profile-image.png"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">Welcome Tenzin Sonam</h2>
              <p>@Snowloin123</p>
            </div>
          </div>
          <div className="text-lg">Your Total Contributions is 0 Sentences</div>
        </div>

        {/* Contribution and Rank Table */}
        <div className="flex space-x-8">
          <div className="w-1/2">
            <div className="bg-yellow-200 p-4 rounded-md">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Overall</span>
                <div className="space-x-2">
                  <button className="bg-yellow-300 py-1 px-3 rounded-md">
                    Speak
                  </button>
                  <button className="bg-yellow-300 py-1 px-3 rounded-md">
                    Listen
                  </button>
                  <button className="bg-yellow-300 py-1 px-3 rounded-md">
                    Write
                  </button>
                  <button className="bg-yellow-300 py-1 px-3 rounded-md">
                    OCR
                  </button>
                </div>
              </div>
              <table className="min-w-full bg-white mt-4">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Name</th>
                    <th className="py-2">Rank</th>
                    <th className="py-2">Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tenzin Monlam</td>
                    <td>1</td>
                    <td>20000</td>
                  </tr>
                  <tr>
                    <td>Tenzin Sonam</td>
                    <td>2</td>
                    <td>12000</td>
                  </tr>
                  <tr>
                    <td>Tenzin Dolma</td>
                    <td>3</td>
                    <td>10000</td>
                  </tr>
                  <tr>
                    <td>Tenzin Kalden</td>
                    <td>4</td>
                    <td>9000</td>
                  </tr>
                  <tr>
                    <td>Tenzin Chalung</td>
                    <td>5</td>
                    <td>4000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Contribution Widgets */}
          <div className="w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-semibold">Write</h3>
              <p className="text-2xl">0</p>
              <p>Total Contribution</p>
              <button className="bg-gray-200 mt-4 py-2 px-4 rounded-md">
                Start Contributing
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-semibold">OCR</h3>
              <p className="text-2xl">0</p>
              <p>Total Contribution</p>
              <button className="bg-gray-200 mt-4 py-2 px-4 rounded-md">
                Start Contributing
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-semibold">Speak</h3>
              <p className="text-2xl">0</p>
              <p>Total Contribution</p>
              <button className="bg-gray-200 mt-4 py-2 px-4 rounded-md">
                Start Contributing
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-semibold">Listen</h3>
              <p className="text-2xl">0</p>
              <p>Total Contribution</p>
              <button className="bg-gray-200 mt-4 py-2 px-4 rounded-md">
                Start Contributing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
