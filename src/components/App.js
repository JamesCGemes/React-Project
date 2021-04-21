import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "./sample-fish";
import Fish from "./Fish";
import base from "../base";
import fishes from "./sample-fish";

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const {params} = this.props.match;
        this.ref = base.syncState(`${this.params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }


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

    addToOrder = (key) => {
        // Take a copy of the state
        const order = {...this.state.order};
        // Either add to the order or update the number in the order
        order[key] = order[key] + 1 || 1;
        // Call setstate to update our state object
        this.setState({order})
    }

    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        )
    }
}

export default App

