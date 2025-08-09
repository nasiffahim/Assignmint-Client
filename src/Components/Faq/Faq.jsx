import React from "react";
import FAQ from "../../../public/faq.json";
import Lottie from "lottie-react";

export default function Faq() {
  return (
    <div className="bg-white">
      <div className="w-10/12 mx-auto">
        <h1 className="text-center font-semibold font-sevillana text-4xl pb-10">
          Frequently Asked Questions
        </h1>
        <div className="flex justify-evenly items-center">
          <div className="w-1/2">
            <div className="collapse collapse-arrow border border-base-300 mb-4">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title font-semibold">
                What is AssignMint?
              </div>
              <div className="collapse-content text-sm">
                Assignmint is an educational platform that connects students
                with tutors for personalized learning experiences.
              </div>
            </div>
            <div className="collapse collapse-arrow border border-base-300 mb-4">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                How can I create an assignment?
              </div>
              <div className="collapse-content text-sm">
                To create an assignment, log in to your account, navigate to the
                user image, and click on "Create Assignment". Fill in the
                required details and submit.
              </div>
            </div>
            <div className="collapse collapse-arrow border border-base-300 mb-4">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                Can I review other people's assignments?
              </div>
              <div className="collapse-content text-sm">
                Yes!!! You can review assignments created by other users.
                Navigate to the "Assignments" section, select the assignment you
                want to review, and provide your feedback.
              </div>
            </div>
            <div className="collapse collapse-arrow border border-base-300 mb-4">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                How do I update my assignment answers?
              </div>
              <div className="collapse-content text-sm">
                Go to "Attempted Assignment" section where you can find all the
                assignments you have attempted. Click on the assignment you want
                to update and select "Edit". Make your changes and save.
              </div>
            </div>
            <div className="collapse collapse-arrow border border-base-300 mb-4">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                Can we talk online in AssignMint?
              </div>
              <div className="collapse-content text-sm">
                Unfortunately this feature is not available yet. But we are
                working on it and hopefully it will be available in near future.
              </div>
            </div>
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <Lottie
              animationData={FAQ}
              loop={true}
              style={{ width: 500, height: 500 }}
            ></Lottie>
          </div>
        </div>
      </div>
      <svg
        className="block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#1B0C4D"
          fill-opacity="1"
          d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,224C672,224,768,256,864,266.7C960,277,1056,267,1152,256C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
