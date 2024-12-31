const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the .proto file
const PROTO_PATH = "./todo.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const todoProto = grpc.loadPackageDefinition(packageDefinition).todo;

// Create a client instance
const client = new todoProto.TodoService(
  "localhost:5000",

  grpc.credentials.createInsecure()
);

// Create a new To-Do
client.CreateTodo({ title: "Learn gRPC", description: "Build a To-Do app with gRPC" }, (err, response) => {

  if (err) {
    console.error("Error creating To-Do:", err);
    return;

  }
  console.log("Created To-Do:", response);
});

// client.CreateTodo({ title: "Learn Node", description: "Build a big project" }, (err, response) => {
//   if (err) {
//     console.error("Error creating To-Do:", err);
//     return;
//   }
//   console.log("Created To-Do:", response);
// });



// Fetch all To-Dos



client.GetTodos({}, (err, response) => {
  if (err) {
    console.error("Error fetching To-Dos:", err);
    return;
  }
  console.log("To-Do List:", response.todos);
});
