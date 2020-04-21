import React from 'react';
import {createFromIconfontCN} from '@ant-design/icons';
import SvgIcon from '@/components/SvgIcon';

const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1767867_fmk9m4zzof7.js', // 在 iconfont.cn 上生成的地址
    extraCommonProps: {fontSize: '40'}
});


function IconHandle(props) {
    return (
        <>
            <div>
                自定义ICON
                <p>方法1：使用 createFromIconfontCN 方法，开发者调用在 iconfont.cn 上自行管理的图标。</p>
                <MyIcon type="icon3_bianji" style={{background: 'red', fontSize: 40}}/>

                <p>方法2：通过配置 @svgr/webpack 来将 svg 图标作为 React 组件导入。</p>
                <p>使用require.context全部导入，在根据name传值即可</p>
                action:<SvgIcon name='action'></SvgIcon>
                app:<SvgIcon name='app'></SvgIcon>
                cdk:<SvgIcon name='cdk'></SvgIcon>
            </div>
        </>
    )
}

export default IconHandle
