export type TeamMember = {
  id: string;
  full_name: string;
  role: string;
  bio: string;
  image_url: string;
  email?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  skills: string[];
  featured: boolean;
};

export const teamData: TeamMember[] = [
  {
    id: "kerollos-founder",
    full_name: "Kerollos Karam",
    role: "Founder",
    bio: "Building Percepta to bridge the gap between cutting-edge computer vision and practical workplace safety.",
    image_url: "/images/team_member.png",
    email: "kerokaram2022@gmail.com",
    linkedin_url: "https://www.linkedin.com/in/kerollos-karam",
    website_url: "https://kerollos.site/",
    skills: ["AI Strategy", "Computer Vision", "Product Vision"],
    featured: true,
  }
];
