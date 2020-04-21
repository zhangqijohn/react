import React from 'react';
import {createFromIconfontCN} from '@ant-design/icons';
import {ReactSVG} from 'react-svg';
import SvgIcon from '@/components/SvgIcon';


import action from '@/assets/svg/app.svg'; // path to your '*.svg' file.


const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1767867_fmk9m4zzof7.js', // 在 iconfont.cn 上生成的地址
    extraCommonProps: {fontSize: '40'}
});

const ReactSVG1 = (props) => {
    const size = props.size ? props.size : 20
    return (<ReactSVG
        src={props.src}
        beforeInjection={svg => {
            svg.classList.add('svg-class-name')
            svg.setAttribute('style', `width: ${size}px;height: ${size}px`)
        }}
        wrapper="span"
    />)
}

function IconHandle(props) {
    return (
        <>
            <div>
                自定义ICON
                <p>方法1：使用 createFromIconfontCN 方法，开发者调用在 iconfont.cn 上自行管理的图标。</p>
                <MyIcon type="icon3_bianji" style={{background: 'red', fontSize: 40}}/>

                <p>方法2：通过配置 @svgr/webpack 来将 svg 图标作为 React 组件导入。</p>
                <p>但需要每个svg的src需要手动引入</p>
                action:<ReactSVG1 src={action}/>aa

                <p>方法3：通过配置 @svgr/webpack 来将 svg 图标作为 React 组件导入。</p>
                <p>使用require.context全部导入，在根据name传值即可</p>
                action:<SvgIcon name='action'></SvgIcon>
                app:<SvgIcon name='app'></SvgIcon>
                cdk:<SvgIcon name='cdk'></SvgIcon>
                <link rel="stylesheet" href=""/>
            </div>
        </>
    )
}

export default IconHandle
