import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DashboardDetails from '@/components/dashboard/DashboardDetails';

describe('<DashboardDetails>', () => {
    it('should render', () => {
        render(<DashboardDetails />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
})