import React from "react";
import {database} from "firebase";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

class App extends React.Component{
    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header />
                </div>
                <Order />
                <Inventory />
                <header/>
            </div>
        )
    }
}

export default App