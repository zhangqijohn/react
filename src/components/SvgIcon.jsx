import React from 'react';
import {ReactSVG} from 'react-svg';
const path = require('path')
const files = require.context('@/assets/svg', false, /\.svg$/)
const svgArr = {}
files.keys().forEach(key => {
    const name = path.basename(key, '.svg')
    svgArr[name] = files(key).default || files(key)
})


function SvgIcon(props) {
    const size = props.size ? props.size : 20
    const marginRight = props.mr ? props.mr : 8
    return (
        <>
            <ReactSVG
                src={svgArr[props.name]}
                beforeInjection={svg => {
                    svg.classList.add('svg-class-name')
                    svg.setAttribute('style', `width: ${size}px;height: ${size}px;margin-right:${marginRight}px;fill: currentColor;`)
                }}
                wrapper="span"
            />
        </>
    )
}

export default SvgIcon
