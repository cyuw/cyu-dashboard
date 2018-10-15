import React from 'react';
import axios from 'axios';
import { branch, renderComponent, compose } from 'recompose';
import { PacmanLoader } from 'react-spinners';

const withSingleUrl = Component =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: [], isLoading: true, error: null };
    }

    componentDidMount() {
      const configOrUrl =
        typeof this.props.url === 'function'
          ? this.props.url(this.props)
          : this.props.url;

      axios(configOrUrl)
        .then(response =>
          this.setState({ data: response.data, isLoading: false })
        )
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

const withSpinner = branch(
  props => props.isLoading,
  renderComponent(PacmanLoader)
);

const withSingleUrlLoader = compose(
  withSingleUrl,
  withSpinner
);

export { withSingleUrlLoader, withSingleUrl };
