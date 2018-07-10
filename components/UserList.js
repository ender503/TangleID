import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Badge from '@material-ui/core/Badge';
import { blue as BlueColor } from '@material-ui/core/colors';

const styless = {
  root: {
    flexGrow: 1,
  },
  UserItem: {
    border: '1px solid #0288D1',
  },
  UserName_Normal: {
    fontSize: '0.875rem',
    color: '#2196F3',
  },
  UserName_Expanded: {
    color: '#212121',
    fontSize: '1.2em',
  },
};

const bgColor = {
  start: Object.keys(BlueColor).indexOf('200'),
  end: Object.keys(BlueColor).indexOf('0'),
};

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  static getFullName(claim) {
    return `${claim.firstName} ${claim.lastName}`;
  }

  listExpand = panelIndex => (event, expanded) => {
    const parent = event.currentTarget.parentElement;

    let colorLevel = (bgColor.start - bgColor.end) + 1;
    const colorIndex = Object.keys(BlueColor)[bgColor.start - (panelIndex % colorLevel)];

    parent.style['background-color'] = BlueColor[colorIndex];

    if (expanded) {
      parent.style.border = styless['UserItem'].border;
      parent.querySelector('p.UserName').style = styless['UserName_Expanded'];
    } else {
      parent.setAttribute('style', '');
      parent.querySelector('p.UserName').style = styless['UserName_Normal'];
    }
  }

  render() {
    const { users } = this.props;
    return (
      <div style={styless.root}>
        {
          users.map((user, i) => (
            <ExpansionPanel onChange={this.listExpand(i)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="UserName" style={styless.UserName_Normal}>
                  {this.constructor.getFullName(user.claim)}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <div style={styless.chatroom}>
                    <Link href={`/user?id=${user.id}`} as={`/users/${user.id}`}>
                      <IconButton tooltip="Profile">
                        <Badge
                          secondary
                          badgeStyle={{ top: 12, right: 12 }}
                        >
                          <AccountBoxIcon />
                        </Badge>
                      </IconButton>
                    </Link>
                  </div>

                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
    ))
    }
      </div>
    );
  }
}


UserList.propTypes = {
  users: PropTypes.array,
};

export default UserList;
