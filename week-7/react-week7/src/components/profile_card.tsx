// Assignment 1: Create a Profile Card

// type definitions
type Profile = {
  name: string;
  age: number;
  city: string;
  imageURL: string;
  followers: number;
  likes: number;
  photos: number;
};

// Sample Profile Data
const Rita: Profile = {
  name: "Rita",
  age: 32,
  city: "London",
  imageURL: "https://picsum.photos/id/646/200/200",
  followers: 80034,
  likes: 803196,
  photos: 1469,
};

// Image Component
const Image = ({ imageURL }: Profile) => {
  return (
    <img
      src={imageURL}
      className="w-32 h-32 rounded-full border-4 border-white"
      alt="profile picture"
    />
  );
};

// Title Component
const Title = ({ name, age, city }: Profile) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="flex gap-2 items-center justify-center">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">{age}</p>
      </div>
      <p className="text-sm text-gray-500">{city}</p>
    </div>
  );
};

// Stats Component
const Stats = ({ followers, likes, photos }: Profile) => {
  // Simplify numbers
  const viewFollowers =
    followers > 1000 ? `${(followers / 1000).toFixed(1)}k` : followers;
  const viewLikes = likes > 1000 ? `${(likes / 1000).toFixed(1)}k` : likes;
  const viewPhotos = photos > 1000 ? `${(photos / 1000).toFixed(1)}k` : photos;

  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg font-semibold">{viewFollowers}</p>
        <p className="text-sm text-gray-500">Followers</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg font-semibold">{viewLikes}</p>
        <p className="text-sm text-gray-500">Likes</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg font-semibold">{viewPhotos}</p>
        <p className="text-sm text-gray-500">Photos</p>
      </div>
    </div>
  );
};

// ProfileCard Component
function ProfileCard(profile: Profile) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4 bg-gray-100 rounded-lg shadow-lg">
      <Image {...profile} />
      <Title {...profile} />
      <Stats {...profile} />
    </div>
  );
}

// Main
export default function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <ProfileCard {...Rita} />
    </div>
  );
}
