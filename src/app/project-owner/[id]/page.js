import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ProjectOwner() {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto mt-6 grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <p className="text-gray-500">Small Business Owner</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg">Bio</h3>
                <p className="text-gray-600 mt-1">
                  I'm a small business owner passionate about creating
                  innovative solutions for local businesses. With over 10 years
                  of experience in the bakery industry, I'm always looking for
                  fresh talent to help bring new ideas to life.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg">What We Offer</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Hands-on experience in various business aspects</li>
                  <li>Mentorship from experienced professionals</li>
                  <li>
                    Opportunity to build your portfolio with real-world projects
                  </li>
                  <li>Flexible working hours to fit your schedule</li>
                  <li>Potential for long-term collaboration or employment</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Projects Sponsored</h3>
              <div className="mt-4">
                <h4 className="font-medium">Bakery Website Redesign</h4>
                <p className="text-gray-500 text-sm">Completed - June 2023</p>
                <div className="flex gap-2 mt-1">
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Web Design
                  </span>
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    UI/UX
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Social Media Marketing Campaign</h4>
                <p className="text-gray-500 text-sm">Completed: August 2023</p>
                <div className="flex gap-2 mt-1">
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Digital Marketing
                  </span>
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Content Creation
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Inventory Management System</h4>
                <p className="text-gray-500 text-sm">Ongoing</p>
                <div className="flex gap-2 mt-1">
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Software Development
                  </span>
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Database Design
                  </span>
                </div>
              </div>

              <button className="mt-4 w-full bg-black text-white py-2 rounded">
                Contact for Opportunities
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
}
