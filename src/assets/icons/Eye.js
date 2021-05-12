import * as React from "react"
import Svg, { Circle, Defs, G, Path } from "react-native-svg"

function Eye(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 150 100"
            width={props.width}
            height={props.height}
            fill={props.color}
            {...props}
        >
            <Defs></Defs>
            <G id="prefix__Capa_2" data-name="Capa 2">
                <G id="prefix__Capa_1-2" data-name="Capa 1">
                    <Circle className="prefix__cls-1" cx={75} cy={50} r={25} />
                    <Path
                        className="prefix__cls-1"
                        d="M149.09 46.2C135 18.64 107 0 75 0S15 18.66.91 46.2a8.41 8.41 0 000 7.6C15 81.36 43 100 75 100s60-18.66 74.09-46.2a8.41 8.41 0 000-7.6zM75 87.5A37.5 37.5 0 11112.5 50 37.5 37.5 0 0175 87.5z"
                    />
                </G>
            </G>
        </Svg>
    )
}

export default Eye
