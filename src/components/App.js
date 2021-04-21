import React from "react";
import {database} from "firebase";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "./sample-fish";
import Fish from "./Fish";

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    };
    addFish = fish => {
        //This makes a copy of whats in state.
        const fishes = {...this.state.fishes};
        //adds timestamp to fish as an id and adds the new fish to the fishes variable.
        fishes[`fish${Date.now()}`] = fish;

        this.setState({
            fishes: fishes
        });

    };
    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    };
    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">

                    </ul>
                </div>
                <Order />
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        )
    }
}

export default App