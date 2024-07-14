import { Server } from "socket.io";
import  Connection  from "./database/db.js";
import { getDocument , updateDocument } from "./controller/document-controller.js";


const PORT = 9000;

Connection();

const io = new Server(PORT, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET' , 'POST']
    }
});

io.on('connection', socket =>{ 

    //get the document with perticular id
    socket.on('get-document', async (documentId) =>{
        // catch the changes sent by quill
        const data = "";
        const document = await getDocument(documentId)
        //join to the document with specific id
        socket.join(documentId);
        socket.emit('load-document',document.data)
        socket.on('send-changes' , delta =>{
            // boadcast the changes to every user having the same document
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })
        socket.on("save-document", async data =>{
            await updateDocument(documentId, data)
        })
    })
})