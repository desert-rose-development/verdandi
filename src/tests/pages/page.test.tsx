import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('@/components/dashboard/DashboardDetails', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div>Dashboard Details</div>),
  };
});

describe('<Home>', () => {
  it('should render', () => {
    render(<Home />);

    expect(screen.getByText('Dashboard Details')).toBeInTheDocument();
  });
});
