import * as mongodb from "mongodb";
//Task 1.2 continues...

//Task 1.2 ends.

export const collections: {
    contacts?: mongodb.Collection<Contacts>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("ContactsSession");
    await applySchemaValidation(db);

    const contactsCollection = db.collection<Contacts>("contacts");
    collections.contacts = contactsCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "Phone", "email"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                Phone: {
                    bsonType: "number",
                    description: "'Phone' is required and is a number",
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is a string",
                    pattern: "^.+@.+\..+$"
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "contacts",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("contacts", { validator: jsonSchema });
        }
    });
}
