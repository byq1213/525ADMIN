export const newHouseRules = {
  code: [{
      required: true,
      message: "请输入楼盘编号",
      trigger: "blur"
    },
    {
      min: 3,
      max: 15,
      message: "长度在 3 到 15 个字符",
      trigger: "blur"
    }
  ],
  name: [{
      required: true,
      message: "请输入楼盘名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 20,
      message: "长度在 3 到 20 个字符",
      trigger: "blur"
    }
  ],
  alias: [{
      required: true,
      message: "请输入别名/小区名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 15,
      message: "长度在 3 到 15 个字符",
      trigger: "blur"
    }
  ],
  rent: [{
      required: true,
      message: "楼盘参考价格",
      trigger: "blur"
    },
    {
      type: 'number',
      message: '必须为数字'
    }
  ],




  developers: [{
      required: true,
      message: "请输入开发商名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 15,
      message: "长度在 3 到 15 个字符",
      trigger: "blur"
    }
  ],
  tags: [{
    type: 'array',
    required: true,
    message: '请至少选择一个标签',
    trigger: 'change'
  }],

  license: [{
    min: 3,
    max: 15,
    message: "长度在 3 到 15 个字符",
    trigger: "blur"
  }],
  ageLimit: [{
    required: false,
    message: "年龄必须为数字值",
    trigger: "blur"
  }, {
    type: 'number',
    message: '年龄必须为数字值'
  }],
  proportion: [{
    required: false,
    message: "请输入建筑面积",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  coveringArea: [{
    required: false,
    message: "请输入建筑面积",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  plotRatio: [{
    required: false,
    message: "",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  greeningRate: [{
    required: false,
    message: "",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  park: [{
    required: false,
    message: "请输入楼盘规划停车位",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  property: [{
    required: true,
    message: '请输入物业公司',
    trigger: "blur"
  }, {
    min: 3,
    max: 15,
    message: "长度在 3 到 15 个字符",
    trigger: "blur"
  }],
};
// 户型填写验证
export const newHouseRulesItem = {
  nameitem: [{
      required: true,
      message: "请输入户型名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 8,
      message: "长度在 3 到 8 个字符",
      trigger: "blur"
    }
  ],
  proportion: [{
      required: true,
      message: "请输入户型面积",
      trigger: "blur"
    },
    {
      type: 'number',
      message: '面积必须为数字'
    }
  ],
  rent: [{
      required: true,
      message: "请输入户型约价",
      trigger: "blur"
    },
    {
      type: 'number',
      message: '必须为数字'
    }
  ],


}
export const house2Rules = {
  cell: [{
    min: 3,
    max: 15,
    message: "长度在 3 到 15 个字符",
    trigger: "blur"
  }],
  code: [{
      required: true,
      message: "请输入楼盘编号",
      trigger: "blur"
    },
    {
      min: 3,
      max: 15,
      message: "长度在 3 到 15 个字符",
      trigger: "blur"
    }
  ],
  name: [{
      required: true,
      message: "请输入楼盘名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 20,
      message: "长度在 3 到 20 个字符",
      trigger: "blur"
    }
  ],
  alias: [{
      required: true,
      message: "请输入别名/小区名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 15,
      message: "长度在 3 到 15 个字符",
      trigger: "blur"
    }
  ],
  rent: [{
      required: true,
      message: "楼盘参考价格",
      trigger: "blur"
    },
    {
      type: 'number',
      message: '必须为数字'
    }
  ],




  developers: [{
      required: true,
      message: "请输入开发商名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 15,
      message: "长度在 3 到 15 个字符",
      trigger: "blur"
    }
  ],
  tags: [{
    type: 'array',
    required: true,
    message: '请至少选择一个标签',
    trigger: 'change'
  }],

  license: [{
    min: 3,
    max: 15,
    message: "长度在 3 到 15 个字符",
    trigger: "blur"
  }],
  ageLimit: [{
    required: false,
    message: "年龄必须为数字值",
    trigger: "blur"
  }, {
    type: 'number',
    message: '年龄必须为数字值'
  }],
  proportion: [{
    required: false,
    message: "请输入建筑面积",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  coveringArea: [{
    required: false,
    message: "请输入建筑面积",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  plotRatio: [{
    required: false,
    message: "",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  greeningRate: [{
    required: false,
    message: "",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  park: [{
    required: false,
    message: "请输入楼盘规划停车位",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  property: [{
    required: true,
    message: '请输入物业公司',
    trigger: "blur"
  }, {
    min: 3,
    max: 15,
    message: "长度在 3 到 15 个字符",
    trigger: "blur"
  }],
}
export const house3Rules = {
  cell: [{
    min: 3,
    max: 15,
    message: "长度在 3 到 15 个字符",
    trigger: "blur"
  }],
  code: [{
      required: true,
      message: "请输入楼盘编号",
      trigger: "blur"
    },
    {
      min: 3,
      max: 15,
      message: "长度在 3 到 15 个字符",
      trigger: "blur"
    }
  ],
  name: [{
      required: true,
      message: "请输入楼盘名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 20,
      message: "长度在 3 到 20 个字符",
      trigger: "blur"
    }
  ],
  alias: [{
      required: true,
      message: "请输入别名/小区名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 15,
      message: "长度在 3 到 15 个字符",
      trigger: "blur"
    }
  ],
  rent: [{
      required: true,
      message: "楼盘参考价格",
      trigger: "blur"
    },
    {
      type: 'number',
      message: '必须为数字'
    }
  ],




  developers: [{
      required: true,
      message: "请输入开发商名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 15,
      message: "长度在 3 到 15 个字符",
      trigger: "blur"
    }
  ],
  tags: [{
    type: 'array',
    required: true,
    message: '请至少选择一个标签',
    trigger: 'change'
  }],

  license: [{
    min: 3,
    max: 15,
    message: "长度在 3 到 15 个字符",
    trigger: "blur"
  }],
  ageLimit: [{
    required: false,
    message: "年龄必须为数字值",
    trigger: "blur"
  }, {
    type: 'number',
    message: '年龄必须为数字值'
  }],
  proportion: [{
    required: false,
    message: "请输入建筑面积",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  coveringArea: [{
    required: false,
    message: "请输入建筑面积",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  plotRatio: [{
    required: false,
    message: "",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  greeningRate: [{
    required: false,
    message: "",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  park: [{
    required: false,
    message: "请输入楼盘规划停车位",
    trigger: "blur"
  }, {
    type: 'number',
    message: '必须为数字值'
  }],
  property: [{
    required: true,
    message: '请输入物业公司',
    trigger: "blur"
  }, {
    min: 3,
    max: 15,
    message: "长度在 3 到 15 个字符",
    trigger: "blur"
  }],
}