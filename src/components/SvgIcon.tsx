import './SvgIcon.scss'
import React from 'react';
import {ReactSVG} from 'react-svg'
import SvgDict from '@/icons'

export interface SVGIconProps {
    name: string;
    className?: string;
    fill?: string;
    size?: number;
    marginRight?: number;
}

function SvgIcon(props:SVGIconProps) {
    const path = (SvgDict as any)[props.name];
    const size = props.size ? props.size : '1em'
    const marginRight = props.marginRight ? props.marginRight : 8
    const fill = props.fill || 'currentColor';
    return (
        <ReactSVG
            wrapper="span"
            src={path}
            className={"svg-icon " + (props.className || '')}
            beforeInjection={svg => {
                svg.classList.add('svg-class-name')
                svg.setAttribute('style', `
                    width: ${size};
                    height: ${size};
                    margin-right:${marginRight}px;
                    fill:${fill};
                `)
            }}
        />
    )
}

export default SvgIcon
