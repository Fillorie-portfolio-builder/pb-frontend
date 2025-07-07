"use client";

import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { Star, LinkedinIcon, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { getBuilderById } from "../../api/builder";
import { getOwnerById } from "../../api/owner";
import { AuthContext } from "../../context/AuthContext";
import { createReview, getReviewsByBuilder } from "../../api/review";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function TalentProfile() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const builderId = params.id;
  const [builder, setBuilder] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [ownername, setOwnername] = useState("");

  useEffect(() => {
    const fetchBuilder = async () => {
      if (!builderId) return;
      // console.log("Fetching builder with ID:", builderId);
      try {
        const res = await getBuilderById(builderId);
        // console.log("Builder user data:", res.data);
        setBuilder(res.data);
      } catch (err) {
        console.error("Error fetching builder:", err);
      }
    };

    fetchBuilder();
  }, [builderId]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      // console.log("Fetching user with ID:", user);
      try {
        if (user.accountType === "builder") {
          const res = await getBuilderById(user.id);
          // console.log("Builder data (user):", res.data);
          setBuilder(res.data);
        } else if (user.accountType === "owner") {
          const res = await getOwnerById(user.id);
          // console.log("Owner data (user):", res.data);
          setOwner(res.data);
          setOwnername(res.data.firstName)
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [user]);

  const fetchReviews = async () => {
    if (!builderId) return;
    try {
      const res = await getReviewsByBuilder(builderId);
      setReviews(res.data);
      // console.log("Review Data", res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [builderId]);


  const handleReviewSubmit = async () => {
    try {
      if (!owner || !owner.id) {
        alert("You must be logged in to submit a review.");
        return;
      }
      if (!builderId) {
        alert("Builder ID is missing.");
        return;
      }
      if (rating === 0) {
        alert("Please select a rating (1-5 stars).");
        return;
      }
      if (!reviewText.trim()) {
        alert("Please write something in the review.");
        return;
      }

      const data = {
        builderId: builderId,
        ownerId: owner.id,
        ownername: ownername,
        reviewStars: rating,
        reviewText: reviewText,
      };

      // console.log("Submitting review with data:", data);
      const response = await createReview(data);
      // console.log("Review submission response:", response);
      alert("Review submitted successfully!");
      setIsOpenReview(false);
      setRating(0);
      setReviewText("");
      fetchReviews();
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Failed to submit review.");
    }
  };

  if (!builder) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  const totalReviews = reviews.length;
  const averageRating = reviews?.length ? parseFloat((reviews.reduce((sum, r) => sum + (Number(r.reviewStars) || 0), 0) / reviews.length).toFixed(1)) : 0.0;
  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          <div className="w-full md:w-48 flex flex-col items-center">
            <div className="w-32 h-32 bg-purple-100 rounded-full overflow-hidden mb-4">
              {builder.profileImage ? (
                <img
                  src={builder.profileImage}
                  alt={builder.firstName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl text-[#3C65F5] flex items-center justify-center h-full">
                  {builder.firstName?.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="text-xl font-semibold text-center mb-2">
              {builder.firstName} {builder.lastName}
            </h1>
            <p className="text-gray-600 mb-4">{builder.profession}</p>
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{isNaN(averageRating) ? "N/A" : averageRating}</span>
              <span className="text-gray-600 text-sm">({totalReviews} reviews)</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {builder.projectsCompleted || 0} Projects Completed
            </p>
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={() => setIsOpen(true)}>
                Contact
              </Button>
              {user?.accountType === "builder" && user?.id === builderId && (
                <Link href={`/portfolio-builder/sign-up/${builderId}`}>
                  <button className="bg-[#3C65F5] text-white text-sm px-5 py-2 mb-3 rounded hover:bg-[rgba(60,101,245,0.8)]  transition w-full">
                    Edit Profile
                  </button>
                </Link>
              )}
              {user?.accountType === "owner" && builder.projects.some(project => project.ownerId === owner.id && project.completionStatus === "confirmed_by_owner") && (
                <button
                  onClick={() => setIsOpenReview(true)}
                  className="bg-[#3C65F5] text-white text-sm px-5 py-2 mb-3 rounded hover:bg-[rgba(60,101,245,0.8)] transition w-full"
                >
                  Rate & Review
                </button>
              )}
              {builder.linkedin && (
                <a href={builder.linkedin} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="w-full">
                    <LinkedinIcon className="h-4 w-4 mr-2" />
                    LinkedIn Profile
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="flex-1">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-600">{builder.bio}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <p className="text-gray-600">{builder.skillSets?.join(", ")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Educational Background
              </h2>
              <p className="text-gray-600">{builder.educationalBackground}</p>
            </section>

            {/* <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Preferred Job Types</h2>
              <p className="text-gray-600">
                {builder.preferredJobTypes?.join(", ")}
              </p>
            </section> */}

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <p className="text-gray-600">
                {builder.availability ? "Available" : "Not Available"}
              </p>
            </section>
          </div>
        </div>

        {/* Portfolio Section (optional if included in API) */}
        <div className="flex justify-center mt-10">
          <div className="max-w-7xl w-full bg-white p-6 rounded-lg shadow">
            {builder.projects.length > 0 ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {builder.projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow"
                    >
                      <h3 className="text-lg font-semibold">
                        {project.projectName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {project.timeline || "⏳ Flexible Timeline"}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies?.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                        {project.description}
                      </p>

                      <p className="text-[#3C65F5] font-medium mt-2 text-sm">

                        {project.subcategory}
                      </p>
                      <Link href={`/project/${project.id}`} passHref>
                        <Button className="mt-4 w-full">View Project</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">No Projects</div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-4 ">
          <div className="max-w-4xl w-full bg-white p-6 rounded-lg mb-6 shadow">
            {reviews.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-center">Reviews And Ratings</h2>
                <ul className="space-y-4">
                  {reviews.map((review, index) => (
                    <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <div className="mb-1 font-medium ">
                        {review.ownername || "Unknown"}
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${review.reviewStars >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm">{review.reviewText}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center text-gray-500">No Reviews and Ratings</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal for Contact Info */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-700 mb-2">
          <strong>Phone:</strong> {builder.phone || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {builder.email || "N/A"}
        </p>
      </Modal>

      <Modal isOpen={isOpenReview} onClose={() => setIsOpenReview(false)} className="w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Rate & Review</h2>
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 cursor-pointer ${rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                onClick={() => {
                  setRating(star);
                  console.log("New rating:", star);
                }}
              />
            ))}
          </div>
          <input
            type="text"
            placeholder="Write a review..."
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            className="w-full px-5 py-3 rounded-lg text-white  font-semibold bg-[#3C65F5] hover:bg-[rgba(60,101,245,0.8)]"
            onClick={handleReviewSubmit}
          >
            Submit a review
          </button>
        </div>
      </Modal>
    </div>
  );
}

const portfolioItems = [
  {
    title: "E-commerce UX Redesign",
    description: "Led the redesign of the checkout process, resulting in a 15% increase in conversion rate.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Mobile App UI/UX",
    description: "Designed and prototyped a new feature for a fitness tracking app, improving user engagement by 25%.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Website Accessibility Audit",
    description:
      "Conducted a comprehensive accessibility audit and implemented improvements, achieving WCAG 2.1 AA compliance.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Healthcare Dashboard",
    description: "Created an intuitive dashboard for healthcare providers to monitor patient data.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Restaurant Ordering System",
    description: "Designed a user-friendly mobile ordering system for a chain of restaurants.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Travel App Redesign",
    description: "Improved the user experience of a travel booking app through comprehensive research and testing.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
]

