const json = [
    {
        id: 0, // 序号
        name: 'cdKey', // 参数名称字段
        label: '激活码', // 控件描述字段
        templateType: 'input', // 控件类型，如：input,select,
        hightFilter: false, // 是否高级筛选
        params: {
            defaultValue: '1C4F6A6399', // 设置默认值
            options: null, // 多选参数，可以是自定义，或者API接口
            required: false, // 是否必填项
        },
    },
    {
        id: 2, // 序号
        name: 'selectMultiple', // 参数名称字段
        label: '游戏世界', // 控件描述字段
        templateType: 'selectMultiple', // 控件类型，如：input,select,
        hightFilter: false, // 是否高级筛选
        params: {
            defaultValue: null, // 设置默认值
            options: [
                {id: 2119003, label: '战狼突击-安卓马甲包-末世超变'},
                {id: 2119002, label: '战狼突击-安卓马甲包-病毒代号Z'},
                {id: 2119001, label: 'wow-安卓马甲包-战狼突击'},
            ],
            required: false,
        },
    },
    // {
    //     id: 3, // 序号
    //     name: 'createTime', // 参数名称字段
    //     label: '开始时间', // 控件描述字段
    //     templateType: 'datePicker', // 控件类型，如：input,select,
    //     hightFilter: false, // 是否高级筛选
    //     params: {
    //         defaultValue: null, // 设置默认值
    //         options: null,
    //         required: false,
    //     },
    // },
    // {
    //     id: 4, // 序号
    //     name: 'createTime', // 参数名称字段
    //     label: '结束时间', // 控件描述字段
    //     templateType: 'datePicker', // 控件类型，如：input,select,
    //     hightFilter: false, // 是否高级筛选
    //     params: {
    //         defaultValue: null, // 设置默认值
    //         options: null,
    //         required: false,
    //     },
    // },
    {
        id: 5, // 序号
        name: 'createTime', // 参数名称字段
        label: '激活时间', // 控件描述字段
        templateType: 'rangepicker', // 控件类型，如：input,select,
        hightFilter: false, // 是否高级筛选
        params: {
            defaultValue: null, // 设置默认值
            options: null,
            required: false,
        },
    },
]

export {json}
