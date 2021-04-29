import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "./sample-fish";
import Fish from "./Fish";
import base from "../base";
// import fishes from "./sample-fish";

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    };


    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeID);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }


    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeID, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
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

    updateFish = (key, updatedFish) =>{
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }
    deleteFish = (key) => {
        //Take a copy of state
        const fishes = {...this.state.fishes};
        //Update the state
        fishes[key] = null;
        //update state
        this.setState({fishes});
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
        this.setState({order});
    }

    removeFromOrder = (key) => {
        // Take a copy of the state
        const order = {...this.state.order};
        // remove item form order
        delete order[key];
        // Call setstate to update our state object
        this.setState({order});
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
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                />
            </div>
        )
    }
}

export default App

