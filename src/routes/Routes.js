import config from '~/config';

// Layouts
import { LayoutContent, WithoutSearch } from "~/layouts"

// Pages
import { Admin } from '~/pages/Admin';
import { Dashboard } from '~/pages/Dashboard';
import { Freelancer } from '~/pages/Freelancer';
import { Job } from '~/pages/Job';
import { Transaction } from '~/pages/Transaction';
import { User } from '~/pages/User';
import { Report } from '~/pages/Report';


// Public routes
const privateRoutes = [
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.admin, component: Admin, layout: LayoutContent, title: "Admin"},
    { path: config.routes.user, component: User, layout: LayoutContent, title: "User" },
    { path: config.routes.freelancer, component: Freelancer, layout: LayoutContent, title: "Freelancer" },
    { path: config.routes.job, component: Job, layout: WithoutSearch, title: "Job"},
    { path: config.routes.transaction, component: Transaction, layout: WithoutSearch, title: "Transaction"},
    { path: config.routes.report, component: Report},
];

const publicRoutes = []

export { publicRoutes, privateRoutes };