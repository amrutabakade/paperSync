import Document from "../schema/documentSchema.js";
export const getDocument = async(id) =>
{
    if(id === null) return;

    // find document in mongo db
    const document = await Document.findById(id);

    if(document) return document;

    // if document does not exist then create one
    return await Document.create({_id: id, data: ""})

}

export const updateDocument = async(id, data) =>{
    return await Document.findByIdAndUpdate(id, {data})
}