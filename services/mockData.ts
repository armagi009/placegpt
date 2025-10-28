
import { Student, Job, Offer } from '../types';

const firstNames = ['Rohan', 'Priya', 'Amit', 'Sunita', 'Vikram', 'Anjali', 'Deepak', 'Neha'];
const lastNames = ['Sharma', 'Gupta', 'Patel', 'Kumar', 'Singh', 'Jain', 'Mehta', 'Verma'];
const skills = ['React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'TypeScript', 'Machine Learning'];
const projectNames = ['E-commerce Platform', 'Social Media Dashboard', 'Cloud File Storage', 'AI Chatbot', 'Inventory Management System'];
const companies = ['InnovateTech', 'DataSolutions', 'Cloudify', 'CodeGenius', 'NextGen Systems', 'QuantumLeap AI'];
const jobTitles = ['Software Engineer', 'Full-Stack Developer', 'Cloud Engineer', 'Data Scientist', 'Backend Developer'];
const sectors = ['FinTech', 'HealthTech', 'E-commerce', 'SaaS', 'AI/ML'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = <T,>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const generateMockStudents = (count: number): Student[] => {
    const students: Student[] = [];
    for (let i = 0; i < count; i++) {
        const name = `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
        students.push({
            id: `STU${1000 + i}`,
            name: name,
            skills: getRandomSubset(skills, Math.floor(Math.random() * 4) + 3),
            projects: [{
                name: getRandomElement(projectNames),
                description: 'A project demonstrating key technical skills and problem-solving abilities.'
            }],
            mockInterviewScore: Math.floor(Math.random() * 41) + 60,
            status: Math.random() > 0.8 ? 'Placed' : (Math.random() > 0.5 ? 'Interviewing' : 'Not Placed'),
            photoUrl: `https://i.pravatar.cc/150?u=${name.replace(' ', '')}`
        });
    }
    return students;
};

export const generateMockJobs = (count: number): Job[] => {
    const jobs: Job[] = [];
    for (let i = 0; i < count; i++) {
        jobs.push({
            id: `JOB${2000 + i}`,
            title: getRandomElement(jobTitles),
            company: getRandomElement(companies),
            requiredSkills: getRandomSubset(skills, Math.floor(Math.random() * 3) + 3),
            sector: getRandomElement(sectors)
        });
    }
    return jobs;
};

export const generateMockOffers = (students: Student[]): Offer[] => {
    return students
        .filter(s => s.status === 'Placed')
        .map(s => ({
            studentName: s.name,
            company: getRandomElement(companies),
            ctc: (Math.floor(Math.random() * 8) + 3.5),
            role: getRandomElement(jobTitles),
            timestamp: new Date(Date.now() - Math.random() * 1000 * 3600 * 24 * 30) // within last 30 days
        }));
};
