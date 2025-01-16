// Assignment 4: Create a GitHub Info Component
// Using  https://api.github.com/users/${username} API render your GitHub information as your GitHub info Card.

import { useState, useEffect } from "react";

// type definitions
type GitHubProfile = {
  name: string;
  login: string;
  blog: string;
  location: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  followers_url: string;
  following: number;
  public_repos: number;
  repos_url: string;
};

// GitHubInfo Component
function GitHubInfo({ username }: { username: string }) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      });
  }, [username]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-lg">
      <img
        src={profile.avatar_url}
        alt="profile"
        className="w-32 h-32 rounded-full"
      />
      <h2 className="text-2xl font-semibold">{profile.name}</h2>
      <p className="text-gray-500">@{profile.login}</p>
      <p className="text-gray-500">{profile.bio}</p>
      <p className="text-gray-500">{profile.location}</p>
      <a
        href={profile.blog}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500"
      >
        {profile.blog}
      </a>
      <div className="flex gap-4">
        <a
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          GitHub
        </a>
        <a
          href={profile.repos_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          Repositories: {profile.public_repos}
        </a>
        <a
          href={profile.followers_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          Followers: {profile.followers}
        </a>
      </div>
    </div>
  );
}

export default GitHubInfo;
