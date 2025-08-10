import React, { useMemo, useState, useRef, useEffect } from "react";
import Ban1 from "../../assets/ban1.png";
import Ban2 from "../../assets/ban2.png";
import Ban3 from "../../assets/ban3.png";
import Animation1 from "../../../public/animation1.json";
import Animation2 from "../../../public/animation2.json";
import Animation3 from "../../../public/animation3.json";
import Lottie from "lottie-react";

// Intersection Observer hook for performance
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
};

// Optimized Lottie component
const OptimizedLottie = React.memo(({ animationData, isVisible }) => {
  // Memoize Lottie options
  const lottieOptions = useMemo(() => ({
    animationData,
    loop: true,
    autoplay: isVisible, // Only play when visible
    renderer: 'svg',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: false, // Keep false for reliability
      hideOnTransparent: true
    }
  }), [animationData, isVisible]);

  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie 
        animationData={animationData}
        loop={true}
        autoPlay={isVisible}
        style={{ width: 300, height: 300 }}
        renderer="svg"
      />
    </div>
  );
});

// Optimized image component
const OptimizedImage = React.memo(({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && (
        <div className={`${className} bg-gray-200 animate-pulse absolute`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

export default function Features() {
  // Intersection observers for each animation
  const [animation1Ref, animation1Visible] = useIntersectionObserver();
  const [animation2Ref, animation2Visible] = useIntersectionObserver();
  const [animation3Ref, animation3Visible] = useIntersectionObserver();

  // Memoize feature data with direct animation imports
  const featuresData = useMemo(() => [
    {
      id: 'assignment-writing',
      image: Ban1,
      title: 'Assignment Writing',
      description: 'Get step-by-step support for writing clear, well-researched, and organized assignments. Whether it\'s essays, reports, or case studies, our expert guidance helps you understand the topic, plan your structure, and improve your writing skills to produce top-quality academic work.',
      animationData: Animation1, // Direct import
      animationRef: animation1Ref,
      animationVisible: animation1Visible,
      layout: 'left'
    },
    {
      id: 'assignment-review',
      image: Ban2,
      title: 'Assignment Review',
      description: 'Before submitting your assignment, let our experienced reviewers go through it in detail. We provide constructive feedback on structure, content, grammar, and formatting to ensure your work meets academic standards. Perfect your assignment and boost your chances of scoring higher.',
      animationData: Animation2, // Direct import
      animationRef: animation2Ref,
      animationVisible: animation2Visible,
      layout: 'right'
    },
    {
      id: 'group-session',
      image: Ban3,
      title: 'Online Group Session',
      description: 'Collaborate and learn in real-time with other students and instructors through live group sessions. These interactive sessions are designed to help you discuss course materials, ask questions, share ideas, and strengthen your understanding through teamwork and guided discussions.',
      animationData: Animation3, // Direct import
      animationRef: animation3Ref,
      animationVisible: animation3Visible,
      layout: 'left'
    }
  ], [animation1Visible, animation2Visible, animation3Visible]);

  // Memoize header content
  const headerContent = useMemo(() => (
    <>
      <h1 className="text-3xl md:text-5xl font-extrabold font-sevillana pt-10 pb-5 text-center">
        Assign<span className="text-yellow-300">Mint</span>'s Features
      </h1>
      <p className="text-base md:text-lg text-gray-400 font-sevillana pb-10 text-center px-4">
        Our goal is to help student's around the world in their studies and ease their difficulties by helping in their assignment
      </p>
    </>
  ), []);

  return (
    <div className="bg-white">
      {headerContent}
      <div className="w-11/12 lg:w-8/12 mx-auto">
        <div className="grid grid-cols-1">
          {featuresData.map((feature, index) => {
            const isLeftLayout = feature.layout === 'left';
            const borderClass = index < featuresData.length - 1 ? 'border-b-2 border-gray-200' : '';
            
            return (
              <div key={feature.id} className={`flex flex-col lg:flex-row justify-between items-center ${borderClass} py-10`}>
                {/* Animation Section */}
                <div 
                  ref={feature.animationRef}
                  className={`w-full lg:w-1/2 flex justify-center items-center p-4 lg:p-0 ${
                    isLeftLayout ? 'lg:border-r-2 lg:border-gray-200 lg:order-1' : 'lg:border-l-2 lg:border-gray-200 lg:order-2'
                  }`}
                >
                  <OptimizedLottie 
                    animationData={feature.animationData}
                    isVisible={feature.animationVisible}
                  />
                </div>

                {/* Content Section */}
                <div className={`w-full lg:w-1/2 p-4 lg:p-10 ${isLeftLayout ? 'lg:order-2' : 'lg:order-1'}`}>
                  <OptimizedImage 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-12 h-12 lg:w-14 lg:h-14" 
                  />
                  <h2 className="text-lg lg:text-xl font-bold font-sevillana mt-4 lg:mt-6">
                    {feature.title}
                  </h2>
                  <p className="text-sm mt-3 lg:mt-4 font-lato text-justify leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}