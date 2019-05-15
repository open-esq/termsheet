import React from "react";
import _ from "lodash";
import SeriesA from "./components/SeriesA";
import SeriesAA from "./components/SeriesAA";
import SAFE from "./components/SAFE";
import {
  Button,
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive,
  Header
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  state = { index: 0, visible: false };

  componentDidMount(){
    document.title = "Termsheets.me"
  }
  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  renderForm = () => {
    if (this.state.index == 0) return <SeriesA />;
    if (this.state.index == 1) return <SeriesAA />;
    if (this.state.index == 2) return <SAFE />;
  };

  render() {
    const { visible } = this.state;
    const leftItems = [
      {
        as: "a",
        content: "Series A",
        onClick: () => this.setState({ index: 0, visible: false }),
        key: "seriesA"
      },
      {
        as: "a",
        content: "Series AA",
        onClick: () => this.setState({ index: 1, visible: false }),
        key: "seriesAA"
      },
      {
        as: "a",
        content: "SAFE",
        onClick: () => this.setState({ index: 2, visible: false }),
        key: "safe"
      }
    ];

    return (
      <div>
        <div>
          <Responsive {...Responsive.onlyMobile}>
            <NavBarMobile
              leftItems={leftItems}
              onPusherClick={this.handlePusher}
              onToggle={this.handleToggle}
              visible={visible}
            >
              <NavBarChildren>
              {this.renderForm()}
              </NavBarChildren>
            </NavBarMobile>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <NavBarDesktop leftItems={leftItems} />
            <NavBarChildren>
            {this.renderForm()}
            </NavBarChildren>
          </Responsive>
        </div>
        
      </div>
    );
  }
}

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems=[],
  visible
}) => (
  <Sidebar.Pushable style={{transform:"none"}}>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={visible}
      style={{paddingTop: "25px"}}
      width='thin'
    >
    {_.map(leftItems, item => (
      <Menu.Item {...item} />
    ))}
      </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
      <Menu fixed="top" inverted>
               <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Item>
          <Image size="mini" src="https://i.ibb.co/cXMrJSb/Open-Esq-Clipped.png" />
          <Header as="h3" style={{ paddingLeft:"7px", margin:"0", color:"#e6e6e6"}}>Open Esquire</Header>
        </Menu.Item>
        <Menu.Menu position="right">
        
          {_.map(rightItems, item => <Menu.Item {...item} />)}
        </Menu.Menu>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ leftItems }) => (
  <Menu fixed="top" inverted>
    <Menu.Item>
      <Image size="mini" src="https://i.ibb.co/cXMrJSb/Open-Esq-Clipped.png" />
      <Header as="h3" style={{ paddingLeft:"7px", margin:"0", color:"#e6e6e6"}}>Open Esquire</Header>
    </Menu.Item>
    {_.map(leftItems, item => (
      <Menu.Item {...item} />
    ))}
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

export default App;
