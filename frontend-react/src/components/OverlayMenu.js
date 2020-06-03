import React from "react";

import "./OverlayMenu.css"

export default class OverlayMenu extends React.Component {
    render() {
        return (
            <div className="overlay-menu-container">
                <div className="overlay-menu-background" onClick={this.props.closeOverlay}></div>
                <div className="overlay-menu-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}