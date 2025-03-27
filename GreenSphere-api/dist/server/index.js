"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const createPlant_1 = __importDefault(require("./routes/createPlant"));
const getPlants_1 = __importDefault(require("./routes/getPlants"));
const deletePlant_1 = __importDefault(require("./routes/deletePlant"));
const typeRoute_1 = __importDefault(require("./routes/typeRoute"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.get('/', (req, res) => {
//     res.json({ message: 'teste com typescript' })
// })
app.use('/plants', getPlants_1.default);
app.use('/register', createPlant_1.default);
app.use('/plants', deletePlant_1.default);
app.use('/types', typeRoute_1.default);
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
