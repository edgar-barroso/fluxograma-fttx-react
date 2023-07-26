export const initialProject = {
    flow: {
      nodes: [
        {
          id: "10e023d4-e7ee-4cf6-9ba1-3371f80680c3",
          type: "olt",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 100,
                used: false
              },
              {
                port: 2,
                loss: 100,
                used: false
              },
              {
                port: 3,
                loss: 100,
                used: false
              },
              {
                port: 4,
                loss: 100,
                used: false
              },
              {
                port: 5,
                loss: 100,
                used: false
              },
              {
                port: 6,
                loss: 100,
                used: false
              },
              {
                port: 7,
                loss: 100,
                used: false
              },
              {
                port: 8,
                loss: 100,
                used: false
              },
              {
                port: 9,
                loss: 100,
                used: false
              },
              {
                port: 10,
                loss: 100,
                used: false
              },
              {
                port: 11,
                loss: 100,
                used: false
              },
              {
                port: 12,
                loss: 100,
                used: false
              },
              {
                port: 13,
                loss: 100,
                used: false
              },
              {
                port: 14,
                loss: 100,
                used: false
              },
              {
                port: 15,
                loss: 100,
                used: false
              },
              {
                port: 16,
                loss: 100,
                used: false
              },
              {
                port: 17,
                loss: 100,
                used: false
              },
              {
                port: 18,
                loss: 100,
                used: false
              },
              {
                port: 19,
                loss: 100,
                used: false
              },
              {
                port: 20,
                loss: 100,
                used: false
              }
            ],
            power: 5.38
          },
          data: {
            label: "OLT A"
          },
          position: {
            x: 644.8817308377003,
            y: 203.59015634846608
          },
          style: {}
        },
        {
          id: "74aad981-5ee0-4bba-8062-9cfb06ff9a01",
          type: "distance",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 100,
                used: false
              }
            ],
            meters: 1600
          },
          data: {
            label: "1600",
            visible: true
          },
          position: {
            x: 734.8535538771449,
            y: 315.87078457376697
          },
          style: {}
        },
        {
          id: "24548a90-3ffe-4b98-aefd-c63d686faee6",
          type: "box",
          fttx: {},
          data: {
            label: "CAIXA 1"
          },
          position: {
            x: 563.9934579278209,
            y: 417.9893302371638
          },
          style: {
            width: 300,
            height: 200,
            zIndex: -1
          }
        },
        {
          id: "2e44293b-5d82-4954-bcfe-e3bd61e559e3",
          type: "splitter",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 10,
                used: true
              },
              {
                port: 2,
                loss: 90,
                used: false
              }
            ],
            unbalanced: true
          },
          data: {
            label: "1x2 D",
            title: "10 | 90",
            fusion: true
          },
          position: {
            x: 678.2722148055916,
            y: 450.694268520283
          },
          style: {}
        },
        {
          id: "0b090298-95b7-4dfa-a748-a84ff6946690",
          type: "splitter",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 6.25,
                used: true
              },
              {
                port: 2,
                loss: 6.25,
                used: false
              },
              {
                port: 3,
                loss: 6.25,
                used: false
              },
              {
                port: 4,
                loss: 6.25,
                used: false
              },
              {
                port: 5,
                loss: 6.25,
                used: false
              },
              {
                port: 6,
                loss: 6.25,
                used: false
              },
              {
                port: 7,
                loss: 6.25,
                used: false
              },
              {
                port: 8,
                loss: 6.25,
                used: false
              },
              {
                port: 9,
                loss: 6.25,
                used: false
              },
              {
                port: 10,
                loss: 6.25,
                used: false
              },
              {
                port: 11,
                loss: 6.25,
                used: false
              },
              {
                port: 12,
                loss: 6.25,
                used: false
              },
              {
                port: 13,
                loss: 6.25,
                used: false
              },
              {
                port: 14,
                loss: 6.25,
                used: false
              },
              {
                port: 15,
                loss: 6.25,
                used: false
              },
              {
                port: 16,
                loss: 6.25,
                used: false
              }
            ],
            unbalanced: false
          },
          data: {
            label: "1x16 B",
            title: "6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25",
            fusion: false
          },
          position: {
            x: 588.4835583369614,
            y: 532.4440022935263
          },
          style: {}
        },
        {
          id: "4bf3938a-f3bb-4bab-b418-2777e617f473",
          type: "distance",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 100,
                used: true
              }
            ],
            meters: 50
          },
          data: {
            label: "50",
            visible: false
          },
          position: {
            x: 509.8599222268616,
            y: 583.541451266887
          },
          style: {}
        },
        {
          id: "e813a6b0-f1e8-4f4c-a775-bc2c02be0cb8",
          type: "dBmMeasure",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 100,
                used: false
              }
            ],
            meters: 0
          },
          data: {
            label: "-21.70dBm",
            client: true
          },
          position: {
            x: 422.18518816175566,
            y: 654.5566535492005
          },
          style: {
            width: 50,
            height: 25
          }
        },
        {
          id: "4d66747c-b2c2-4a32-af7a-54ac15e30db4",
          type: "box",
          fttx: {},
          data: {
            label: "CAIXA 2"
          },
          position: {
            x: 548.221480707766,
            y: 846.9130739959264
          },
          style: {
            width: 300,
            height: 200,
            zIndex: -1
          }
        },
        {
          id: "9c724625-d76d-48ce-85d8-f82c70a1f2f4",
          type: "splitter",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 10,
                used: true
              },
              {
                port: 2,
                loss: 90,
                used: false
              }
            ],
            unbalanced: true
          },
          data: {
            label: "1x2 D",
            title: "10 | 90",
            fusion: true
          },
          position: {
            x: 677.5987011849522,
            y: 877.9080380405123
          },
          style: {}
        },
        {
          id: "610789ce-c706-4493-be9d-a536fc0548b8",
          type: "distance",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 100,
                used: true
              }
            ],
            meters: 200
          },
          data: {
            label: "200",
            visible: true
          },
          position: {
            x: 699.8779578184975,
            y: 635.1572381345488
          },
          style: {}
        },
        {
          id: "61024647-7171-4537-b379-49f946bdccce",
          type: "splitter",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 6.25,
                used: true
              },
              {
                port: 2,
                loss: 6.25,
                used: false
              },
              {
                port: 3,
                loss: 6.25,
                used: false
              },
              {
                port: 4,
                loss: 6.25,
                used: false
              },
              {
                port: 5,
                loss: 6.25,
                used: false
              },
              {
                port: 6,
                loss: 6.25,
                used: false
              },
              {
                port: 7,
                loss: 6.25,
                used: false
              },
              {
                port: 8,
                loss: 6.25,
                used: false
              },
              {
                port: 9,
                loss: 6.25,
                used: false
              },
              {
                port: 10,
                loss: 6.25,
                used: false
              },
              {
                port: 11,
                loss: 6.25,
                used: false
              },
              {
                port: 12,
                loss: 6.25,
                used: false
              },
              {
                port: 13,
                loss: 6.25,
                used: false
              },
              {
                port: 14,
                loss: 6.25,
                used: false
              },
              {
                port: 15,
                loss: 6.25,
                used: false
              },
              {
                port: 16,
                loss: 6.25,
                used: false
              }
            ],
            unbalanced: false
          },
          data: {
            label: "1x16 B",
            title: "6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25 | 6.25",
            fusion: false
          },
          position: {
            x: 597.151936256829,
            y: 942.4330474099445
          },
          style: {}
        },
        {
          id: "1f788f95-2f81-4e76-a8b6-819dc8d5b840",
          type: "distance",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 100,
                used: true
              }
            ],
            meters: 50
          },
          data: {
            label: "50",
            visible: false
          },
          position: {
            x: 481.7874368273938,
            y: 998.7174854346536
          },
          style: {}
        },
        {
          id: "be590be5-7877-4325-ba63-d13de1210df2",
          type: "dBmMeasure",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 100,
                used: false
              }
            ],
            meters: 0
          },
          data: {
            label: "-22.67dBm",
            client: true
          },
          position: {
            x: 404.8314830153133,
            y: 1075.535014093949
          },
          style: {
            width: 50,
            height: 25
          }
        },
        {
          id: "388d321e-7da4-43e9-a827-b4816e78da34",
          type: "dBmMeasure",
          fttx: {
            ports: [
              {
                port: 1,
                loss: 100,
                used: true
              }
            ],
            meters: 0
          },
          data: {
            label: "3.25dBm",
            client: false
          },
          position: {
            x: 672.2076907395234,
            y: 760.8764613369697
          },
          style: {
            width: 50,
            height: 25
          }
        }
      ],
      edges: [
        {
          animated: true,
          id: "reactflow__edge-10e023d4-e7ee-4cf6-9ba1-3371f80680c3-74aad981-5ee0-4bba-8062-9cfb06ff9a01",
          label: "",
          port: 1,
          sourceHandle: null,
          source: "10e023d4-e7ee-4cf6-9ba1-3371f80680c3",
          target: "74aad981-5ee0-4bba-8062-9cfb06ff9a01",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-74aad981-5ee0-4bba-8062-9cfb06ff9a01-2e44293b-5d82-4954-bcfe-e3bd61e559e3",
          label: "",
          port: 1,
          sourceHandle: null,
          source: "74aad981-5ee0-4bba-8062-9cfb06ff9a01",
          target: "2e44293b-5d82-4954-bcfe-e3bd61e559e3",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-4bf3938a-f3bb-4bab-b418-2777e617f473-e813a6b0-f1e8-4f4c-a775-bc2c02be0cb8",
          label: "",
          port: 1,
          sourceHandle: null,
          source: "4bf3938a-f3bb-4bab-b418-2777e617f473",
          target: "e813a6b0-f1e8-4f4c-a775-bc2c02be0cb8",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-2e44293b-5d82-4954-bcfe-e3bd61e559e3-610789ce-c706-4493-be9d-a536fc0548b8",
          label: "90%",
          port: 2,
          sourceHandle: null,
          source: "2e44293b-5d82-4954-bcfe-e3bd61e559e3",
          target: "610789ce-c706-4493-be9d-a536fc0548b8",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-9c724625-d76d-48ce-85d8-f82c70a1f2f4-61024647-7171-4537-b379-49f946bdccce",
          label: "10%",
          port: 1,
          sourceHandle: null,
          source: "9c724625-d76d-48ce-85d8-f82c70a1f2f4",
          target: "61024647-7171-4537-b379-49f946bdccce",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-61024647-7171-4537-b379-49f946bdccce-1f788f95-2f81-4e76-a8b6-819dc8d5b840",
          label: "6.25%",
          port: 1,
          sourceHandle: null,
          source: "61024647-7171-4537-b379-49f946bdccce",
          target: "1f788f95-2f81-4e76-a8b6-819dc8d5b840",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-1f788f95-2f81-4e76-a8b6-819dc8d5b840-be590be5-7877-4325-ba63-d13de1210df2",
          label: "",
          port: 1,
          sourceHandle: null,
          source: "1f788f95-2f81-4e76-a8b6-819dc8d5b840",
          target: "be590be5-7877-4325-ba63-d13de1210df2",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-388d321e-7da4-43e9-a827-b4816e78da34-9c724625-d76d-48ce-85d8-f82c70a1f2f4",
          label: "",
          port: 1,
          sourceHandle: null,
          source: "388d321e-7da4-43e9-a827-b4816e78da34",
          target: "9c724625-d76d-48ce-85d8-f82c70a1f2f4",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-610789ce-c706-4493-be9d-a536fc0548b8-388d321e-7da4-43e9-a827-b4816e78da34",
          label: "",
          port: 1,
          sourceHandle: null,
          source: "610789ce-c706-4493-be9d-a536fc0548b8",
          target: "388d321e-7da4-43e9-a827-b4816e78da34",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-2e44293b-5d82-4954-bcfe-e3bd61e559e3-0b090298-95b7-4dfa-a748-a84ff6946690",
          label: "10%",
          port: 1,
          sourceHandle: null,
          source: "2e44293b-5d82-4954-bcfe-e3bd61e559e3",
          target: "0b090298-95b7-4dfa-a748-a84ff6946690",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        },
        {
          animated: true,
          id: "reactflow__edge-0b090298-95b7-4dfa-a748-a84ff6946690-4bf3938a-f3bb-4bab-b418-2777e617f473",
          label: "6.25%",
          port: 1,
          sourceHandle: null,
          source: "0b090298-95b7-4dfa-a748-a84ff6946690",
          target: "4bf3938a-f3bb-4bab-b418-2777e617f473",
          targetHandle: null,
          style: {
            stroke: "#00B37E"
          },
          type: "custom"
        }
      ]
    }
  }