import { Card } from '@/components/ui/Card';
import Layout from '@/components/Layout';
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import { redirect } from 'next/navigation';
//import { useAuth } from '../../context/auth';

const Dashboard = () => {
    
    // const { user } = useAuth();
    const { session, status } = useSession();
    
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error</p>;
    {!session ? redirect("/login") : console.log("logged in")
    }
    return (
        <Layout>
            <div className='flex m-4 p-5'>
            <h1>Dashboard</h1>
            <p>test user</p>
            <div className='flex flex-row'>
                Dashboard
                <Card/>
                <Card/>
            </div>
            <Card/>
            </div>
        </Layout>
    );
    }

 export default Dashboard;
