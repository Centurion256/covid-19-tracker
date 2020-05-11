import React from 'react';
import { getCountryData } from "../../API/API.js";
import './Search.css'

export class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            error: false
        };
    }

    // componentDidMount() {
    //     this.setState({
    //         error: false
    //     });
    // }
    handleSubmit = async (event) => {

        if (event.type === "click" || event.key === "Enter") {

            const country = this.state.value;
            const result = await getCountryData(country);
            console.log(`country ${country} is null ${result == null}`)
            if (result != null) {
                if (this.state.error) {
                    this.setState({
                        error: false
                    });
                }
                this.props.onCountryChange(result); //perform a callback to the parent component
            } else {
                console.log("Error should occur");
                this.setState({
                    error: true
                });
                console.log(this.state.error);
            }
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.error !== nextState.error; //Otherwise, no need to re-render.
    }

    handleChange = (event) => {

        this.setState({
            value: event.target.value
        });

    }

    componentDidUpdate() {
        console.log("---Component has been updated.");
    }

    render() {
        return (
            <div className="input">

                <input className={this.state.error ? "error" : "hello"} type="text" placeholder={"Enter a country"} onKeyPress={this.handleSubmit} onChange={this.handleChange} />
                <button type="button" onClick={this.handleSubmit}>Find</button>

                {/* {this.state.error && <label className="invalid-input">Incorrect country name</label>} */}
            </div>
        );
    }
}