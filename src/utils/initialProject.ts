export default {
    nodes: [
      {
        id: "bb934edd-878b-48f5-9733-ef83726d3620",
        data: {
          olt: {
            name: "OLT A",
            power: 5.38
          }
        },
        type: "olt",
        position: {
          x: 937.5,
          y: 405
        },
        width: 215,
        height: 71,
        selected: false,
        positionAbsolute: {
          x: 937.5,
          y: 405
        },
        dragging: false
      },
      {
        id: "d4b92bb8-4c53-47bb-b295-1f6ec9087702",
        data: {
          splitter: {
            isConnector: false
          }
        },
        type: "splitterNode1x2D-10/90",
        position: {
          x: 301.47258812114524,
          y: 63.134879827353984
        },
        width: 120,
        height: 84,
        selected: false,
        positionAbsolute: {
          x: 974.2430921352159,
          y: 701.8747685395964
        },
        dragging: false,
        parentNode: "6ab9252e-8b62-48d3-89ad-48e49ed850ee",
        extent: "parent"
      },
      {
        id: "61b7fee1-5374-42a2-b3f8-78ec7155cb0e",
        data: {
          distance: {
            value: 1600
          }
        },
        type: "distance",
        position: {
          x: 983.2673472666345,
          y: 566.272248238841
        },
        width: 105,
        height: 50,
        selected: false,
        dragging: false,
        positionAbsolute: {
          x: 983.2673472666345,
          y: 566.272248238841
        }
      },
      {
        id: "6ab9252e-8b62-48d3-89ad-48e49ed850ee",
        data: {
          box: {
            name: ""
          }
        },
        type: "box",
        position: {
          x: 704.4616233484876,
          y: 701.6372963154429
        },
        style: {
          zIndex: -999
        },
        width: 624,
        height: 374,
        selected: false,
        positionAbsolute: {
          x: 704.4616233484876,
          y: 701.6372963154429
        },
        dragging: false
      },
      {
        id: "3f01eae2-8402-4210-a5a2-8a802cbe2084",
        data: {
          splitter: {
            isConnector: true
          }
        },
        type: "splitterNode1x16B",
        position: {
          x: 62.22517950718827,
          y: 226.42884894711779
        },
        width: 250,
        height: 84,
        selected: false,
        positionAbsolute: {
          x: 774.1868028556759,
          y: 919.3161452625607
        },
        dragging: false,
        parentNode: "6ab9252e-8b62-48d3-89ad-48e49ed850ee",
        extent: "parent"
      },
      {
        id: "4ef623af-5662-4526-bd50-5207c356118a",
        data: {
          dBm: {
            value: -21.18
          }
        },
        type: "dBmMeasure",
        position: {
          x: 531.341655066953,
          y: 1003.8664778448825
        },
        width: 99,
        height: 42,
        selected: false,
        positionAbsolute: {
          x: 531.341655066953,
          y: 1003.8664778448825
        },
        dragging: false
      },
      {
        id: "c5c84e9a-74ba-4f7a-b906-ec9fcfd71a20",
        data: {
          box: {
            name: ""
          }
        },
        type: "box",
        position: {
          x: 663.7838778765541,
          y: 1330.491132046533
        },
        style: {
          zIndex: -999
        },
        width: 624,
        height: 374,
        selected: false,
        positionAbsolute: {
          x: 663.7838778765541,
          y: 1330.491132046533
        },
        dragging: false
      },
      {
        id: "9ea279ef-4ac0-4bae-ae70-c9ac7a6e194d",
        data: {
          splitter: {
            isConnector: false
          }
        },
        type: "splitterNode1x2D-10/90",
        position: {
          x: 270,
          y: 72.50000000000045
        },
        width: 120,
        height: 84,
        selected: false,
        positionAbsolute: {
          x: 971.2838778765541,
          y: 1384.2411320465335
        },
        dragging: false,
        parentNode: "c5c84e9a-74ba-4f7a-b906-ec9fcfd71a20",
        extent: "parent"
      },
      {
        id: "92ce24e2-75f0-45d2-9de9-ee3a7b590f97",
        data: {
          distance: {
            value: 200
          }
        },
        type: "distance",
        position: {
          x: 1022.533877876554,
          y: 1134.2411320465335
        },
        width: 105,
        height: 50,
        selected: false,
        positionAbsolute: {
          x: 1022.533877876554,
          y: 1134.2411320465335
        },
        dragging: false
      },
      {
        id: "24074ec7-e9c3-4454-ba0f-f7b71d7d7952",
        data: {
          splitter: {
            isConnector: true
          }
        },
        type: "splitterNode1x16B",
        position: {
          x: 43.0910241104109,
          y: 225.10581789286653
        },
        width: 250,
        height: 84,
        selected: false,
        positionAbsolute: {
          x: 744.374901986965,
          y: 1536.8469499393996
        },
        dragging: false,
        parentNode: "c5c84e9a-74ba-4f7a-b906-ec9fcfd71a20",
        extent: "parent"
      },
      {
        id: "badc3005-e330-49cc-bc2d-68e86e0ac7f8",
        data: {
          dBm: {
            value: -22.15
          }
        },
        type: "dBmMeasure",
        position: {
          x: 533.9613770432497,
          y: 1734.1127897814226
        },
        width: 99,
        height: 42,
        selected: false,
        positionAbsolute: {
          x: 533.9613770432497,
          y: 1734.1127897814226
        },
        dragging: false
      }
    ],
    edges: [
      {
        animated: true,
        style: {
          stroke: "#00b37e",
          opacity: 1,
          strokeWidth: 2
        },
        type: "smoothstep",
        source: "bb934edd-878b-48f5-9733-ef83726d3620",
        sourceHandle: null,
        target: "61b7fee1-5374-42a2-b3f8-78ec7155cb0e",
        targetHandle: "61b7fee1-5374-42a2-b3f8-78ec7155cb0e_port-0",
        id: "reactflow__edge-bb934edd-878b-48f5-9733-ef83726d3620-61b7fee1-5374-42a2-b3f8-78ec7155cb0e61b7fee1-5374-42a2-b3f8-78ec7155cb0e_port-0"
      },
      {
        animated: true,
        style: {
          stroke: "#00b37e",
          opacity: 1,
          strokeWidth: 2
        },
        type: "smoothstep",
        source: "d4b92bb8-4c53-47bb-b295-1f6ec9087702",
        sourceHandle: "d4b92bb8-4c53-47bb-b295-1f6ec9087702_port-1",
        target: "3f01eae2-8402-4210-a5a2-8a802cbe2084",
        targetHandle: "3f01eae2-8402-4210-a5a2-8a802cbe2084_port-0",
        id: "reactflow__edge-d4b92bb8-4c53-47bb-b295-1f6ec9087702d4b92bb8-4c53-47bb-b295-1f6ec9087702_port-1-3f01eae2-8402-4210-a5a2-8a802cbe20843f01eae2-8402-4210-a5a2-8a802cbe2084_port-0"
      },
      {
        animated: true,
        style: {
          stroke: "#00b37e",
          opacity: 1,
          strokeWidth: 2
        },
        type: "smoothstep",
        source: "61b7fee1-5374-42a2-b3f8-78ec7155cb0e",
        sourceHandle: "61b7fee1-5374-42a2-b3f8-78ec7155cb0e_port-1",
        target: "d4b92bb8-4c53-47bb-b295-1f6ec9087702",
        targetHandle: "d4b92bb8-4c53-47bb-b295-1f6ec9087702_port-0",
        id: "reactflow__edge-61b7fee1-5374-42a2-b3f8-78ec7155cb0e61b7fee1-5374-42a2-b3f8-78ec7155cb0e_port-1-d4b92bb8-4c53-47bb-b295-1f6ec9087702d4b92bb8-4c53-47bb-b295-1f6ec9087702_port-0"
      },
      {
        animated: true,
        style: {
          stroke: "#00b37e",
          opacity: 1,
          strokeWidth: 2
        },
        type: "smoothstep",
        source: "3f01eae2-8402-4210-a5a2-8a802cbe2084",
        sourceHandle: "3f01eae2-8402-4210-a5a2-8a802cbe2084_port-1",
        target: "4ef623af-5662-4526-bd50-5207c356118a",
        targetHandle: "4ef623af-5662-4526-bd50-5207c356118a_port-0",
        id: "reactflow__edge-3f01eae2-8402-4210-a5a2-8a802cbe20843f01eae2-8402-4210-a5a2-8a802cbe2084_port-1-4ef623af-5662-4526-bd50-5207c356118a4ef623af-5662-4526-bd50-5207c356118a_port-0"
      },
      {
        animated: true,
        style: {
          stroke: "#00b37e",
          opacity: 1,
          strokeWidth: 2
        },
        type: "smoothstep",
        source: "d4b92bb8-4c53-47bb-b295-1f6ec9087702",
        sourceHandle: "d4b92bb8-4c53-47bb-b295-1f6ec9087702_port-2",
        target: "92ce24e2-75f0-45d2-9de9-ee3a7b590f97",
        targetHandle: "92ce24e2-75f0-45d2-9de9-ee3a7b590f97_port-0",
        id: "reactflow__edge-d4b92bb8-4c53-47bb-b295-1f6ec9087702d4b92bb8-4c53-47bb-b295-1f6ec9087702_port-2-92ce24e2-75f0-45d2-9de9-ee3a7b590f9792ce24e2-75f0-45d2-9de9-ee3a7b590f97_port-0"
      },
      {
        animated: true,
        style: {
          stroke: "#00b37e",
          opacity: 1,
          strokeWidth: 2
        },
        type: "smoothstep",
        source: "92ce24e2-75f0-45d2-9de9-ee3a7b590f97",
        sourceHandle: "92ce24e2-75f0-45d2-9de9-ee3a7b590f97_port-1",
        target: "9ea279ef-4ac0-4bae-ae70-c9ac7a6e194d",
        targetHandle: "9ea279ef-4ac0-4bae-ae70-c9ac7a6e194d_port-0",
        id: "reactflow__edge-92ce24e2-75f0-45d2-9de9-ee3a7b590f9792ce24e2-75f0-45d2-9de9-ee3a7b590f97_port-1-9ea279ef-4ac0-4bae-ae70-c9ac7a6e194d9ea279ef-4ac0-4bae-ae70-c9ac7a6e194d_port-0"
      },
      {
        animated: true,
        style: {
          stroke: "#00b37e",
          opacity: 1,
          strokeWidth: 2
        },
        type: "smoothstep",
        source: "9ea279ef-4ac0-4bae-ae70-c9ac7a6e194d",
        sourceHandle: "9ea279ef-4ac0-4bae-ae70-c9ac7a6e194d_port-1",
        target: "24074ec7-e9c3-4454-ba0f-f7b71d7d7952",
        targetHandle: "24074ec7-e9c3-4454-ba0f-f7b71d7d7952_port-0",
        id: "reactflow__edge-9ea279ef-4ac0-4bae-ae70-c9ac7a6e194d9ea279ef-4ac0-4bae-ae70-c9ac7a6e194d_port-1-24074ec7-e9c3-4454-ba0f-f7b71d7d795224074ec7-e9c3-4454-ba0f-f7b71d7d7952_port-0"
      },
      {
        animated: true,
        style: {
          stroke: "#00b37e",
          opacity: 1,
          strokeWidth: 2
        },
        type: "smoothstep",
        source: "24074ec7-e9c3-4454-ba0f-f7b71d7d7952",
        sourceHandle: "24074ec7-e9c3-4454-ba0f-f7b71d7d7952_port-1",
        target: "badc3005-e330-49cc-bc2d-68e86e0ac7f8",
        targetHandle: "badc3005-e330-49cc-bc2d-68e86e0ac7f8_port-0",
        id: "reactflow__edge-24074ec7-e9c3-4454-ba0f-f7b71d7d795224074ec7-e9c3-4454-ba0f-f7b71d7d7952_port-1-badc3005-e330-49cc-bc2d-68e86e0ac7f8badc3005-e330-49cc-bc2d-68e86e0ac7f8_port-0"
      }
    ]
  }