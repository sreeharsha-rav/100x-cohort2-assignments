import { useState } from "react";
import { Heart, Cake, Gift, PartyPopper, Sparkles } from "lucide-react";

const BirthdayWisher = () => {
  const [name, setName] = useState("");
  const [showCards, setShowCards] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setShowCards(true);
    }
  };

  const BirthdayCard = ({ theme, icon: Icon, message }) => (
    <div
      className={`p-6 rounded-lg shadow-lg max-w-sm w-full transition-all duration-500 transform hover:scale-105 ${theme}`}
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold mb-3 text-center">Happy Birthday!</h2>
      <p className="text-center mb-4">Dear {name},</p>
      <p className="text-center mb-4">{message}</p>
      <div className="flex justify-center gap-2">
        <PartyPopper className="w-5 h-5" />
        <Sparkles className="w-5 h-5" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        {!showCards ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
              Birthday Wish Generator
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter birthday person's name"
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-purple-600">
                Birthday Wishes for {name}
              </h2>
              <button
                onClick={() => {
                  setShowCards(false);
                  setName("");
                }}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                New Wish
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BirthdayCard
                theme="bg-pink-50 hover:bg-pink-100"
                icon={Heart}
                message={`Wishing you a day filled with joy, laughter, and beautiful moments. May this year bring you endless happiness and success!`}
              />
              <BirthdayCard
                theme="bg-purple-50 hover:bg-purple-100"
                icon={Cake}
                message={`May your special day be surrounded by the warmth of loved ones, sweet moments, and wonderful memories to cherish forever!`}
              />
              <BirthdayCard
                theme="bg-blue-50 hover:bg-blue-100"
                icon={Gift}
                message={`Here's to another amazing year of your life! May all your dreams come true and your path be filled with exciting adventures!`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayWisher;
