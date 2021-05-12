import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"

function PasswordVerify(props) {
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
                    <Path
                        className="prefix__cls-1"
                        d="M75.25 28.71h-7.49a24 24 0 00.23-3.3 25.42 25.42 0 10-50.61 3.3H9.9a9.9 9.9 0 00-9.9 9.9V90.1a9.9 9.9 0 009.9 9.9h65.35a9.9 9.9 0 009.9-9.9V38.61a9.9 9.9 0 00-9.9-9.9zM42.57 6.6a18.82 18.82 0 0118.82 18.81 17.92 17.92 0 01-.31 3.3h-37A18.77 18.77 0 0142.57 6.6zm36 78a9.9 9.9 0 01-9.9 9.9H16.5a9.9 9.9 0 01-9.9-9.9V44.14a9.9 9.9 0 019.9-9.9h52.15a9.9 9.9 0 019.9 9.9z"
                    />
                    <Path
                        className="prefix__cls-1"
                        d="M42.57 52.05a12.5 12.5 0 1012.51 12.5 12.5 12.5 0 00-12.51-12.5zm7.83 9.85l-9.27 9.27a.8.8 0 01-1.14 0l-5.24-5.24a.8.8 0 010-1.14l1.14-1.14a.8.8 0 011.14 0l3.53 3.53 7.56-7.56a.8.8 0 011.14 0l1.14 1.14a.8.8 0 010 1.14z"
                    />
                </G>
            </G>
        </Svg>
    )
}

export default PasswordVerify
