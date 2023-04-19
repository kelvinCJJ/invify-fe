import { Card } from '@/components/ui/Card';
import Layout from '@/components/Layout';
import React from 'react';

const Dashboard = () => {
    console.log('dashboard');

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
