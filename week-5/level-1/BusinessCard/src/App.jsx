import "./App.css";

const sampleData = [
  {
    name: "Lokeshwar",
    role: "A TA in the 100xDevs Cohort 2.0",
    interests: ["Ionic", "Open Source", "App Dev"],
    links: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Anika",
    role: "Frontend Developer",
    interests: ["React", "CSS", "UI Design"],
    links: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Rahul",
    role: "Backend Developer",
    interests: ["Node.js", "Databases", "API Development"],
    links: { linkedin: "#", twitter: "#" },
  },
];

const Card = ({ name, role, interests, links }) => (
  <div className="card">
    <h2>{name}</h2>
    <p>{role}</p>
    <h4>Interests</h4>
    <ul>
      {interests.map((interest, index) => (
        <li key={index}>{interest}</li>
      ))}
    </ul>
    <div className="buttons">
      <a href={links.linkedin} className="btn">
        LinkedIn
      </a>
      <a href={links.twitter} className="btn">
        Twitter
      </a>
    </div>
  </div>
);

const App = () => (
  <div className="app">
    {sampleData.map((data, index) => (
      <Card key={index} {...data} />
    ))}
  </div>
);

export default App;
