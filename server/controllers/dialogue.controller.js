const Dialogue = require('../models/dialogue.model')


class DialogueController{
    static async getDialogue (req, res){
        try{
            const dialogue = await Dialogue.find({
                members: {
                    $in: [req.params.userId]
                }
            });
            res.status(200).json({message: 'Success',dialogue})
        }
        catch(err){
            console.log(err)
            res.status(400).json({message: "Ошибка"})
        }
    }
    static async create(req,res){
        try{
            const {author, partner} = req.body;
            //Check if dialogue is exist - return error message
            const dialogue = await Dialogue.findOne({
                members: { $in: [author, partner] }
            })
            if(dialogue){
                return res.status(400).json({message: 'dialogue is already exist!'})
            }

            //Create a new dialogue and save in DB
            const newDialogue = new Dialogue({
                members: [author, partner]
            })
            await newDialogue.save();
            res.status(200).json({message: 'dialogue was created!', dialogueInfo: newDialogue})
        }
        catch(err){
            console.log(err)
            res.status(400).json({message: "Ошибка"})
        }
    }
}

module.exports = DialogueController;