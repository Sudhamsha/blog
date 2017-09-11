import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';

class HeaderBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  render() {
    return (
      <div>
        <AppBar
          title={
            <Link to="/" className="Main-Title">
              Sud Reddy
            </Link>
          }
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            this.props.isAuthenticated ? (
              <IconMenu
                iconButtonElement={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                {this.props.role === 'admin' ? (
                  <MenuItem
                    containerElement={<Link to="/add-blog" />}
                    primaryText="Add Blog"
                  />
                ) : (
                  ''
                )}
                <MenuItem onClick={this.props.logout} primaryText="Sign out" />
              </IconMenu>
            ) : (
              <Link to="/login">
                <FlatButton label="Login" className="Login-Button" />
              </Link>
            )
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          {this.props.role === 'admin' ? (
            <MenuItem
              containerElement={<Link to="/add-blog" />}
              primaryText="Add Blog"
              onClick={this.handleClose}
            />
          ) : (
            ''
          )}
          {this.props.isAuthenticated ? (
            <MenuItem onClick={this.props.logout} primaryText="Sign out" />
          ) : (
            <MenuItem
              containerElement={<Link to="/login" />}
              primaryText="Login"
              onClick={this.handleClose}
            />
          )}
        </Drawer>
      </div>
    );
  }
}

HeaderBlock.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  role: PropTypes.string,
};

HeaderBlock.defaultProps = {
    role: 'Guest'
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    role: state.user.role,
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  HeaderBlock,
);
