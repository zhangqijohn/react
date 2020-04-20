import './SvgIcon.scss'
import React from 'react';
import { ReactSVG } from 'react-svg'
import SvgDict from '@/icons'

export interface SVGIconProps {
  name: string;
  className?: string;
  fill?: string;
}

export default function SVGIcon(props: SVGIconProps) {
  const path = (SvgDict as any)[props.name];
  const width = '1em', height = '1em';
  const fill = props.fill || 'black';
  return <ReactSVG wrapper="div" src={path} style={{ width, height }} className={"svg-icon " + (props.className || '')} beforeInjection={svg => {
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('style', `fill: ${fill}`)
  }}></ReactSVG>
}