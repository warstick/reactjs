import React from 'react';
import { Tabs } from 'antd';
import Block from './components/block';
import LatestBlock from './components/latestBlock';
import Transaction from './components/transaction';
import './App.css';

const { TabPane } = Tabs;

function App() {
  const callback = (key) => {
    console.log(key);
  };

  return (
    <div className="App">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Block" key="1" style={{ height: 600 }}>
          <Block />
        </TabPane>
        <TabPane tab="Transaction" key="2" style={{ height: 600 }}>
          <Transaction />
        </TabPane>
        <TabPane tab="Latest Block" key="3" style={{ height: 600 }}>
          <LatestBlock />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
