import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import PageNotFound from './page-not-found';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: PageNotFound', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <PageNotFound />
      </Router>);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
