const express = require('express');
const router = express.Router();
const pilotController = require('../controllers/pilotcontroller');

router.get('listar_pilotos/', pilotController.getPilots);
router.get('listar_piloto/:id', pilotController.getPilotById);
router.post('crear_piloto/', pilotController.createPilot);
router.put('actualizar_piloto/:id', pilotController.updatePilot);
router.delete('borrar_piloto/:id', pilotController.deletePilot);

module.exports = router;