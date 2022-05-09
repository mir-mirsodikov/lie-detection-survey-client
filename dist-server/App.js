"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class App {
    constructor(buildPath) {
        this.buildPath = buildPath;
        this.app = (0, express_1.default)();
    }
    setup() {
        this.setupMiddleware();
        this.serveClientFile();
        this.renderDefaultHtml();
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
    }
    serveClientFile() {
        this.app.use(express_1.default.static(this.buildPath));
    }
    renderDefaultHtml() {
        this.app.use('/', (req, res) => {
            res.status(200)
                .sendFile(path_1.default.join(this.buildPath, '/index.html'));
        });
    }
}
exports.default = App;
