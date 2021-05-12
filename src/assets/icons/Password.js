import * as React from "react"
import Svg, { Circle, Defs, G, Path } from "react-native-svg"

function Password(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 85.15 100"
            width={props.width}
            height={props.height}
            fill={props.color}
            {...props}
        >
            <Defs></Defs>
            <G id="prefix__Capa_2" data-name="Capa 2">
                <G id="prefix__Capa_1-2" data-name="Capa 1">
                    <Circle className="prefix__cls-1" cx={42.57} cy={64.03} r={12.54} />
                    <Path
                        className="prefix__cls-1"
                        d="M75.25 28.71h-7.49a24 24 0 00.23-3.3 25.42 25.42 0 10-50.61 3.3H9.9a9.9 9.9 0 00-9.9 9.9V90.1a9.9 9.9 0 009.9 9.9h65.35a9.9 9.9 0 009.9-9.9V38.61a9.9 9.9 0 00-9.9-9.9zm-51.49-3.3a18.82 18.82 0 0137.63 0 17.92 17.92 0 01-.31 3.3h-37a18.84 18.84 0 01-.32-3.3zm54.79 59.16a9.9 9.9 0 01-9.9 9.9H16.5a9.9 9.9 0 01-9.9-9.9V44.14a9.9 9.9 0 019.9-9.9h52.15a9.9 9.9 0 019.9 9.9z"
                    />
                </G>
            </G>
        </Svg>
    )
}

export default Password
