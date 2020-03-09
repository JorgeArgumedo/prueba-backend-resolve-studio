import { Router } from "express";
import Classifier from "../service/Classifier";
import TrainModel from "../models/TrainModel";
import { TYPE, parseError, resultFormat } from "../utils/resultFormat";

const router = Router();

// Esta ruta sera segura, por tanto tiene acceso a la informacion extraida del token
router.get("/profile", (req, res) => {
    try {
        const { user } = req;
        res.status(200).json(
            resultFormat(TYPE.success, "Datos del usuario obtenidos", {
                user,
            })
        );
    } catch (error) {
        res.status(500).json(parseError(error));
    }
});

/* Esta ruta sera segura, por tanto se validara el token, 
el cual se debe pasar para obtener todos los 
Train data cargados */
router.get("/trains", async (req, res) => {
    try {
        const train = await TrainModel.find({});
        res.status(200).json(
            resultFormat(TYPE.success, "Consulta exitosa", {
                train,
            })
        );
    } catch (error) {
        res.status(500).json(parseError(error));
    }
});

/* Se utiliza para realizar el proceso de clasificacion 
solicitado en la prueba, recibe inputTestData y devuelve el resultado
 */
router.post("/train", async (req, res) => {
    try {
        const { inputTestData } = req.body;
        if (inputTestData) {
            const testData = JSON.parse(inputTestData);
            const cL = new Classifier();
            const trainingData = await TrainModel.find({}, "-_id -date").lean(
                true
            );
            // Input training data
            cL.trainingData = trainingData;
            const test = testData.data[0]; // It's the first object of the service data
            const result = cL.classifier(test);
            // Output classified data
            res.status(200).json(
                resultFormat(TYPE.success, "Proceso exitoso", {
                    result,
                })
            );
        } else {
            res.status(400).json(
                resultFormat(TYPE.warning, "Se requiere inputTestData", {})
            );
        }
    } catch (error) {
        res.status(500).json(parseError(error));
    }
});

export default router;
