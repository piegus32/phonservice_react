import { combineReducers } from "redux";
import { Product } from "./product";
import { Repair } from "./repair";
import { Client } from "./client";
import { Auth } from "./auth";

export const reducers = combineReducers({
    Product, Repair, Client, Auth
})