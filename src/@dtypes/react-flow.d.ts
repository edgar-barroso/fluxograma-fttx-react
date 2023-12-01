import "reactflow";
import { Node, Edge } from "reactflow";
import z from "zod";

declare module "reactflow" {
    export interface NodeFttx extends Node {
        data:{
            olt?:{name:string,power:number}
            box?:{name:string}
            distance?:{value:number}
            dBm?:{value:number}
        }
    }

}
