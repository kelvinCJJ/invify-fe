import Layout from '@/components/Layout';
import React from 'react';
//import { useAuth } from '../../context/auth';

const Dashboard = () => {
    // const { user } = useAuth();
    // const { data, loading, error } = useQuery(GET_USER, {
    //     variables: { id: user.id },
    // });
    
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error</p>;
    
    return (
        <Layout>
            <div className='flex'>
            <h1>Dashboard</h1>
            <p>test user</p>
            </div>
        </Layout>
    );
    }

 export default Dashboard;
