import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"

function EyeSlash(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 154.08 100"
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
                        d="M77 12.5a37.53 37.53 0 0136.9 44.43l25.23 14.56a87.17 87.17 0 0012-17.69 8.41 8.41 0 000-7.6C137 18.64 109.05 0 77 0a81.14 81.14 0 00-41.71 11.54l17.33 10A37.37 37.37 0 0177 12.5z"
                    />
                    <Path
                        className="prefix__cls-1"
                        d="M64.47 28.39L102 50.08V50a25 25 0 00-37.53-21.61zm87 58.61L7.81 4A5.2 5.2 0 00.7 5.92 5.2 5.2 0 002.61 13l17.48 10.1A86.78 86.78 0 003 46.2a8.41 8.41 0 000 7.6C17.07 81.36 45 100 77 100a81.54 81.54 0 0048.47-16l20.76 12a5.21 5.21 0 105.2-9zm-74.39.54a37.51 37.51 0 01-34.81-51.6l11 6.34A25.25 25.25 0 0052 50a25 25 0 0043.61 16.73l11 6.35A37.43 37.43 0 0177.08 87.5z"
                    />
                </G>
            </G>
        </Svg>
    )
}

export default EyeSlash
