import googleLogo from '../assets/asset 5.png'
import amazonLogo from '../assets/asset 6.png'
import figmaLogo from '../assets/asset 7.png'
import netflixLogo from '../assets/asset 8.png'
import metaLogo from '../assets/asset 9.png'
import printrestLogo from '../assets/asset 11.png'
import slackLogo from '../assets/asset 12.png'
import spotifyLogo from '../assets/asset 13.png'
import oracleLogo from '../assets/asset 14.png'
import microsoftLogo from '../assets/asset 10.png'
import walmartLogo from '../assets/asset 15.png'
import girlImg from '../assets/asset 26.png'
import resumeLogo from '../assets/asset 20.png'
import applyJobLogo from '../assets/asset 21.png'
import jobLogo from '../assets/asset 22.png'
import users1Img1 from "../assets/asset 1.png"
import users1Img2 from "../assets/asset 2.png"
import users1Img3 from "../assets/asset 3.png"
import logo from "../assets/logoIcon.svg"
import "../index.css"
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { Book, Laptop, Code, Briefcase, Users } from "lucide-react";

export const NAVIGATION_LOGO = {
    logo: (
        <>
            <div className='flex gap-2 cursor-pointer'> <img src={logo} alt="logo" />   <h1 className='text-4xl font-bold'>Job <span className='primary-color border bg-white px-3 rounded'>Khojo</span></h1></div>
        </>
    )
}


export const NAVIGATION_USER_LINKS = [
    { label: "Home", to: "/" },
    { label: "Jobs", to: "/jobs" },
    { label: "Browse ", to: "/browse" },
];

export const NAVIGATION_ADMIN_LINKS = [
    { label: "Companies", to: "/admin/companies" },
    { label: "Jobs", to: "/admin/jobs" },
];

export const HERO = {
    tittle: (
        <>
            <div> Find your <span className='primary-color'> dream <br /> job</span> with us</div>
        </>
    ),
    description: `Good life begins with a good company. Start explore thousands of jobs in one place.`
};


export const WORKINGPARTNERS = {
    tittle: (
        <>
            <div> Trusted By <span className='primary-color'> 1000+ </span>  Companies</div>
        </>
    ),
    CompaniesLogo: [
        { img: googleLogo, alt: "Google Logo" },
        { img: amazonLogo, alt: "Amazon Logo" },
        { img: figmaLogo, alt: "Figma Logo" },
        { img: netflixLogo, alt: "Netflix Logo" },
        { img: metaLogo, alt: "Meta Logo" },
        { img: printrestLogo, alt: "Pinterest Logo" },
        { img: slackLogo, alt: "Slack Logo" },
        { img: spotifyLogo, alt: "Spotify Logo" },
        { img: oracleLogo, alt: "Oracle Logo" },
        { img: microsoftLogo, alt: "Microsoft Logo" },
        { img: walmartLogo, alt: "Walmart Logo" }
    ]
}



export const HOWITWORKS = {
    tittle: (
        <>
            <div>How it <span className='primary-color'>Works</span></div>
        </>
    ),
    description: "Effortlessly navigate through the process and land your dream job.",
    image: { img: girlImg, alt: "img" },
    steps: [
        { img: resumeLogo, alt: "resumeIcon", heading: "Build Your Resume", explanation: "Create a standout resume with your skills." },
        { img: applyJobLogo, alt: "applyIcon", heading: "Apply for Job", explanation: "Find and apply for jobs that match your skills." },
        { img: jobLogo, alt: "jobIcon", heading: "Get Hired", explanation: "Connect with employers and start your new job." },
    ]
}




export const JOBCATEGORY = [
    {
        logo: <Book />,
        tittle: "Web Developer",
        description: "Build and maintain websites for clients",
        TotalNewJobs: "2k+ new job posted"
    },
    {
        logo: <Laptop />,
        tittle: "Software Engineer",
        description: "Develop software applications and solutions",
        TotalNewJobs: "1.5k+ new job posted"
    },
    {
        logo: <Code />,
        tittle: "Frontend Developer",
        description: "Create the user interface and experience for websites",
        TotalNewJobs: "3k+ new job posted"
    },
    {
        logo: <Briefcase />,
        tittle: "Project Manager",
        description: "Manage teams and ensure timely project delivery",
        TotalNewJobs: "1k+ new job posted"
    },
    {
        logo: <Users />,
        tittle: "HR Specialist",
        description: "Manage recruitment, employee relations, and policies",
        TotalNewJobs: "500+ new job posted"
    }
];


export const USERSREVIEWS = {
    tittle: (<><div>What <span className='primary-color'>User</span> says about us?</div></>),
    users: [
        {
            profile: users1Img1,
            name: "Jake Paul",
            stars: 4,
            review: "This job portal made job search easy and quick. Recommended to all job seekers!"
        },
        {
            profile: users1Img2,
            name: "Emily Johnson",
            stars: 4,
            review: "Fantastic platform! Got hired within a week. Very user-friendly and efficient."
        },
        {
            profile: users1Img1,
            name: "Michael Smith",
            stars: 3,
            review: "Decent experience, but could improve job recommendations based on my skills."
        },
        {
            profile: users1Img3,
            name: "Sophia Brown",
            stars: 5,
            review: "Loved the easy application process and resume builder feature. Highly recommended!"
        }]
}


export const CONTACT_DATA = {
    tittle: (<><div>Never Wants to Miss Any <br /> <span className='primary-color'>Job News? </span> </div></>),
    btn: "SignUp",
}

export const FOOTER_PERSONAL_DATA = {
    Details: {
        developerName: (<><span className='text-gray-500'>| Designed & Developed By <span className='font-bold primary-color'>Ashish Kumar</span></span></>),
        developerWebsite: "https://ashishkumar-y.vercel.app",
        CreatedYear: "2025"
    }
}

export const FOOTER_DATA = {
    description: "Job portal with user profiles, skill updates, certifications, work experience and admin job postings.",
    tabs: [
        {
            tittle: "Product",
            columns: [
                {
                    name: "Find job",
                    link: "",

                }, {
                    name: "Find Company",
                    link: "",
                }, {
                    name: "Find Employee",
                    link: "",
                }
            ]
        }, {
            tittle: "Company",
            columns: [
                {
                    name: "About us",
                    link: "",

                }, {
                    name: "Contact us",
                    link: "",
                }, {
                    name: "Private policy",
                    link: "",
                }, {
                    name: "Term & conditions",
                    link: "",
                }
            ]
        }, {
            tittle: "Support",
            columns: [
                {
                    name: "Help & support",
                    link: "",

                }, {
                    name: "Feedback",
                    link: "",
                }, {
                    name: "fAQs",
                    link: "",
                },
            ]
        },
    ]
}


export const SOCIAL_MEDIA = [
    {
        name: "Linkedin",
        logo: BsLinkedin,
        link: "https://linkedin.com/in/ashishkumar-y"
    },
    {
        name: "Instagram",
        logo: BsInstagram,
        link: "https://www.instagram.com/ashii_saharan/"
    },
    {
        name: "Twitter",
        logo: BsTwitter,
        link: "x"
    },
    {
        name: "Github",
        logo: BsGithub,
        link: "https://github.com/ashishkumar-y"
    },

];