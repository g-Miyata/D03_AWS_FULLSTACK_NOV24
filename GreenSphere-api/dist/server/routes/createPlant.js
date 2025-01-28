"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const PlantSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    subtitle: zod_1.z.string().min(3),
    price: zod_1.z.number().positive(),
    isInSale: zod_1.z.boolean(),
    discountPercentage: zod_1.z.number().min(0).max(100),
    label: zod_1.z.enum(['Indoor', 'Outdoor']),
    features: zod_1.z.string().min(10),
    description: zod_1.z.string().min(10),
    imgUrl: zod_1.z.string(),
    type: zod_1.z.number(),
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = PlantSchema.parse(req.body);
        const plant = yield prisma.plant.create({
            data: Object.assign(Object.assign({}, validatedData), { type: {
                    connect: {
                        id: validatedData.type,
                    },
                } }),
        });
        res.status(201).json(plant);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: 'Dados inválidos', details: error.errors });
        }
        else {
            console.error('Erro ao criar a planta:', error); // Log do erro
            res.status(500).json({ error: 'Erro ao criar a planta' });
        }
    }
}));
exports.default = router;
