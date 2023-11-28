import "reactflow";
import { Node, Edge } from "reactflow";
import z from "zod";

declare module "reactflow" {
    export interface NodeFttx extends Node {
    }

}