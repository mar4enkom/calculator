import cors from "cors";
import express from "express";

export const basicMiddlewareList = [
    cors(),
    express.json()
];