import React, { Component } from "react";
import { Circle } from "react-google-maps";

class MapViewCircle extends Component {
	render() {
		return (
			<Circle
				center={{ lat: this.props.center ? this.props.center.latitude : 0, lng: this.props.center ? this.props.center.longitude : 0 }}
				radius={this.props.radius}
				visible={true}
				options={{
					fillColor: this.props.fillColor,
					strokeColor: this.props.strokeColor,
				}}
			/>
		);
	}
}

export default MapViewCircle;
