
import React from 'react';

const CallToAction = () => {
  return (
    <div className="section bg-chess-deep-red text-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Improve Your Chess Game?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of players who have enhanced their skills with our structured 
            training approach. Start your chess journey today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="chess-btn bg-white text-chess-deep-red hover:bg-chess-light-pink">
              Create Free Account
            </button>
            <button className="chess-btn-outline border-white text-white hover:bg-white hover:text-chess-deep-red">
              View All Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
