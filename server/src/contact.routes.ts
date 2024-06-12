import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const contactRouter = express.Router();
contactRouter.use(express.json());

//Task 2.1 starts...Get all contacts
contactRouter.get("/", async (_req, res)=>{
    try{
        const contacts= await collections?.contacts?.find({}).toArray();
        res.status(200).send(contacts);
    } catch (error){
        res.status(500).send(error instanceof Error ? error.message: "Unknown error");
    }
})
//Task2.1 ends.

// Get a single contact by ID
contactRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const contact = await collections?.contacts?.findOne(query);

        if (contact) {
            res.status(200).send(contact);
        } else {
            res.status(404).send(`Failed to find a contact: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a contact: ID ${req?.params?.id}`);
    }
});

//Task 2.2 starts... Create a new contact
contactRouter.post("/", async (req, res) => {

    console.log("POST /contacts", req.body);

    try {

        const contact = req.body;

        const result = await collections?.contacts?.

        insertOne(contact);

        console.log("Insert result", result);

 

        if (result?.acknowledged) {

            res.status(201).send(`

            Created a new contact: ID ${result.insertedId}.`);

        } else {

            res.status(500).send(

                "Failed to create a new contact.");

        }

    } catch (error) {

        console.error(error);

        res.status(400).send(error instanceof Error ?

             error.message : "Unknown error");

    }

});
//Task 2.2 continues...

// Update a contact by ID
contactRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const contact = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.contacts?.updateOne(query, { $set: contact });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a contact: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a contact: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a contact: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

// Delete a contact by ID
contactRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.contacts?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a contact: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a contact: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a contact: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});
