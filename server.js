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

// In-memory database for todos
const todos = [];
let idCounter = 1;

// Implement the service methods
const todoService = {
  CreateTodo: (call, callback) => {
    const todo = {
      id: String(idCounter++),                      // post - increment
      title: call.request.title,
      description: call.request.description,
    };
    todos.push(todo);
    callback(null, todo);
  },

  GetTodos: (_, callback) => {
    callback(null, { todos });
  },
};

// Start the gRPC server
const server = new grpc.Server();
server.addService(todoProto.TodoService.service, todoService);

const PORT = "5000";
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err) => {
  if (err) {
    console.error("Server error:", err);
    return;
  }
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  server.start();
});
