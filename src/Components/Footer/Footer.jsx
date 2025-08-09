import React from "react";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <div className="bg-white m-0 p-0 border-none font-sevillana">
      <div className="bg-[#1B0C4D] -mt-1">
        <div className="w-11/12 mx-auto pt-10">
          <div className="flex justify-items-start items-center border-b-2 pb-5 border-[#646463] pt-3">
            <img src={Logo} alt="" className="w-12 h-12 brightness-0 invert" />
            <h1 className="text-xl text-white font-bold">AssignMint</h1>
          </div>

          <div className="flex justify-between w-8/12 mx-auto py-10 text-white">
            <div>
              <ul className="space-y-2">
                <li className="text-xl font-bold">About Us</li>
                <li>Our Mission</li>
                <li>How It Works</li>
                <li>Careers</li>
              </ul>
            </div>

            <div>
              <ul className="space-y-2">
                <li className="text-xl font-bold">Support</li>
                <li>FAQs & Help Center</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div>
              <ul className="space-y-2">
                <li className="text-xl font-bold">Explore</li>
                <li>Features</li>
                <li>Enterprise</li>
                <li>Marketing</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xl font-bold">Contact Us</p>
              <ul className="flex justify-between">
                <li className="text-2xl font-bold">
                  <FaFacebook />
                </li>
                <li className="text-2xl font-bold">
                  <FaSquareXTwitter />
                </li>
                <li className="text-2xl font-bold">
                  <FaInstagramSquare />
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-white pb-4">
            Copyright © 2025 ｜ AssignMint ｜ Terms of Service ｜ Privacy Policy
            ｜ Contact Us
          </p>
        </div>
      </div>
    </div>
  );
}
