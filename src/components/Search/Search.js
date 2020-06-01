import React from "react";
import "./Search.css";
import { connect } from "react-redux";
import { updateInputField, updateError } from "../../actions";
import { selectClosestMatch } from "../../selectors/selectors.js";

class Search extends React.Component {
    //redux refator -- done

    shouldComponentUpdate(nextProps) {
        return this.props.error !== nextProps.error; //Otherwise, no need to re-render.
    }

    handleSubmit = async (event) => {
        if (event.type === "click" || event.key === "Enter") {
            //Much simpler now with redux!

            const countryQuery = this.props.getCountry(this.props.value);
            if (!countryQuery) {
                this.props.setError(true);
            } else {
                this.props.setError(false);
                this.props.history.push(this.props.location + this.props.value);
            }
        }
    };

    handleChange = (event) => {
        this.props.setValue(event.target.value);
    };

    componentDidUpdate() {
        console.log("---Component has been updated.---");
    }

    render() {
        return (
            <div className="input">
                <input
                    className={this.props.error ? "error" : "standard"}
                    type="text"
                    placeholder={"Enter a country"}
                    onKeyPress={this.handleSubmit}
                    onChange={this.handleChange}
                />
                <button type="button" onClick={this.handleSubmit}>
                    Find
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    location: state.nav.location,
    error: state.input.error,
    value: state.input.value,
    getCountry: (country) => selectClosestMatch(country, state.data),
});

const mapDispatchToProps = (dispatch) => ({
    setValue: (value) => dispatch(updateInputField(value)),
    setError: (value) => dispatch(updateError(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
