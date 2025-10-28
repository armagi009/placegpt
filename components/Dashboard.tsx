
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { generateMockStudents, generateMockJobs, generateMockOffers } from '../services/mockData';
import { Student, Job, Offer } from '../types';
import { BotIcon } from './icons/Icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const KPICard = ({ title, value, change, icon }: { title: string, value: string, change?: string, icon: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {change && <p className="text-xs text-green-400">{change}</p>}
        </CardContent>
    </Card>
);

const StudentTable = ({ students }: { students: Student[] }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                <tr>
                    <th scope="col" className="px-6 py-3">Student</th>
                    <th scope="col" className="px-6 py-3">Top Skills</th>
                    <th scope="col" className="px-6 py-3">Mock Interview</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                {students.slice(0, 5).map(student => (
                    <tr key={student.id} className="border-b border-gray-700 hover:bg-gray-800/60">
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap flex items-center">
                            <img className="w-8 h-8 rounded-full mr-3" src={student.photoUrl} alt={student.name} />
                            {student.name}
                        </th>
                        <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                                {student.skills.slice(0, 3).map(skill => (
                                    <span key={skill} className="px-2 py-1 text-xs font-medium bg-blue-900/50 text-blue-300 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </td>
                        <td className="px-6 py-4">{student.mockInterviewScore}%</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                student.status === 'Placed' ? 'bg-green-900/50 text-green-300' :
                                student.status === 'Interviewing' ? 'bg-yellow-900/50 text-yellow-300' :
                                'bg-gray-700 text-gray-300'
                            }`}>
                                {student.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const OfferFeed = ({ offers }: { offers: Offer[] }) => (
    <div className="space-y-4">
        {offers.slice(0, 4).sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()).map((offer, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 bg-gray-800/50 rounded-lg">
                <div className="flex-shrink-0 bg-green-500/20 text-green-400 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-white">{offer.studentName} received an offer!</p>
                    <p className="text-sm text-gray-400">{offer.company} - {offer.role} (₹{offer.ctc.toFixed(1)} LPA)</p>
                </div>
            </div>
        ))}
    </div>
);

const SkillGraph = ({ students }: { students: Student[] }) => {
    const skillCounts = useMemo(() => {
        const counts: { [key: string]: number } = {};
        students.forEach(student => {
            student.skills.forEach(skill => {
                counts[skill] = (counts[skill] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
    }, [students]);

    return (
         <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillCounts} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
                <Legend wrapperStyle={{fontSize: "12px"}}/>
                <Bar dataKey="value" fill="#3b82f6" name="Students" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

const PlacementStatusChart = ({ students }: { students: Student[] }) => {
    const statusCounts = useMemo(() => {
        const counts = { 'Placed': 0, 'Interviewing': 0, 'Not Placed': 0 };
        students.forEach(student => {
            counts[student.status]++;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [students]);

    const COLORS = {
        'Placed': '#4ade80',
        'Interviewing': '#facc15',
        'Not Placed': '#6b7280',
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={statusCounts}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {statusCounts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
                <Legend wrapperStyle={{fontSize: "14px"}}/>
            </PieChart>
        </ResponsiveContainer>
    );
};


export default function Dashboard() {
    const students = useMemo(() => generateMockStudents(150), []);
    const jobs = useMemo(() => generateMockJobs(50), []);
    const offers = useMemo(() => generateMockOffers(students), []);

    const totalStudents = students.length;
    const placedStudents = students.filter(s => s.status === 'Placed').length;
    const placementRate = ((placedStudents / totalStudents) * 100).toFixed(1);
    
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">TPO Dashboard</h1>
                <p className="text-gray-400">Welcome back, here's your placement overview.</p>
            </header>
            
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard title="Total Students" value={String(totalStudents)} icon={<BotIcon className="h-4 w-4 text-gray-400" />} />
                    <KPICard title="Placed Students" value={String(placedStudents)} icon={<BotIcon className="h-4 w-4 text-gray-400" />} />
                    <KPICard title="Placement Rate" value={`${placementRate}%`} change="+34% from last year" icon={<BotIcon className="h-4 w-4 text-gray-400" />} />
                    <KPICard title="Avg. CTC" value={`₹${(offers.reduce((acc, o) => acc + o.ctc, 0) / offers.length).toFixed(1)} LPA`} icon={<BotIcon className="h-4 w-4 text-gray-400" />} />
                </div>
                
                <Card className="md:col-span-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Cohort Skill Graph</CardTitle>
                        <CardDescription>Top 10 skills across all final year students.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SkillGraph students={students} />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Placement Status</CardTitle>
                        <CardDescription>Live overview of student placement stages.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PlacementStatusChart students={students} />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Student Overview</CardTitle>
                        <CardDescription>A snapshot of students in the placement process.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <StudentTable students={students} />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Live Offer Feed</CardTitle>
                        <CardDescription>Real-time updates as offers are captured via Agent-OCR.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <OfferFeed offers={offers} />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
