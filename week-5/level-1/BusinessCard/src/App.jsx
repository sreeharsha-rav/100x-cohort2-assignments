import "./App.css";
import { BusinessCard } from "./BusinessCard";

const sampleData = [
  {
    name: "Jane Doe",
    description:
      "Full Stack Developer with a passion for creating dynamic and responsive web applications.",
    interests: ["Coding", "Traveling", "Photography", "Reading"],
    linkedin: "https://www.linkedin.com/in/janedoe",
    twitter: "https://twitter.com/janedoe",
    otherSocialMedia: {
      label: "GitHub",
      url: "https://github.com/janedoe",
    },
  },
  {
    name: "John Smith",
    description:
      "Digital Marketing Specialist with expertise in SEO, SEM, and content marketing.",
    interests: ["Marketing", "Blogging", "Fitness", "Cooking"],
    linkedin: "https://www.linkedin.com/in/johnsmith",
    twitter: "https://twitter.com/johnsmith",
    otherSocialMedia: {
      label: "Instagram",
      url: "https://instagram.com/johnsmith",
    },
  },
  {
    name: "Emily Johnson",
    description:
      "Graphic Designer with a knack for creating visually appealing and user-friendly designs.",
    interests: ["Design", "Art", "Travel", "Music"],
    linkedin: "https://www.linkedin.com/in/emilyjohnson",
    twitter: "https://twitter.com/emilyjohnson",
    otherSocialMedia: {
      label: "Behance",
      url: "https://www.behance.net/emilyjohnson",
    },
  },
  {
    name: "Michael Brown",
    description:
      "Data Scientist with a passion for uncovering insights from complex datasets.",
    interests: ["Data Science", "Machine Learning", "Hiking", "Gaming"],
    linkedin: "https://www.linkedin.com/in/michaelbrown",
    twitter: "https://twitter.com/michaelbrown",
    otherSocialMedia: {
      label: "Kaggle",
      url: "https://www.kaggle.com/michaelbrown",
    },
  },
  {
    name: "Sarah Davis",
    description:
      "Product Manager with a focus on delivering high-quality software products.",
    interests: ["Product Management", "Agile", "Reading", "Yoga"],
    linkedin: "https://www.linkedin.com/in/sarahdavis",
    twitter: "https://twitter.com/sarahdavis",
    otherSocialMedia: {
      label: "Medium",
      url: "https://medium.com/@sarahdavis",
    },
  },
  {
    name: "David Wilson",
    description:
      "Cybersecurity Expert dedicated to protecting organizations from cyber threats.",
    interests: ["Cybersecurity", "Tech", "Running", "Chess"],
    linkedin: "https://www.linkedin.com/in/davidwilson",
    twitter: "https://twitter.com/davidwilson",
    otherSocialMedia: {
      label: "GitHub",
      url: "https://github.com/davidwilson",
    },
  },
];

const App = () => (
  <div className="app">
    {sampleData.map((data, index) => (
      <BusinessCard
        key={index}
        name={data.name}
        description={data.description}
        interests={data.interests}
        linkedin={data.linkedin}
        twitter={data.twitter}
      />
    ))}
  </div>
);

export default App;
