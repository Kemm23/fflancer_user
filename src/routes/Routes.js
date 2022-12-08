import config from '~/config';
// Layouts

// Pages
import { Home, Jobs, JobsFreelancer, Freelancers, DetailJob, RegisterFreelancer } from '~/pages';

// Public routes
const privateRoutes = [
    { path: config.routes.home, component: Home},
    { path: config.routes.jobs, component: Jobs},
    { path: config.routes.jobsFreelancer, component: JobsFreelancer},
    { path: config.routes.freelancers, component: Freelancers},
    { path: config.routes.job, component: DetailJob},
    {path: config.routes.registerFreelancer, component: RegisterFreelancer}
];

const publicRoutes = []

export { publicRoutes, privateRoutes };