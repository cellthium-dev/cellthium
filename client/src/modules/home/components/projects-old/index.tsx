'use client';

import UnderlineLink from '@modules/common/components/interactive-link';

const Projects = () => {
  return (
    <div className="py-12">
      <div className="content-container py-12">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Embrace next-level EV charging with our innovative solutions. We are dedicated to enhancing scalability, competitiveness, and return on investment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Switch Platform</h3>
            <p className="text-gray-600 mb-4">
              The easiest way to manage your network. An advanced platform for managing EV charging, engineered to enhance the scalability, competitiveness and return on investment.
            </p>
            <UnderlineLink href="/switch-platform">Learn more</UnderlineLink>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Josev</h3>
            <p className="text-gray-600 mb-4">
              Taking your charger to the next level. A plug and play certified implementation of OCPP 2.0.1 and ISO 15118, giving your charging stations the latest and most advanced features.
            </p>
            <UnderlineLink href="/josev">Learn more</UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
