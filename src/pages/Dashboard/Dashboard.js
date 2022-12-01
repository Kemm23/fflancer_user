import storage from "~/until/storage";

function Dashboard() {
    return ( <div style={{margin: 30}}>
        <h1>Welcome {storage.getUserName()}</h1>
        <div>Quick statistics of the whole system</div>
    </div> );
}

export default Dashboard;