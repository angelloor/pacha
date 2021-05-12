import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"

function User(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000zsvg"
            viewBox="0 0 100 103.59"
            width={props.width}
            height={props.height}
            fill={props.color}
            {...props}
        >
            <Defs></Defs>
            <G id="prefix__Capa_2" data-name="Capa 2">
                <G id="prefix__Capa_1-2" data-name="Capa 1">
                    <Path
                        className="prefix__cls-1"
                        d="M100 87c-.47-14.72-7.17-25.49-20.45-32.07-1.24-.61-2-.45-3.09.47-3.27 2.6-6.46 5.46-10.15 7.28C51.53 70 35.15 67 23.47 55.32c-.69-.69-1.21-1.17-2.36-.67A34.9 34.9 0 005.35 68.19C1 75.08-.14 82.69 0 90.69c.17 8.49 4.41 12.89 12.9 12.89h73.92a28.1 28.1 0 003.18-.16 10.68 10.68 0 009.69-9.1A39.08 39.08 0 00100 87z"
                    />
                    <Path
                        className="prefix__cls-1"
                        d="M51 59.15c15.58-.15 28.74-13.83 28.62-29.8a29.61 29.61 0 00-59.22.36C20.53 46.4 33.93 59.3 51 59.15z"
                    />
                </G>
            </G>
        </Svg>
    )
}

export default User
