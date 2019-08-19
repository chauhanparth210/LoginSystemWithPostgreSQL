import React, { Component } from "react";
import "./App.css";
import Login from "./componants/Login";
import Welcome from "./componants/Welcome";
import { Grid } from "semantic-ui-react";
import { Link, Switch, Route } from "react-router-dom";
import PrivateRoute from "./util/PrivateRoute";
import { connect } from "react-redux";
import { logout } from "./store/actions/auth";

class App extends Component {
  onClick = () => {
    this.props.logout();
  };
  render() {
    return (
      <div style={{ marginTop: 30 }}>
        <Grid centered verticalAlign="middle" columns={3}>
          <Grid.Row>
            <Grid.Column>
              <div className="ui secondary menu">
                {!this.props.isAuthenticated ? (
                  <Link to="/login" className="item">
                    Login
                  </Link>
                ) : (
                  <Link to="/login" onClick={this.onClick} className="item">
                    Log Out
                  </Link>
                )}
                <Link to="/" className="item">
                  Home
                </Link>
              </div>
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Welcome} />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(App);
