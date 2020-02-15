import React from "react"
import Container from "react-bootstrap/Container";
import Tabs from 'react-bootstrap/Tabs'
import Tab from "react-bootstrap/Tab"

import Profile from "./Profile"

function Settings(props) {
    const tabs = [
        // {name: "API Keys", component: <ApiKeys/>},
        {name: "Profile", component: <Profile/>},
    ];

    const onTabChange = (route) => {
        // props.history.push(route)
    };

    return (
        <Container fluid>
            <Tabs justify variant="pills" defaultActiveKey={tabs[0].key} onSelect={onTabChange}
                  id="settingsTabs">
                {
                    tabs.map((tab, i) => (
                        <Tab eventKey={i} key={i} title={tab.name}>
                            {tab.component}
                        </Tab>
                    ))
                }
            </Tabs>
        </Container>
    );
}

export default Settings;
