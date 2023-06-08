const express = require('express');
const router = express.Router();
const SkillService = require('./SkillService'); 

router.post('/skills', async (req, res) => {
    await SkillService.createSkill(req.body)
        .then(() => {
            res.status(201).send({ message: "Successfully added skill. " })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to add skill." });
        });
})

router.get('/skills', async (req, res) => {
    const skillList = await SkillService.getSkills()
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to get skill list." });
        });

    res.status(200).send(skillList);
});

router.get('/skills/:id', async (req, res) => {
    const skill = await SkillService.getSkill(req.params.id)
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to get skill." });
        });

    res.status(200).send(skill);
});

router.put('/skills/:id', async (req, res) => {
    await SkillService.updateSkill(req.params.id, req.body.name, req.body.description)
        .then(() => {
            res.status(200).send({ message: "Successfully updated employee. " })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Error when accessing database. Failed to update employee." });
        });
});

router.delete('/skills/:id', async (req, res) => {
    await SkillService.deleteSkill(req.params.id)
        .then(() => {
            res.status(200).send({ message: "Successfully deleted skill." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error when accessing database. Failed to update employee." });

        });
});

module.exports = router;