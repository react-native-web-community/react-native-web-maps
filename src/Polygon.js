import React, { Component } from "react";
import { Polygon } from "react-google-maps";

class MapViewPolygon extends Component {
	render() {
		const {
			coordinates,
			fillColor,
			strokeColor,
			strokeWidth,
			...rest
		} = this.props;

		return (
			<Polygon
				path={coordinates.map((x) => ({
					lat: x.latitude,
					lng: x.longitude,
				}))}
				options={{
					strokeColor: strokeColor,
					strokeWeight: strokeWidth,
					fillColor: fillColor,
				}}
				{...rest}
			/>
		);
	}
}

export default MapViewPolygon;
