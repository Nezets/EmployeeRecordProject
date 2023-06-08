const Skill = require('./Skill');

const createSkill = async (body) => {
    const { name, description } = body;
    await Skill.create({ name, description });
}

const getSkill = async (id) => {
    const skill = await Skill.findOne({
        where: { id: id },
    });
    return skill;
}

const getSkills = async () => {
    const skillList = await Skill.findAll();
    return { skillList };
}

const updateSkill = async (id, name, description) => {
    await Skill.update(
        {
            name: name,
            description: description,
        },
        {
            where: {id: id},
        }
    )
}

const deleteSkill = async (id) => {
    await Skill.destroy({
        where: { id: id },
    });
}

module.exports = {
    createSkill,
    getSkill,
    getSkills,
    updateSkill,
    deleteSkill,
}