import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Info(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 60"
            width={props.width}
            height={props.height}
            fill={props.color}
            {...props}
        >
            <G data-name="Capa 2">
                <Path
                    d="M30 0a30 30 0 1030 30A30 30 0 0030 0zm0 11.24a5.24 5.24 0 11-5.24 5.24A5.25 5.25 0 0130 11.24zM38.45 48a.81.81 0 01-.81.81H22.36a.81.81 0 01-.81-.81v-.41a.81.81 0 01.81-.81h2.91V27.13h-2.91a.81.81 0 01-.81-.81v-.41a.81.81 0 01.81-.81h12a1.39 1.39 0 011.39 1.39v20.24h1.89a.81.81 0 01.81.81z"
                    fill="#fff"
                    data-name="Capa 1"
                />
            </G>
        </Svg>
    )
}

export default Info
