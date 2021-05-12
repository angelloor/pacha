import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Mail(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 133.33 100"
            width={props.width}
            height={props.height}
            fill={props.color}
            {...props}
        >
            <G data-name="Capa 2">
                <Path
                    d="M120.83 0H12.5A12.5 12.5 0 000 12.5v75A12.5 12.5 0 0012.5 100h108.33a12.5 12.5 0 0012.5-12.5v-75A12.5 12.5 0 00120.83 0zm0 12.5v10.63c-5.84 4.75-15.14 12.14-35 27.73C81.4 54.31 72.71 62.6 66.67 62.5c-6.05.1-14.74-8.19-19.12-11.64-19.9-15.58-29.21-23-35-27.73V12.5zM12.5 87.5V39.17c6 4.75 14.43 11.42 27.33 21.52C45.52 65.17 55.49 75.06 66.67 75s21-9.69 26.83-14.31c12.9-10.1 21.37-16.77 27.33-21.52V87.5z"
                    fill="#fff"
                    data-name="Capa 1"
                />
            </G>
        </Svg>
    )
}

export default Mail
