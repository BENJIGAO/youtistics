import * as React from 'react'
import { Link } from 'react-router-dom'

interface IDashboardProps {
}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
