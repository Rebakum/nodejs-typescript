import { readUsers, writeUsers } from "../helpers/fileDb";
import parseBody from "../helpers/parseBody";
import addRoutes from "../helpers/RouteHandler";
import sendJson from "../helpers/Send-json";

// get
addRoutes("GET", "/", (req, res) => {
  sendJson(res, 200, {
    message: "Hello from node js with typescrit...",
    path: req.url,
  });
});
addRoutes("GET", "/api", (req, res) => {
  sendJson(res, 200, {
    message: " Health status is good...",
    path: req.url,
  });
});
//post

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);
  //user json read
  const users = readUsers();
  const newUser = {
    ...body,
  };
  users?.push(newUser);
  writeUsers(users);
  sendJson(res, 201, { success: true, data: body });
});
// put

addRoutes("PUT", "/api/users/:id", async (req, res) => {
  const { id } = (req as any).params;
  const body = await parseBody(req);

  const users = readUsers();
  const index = users.findIndex((user: any) => user.id == id);
  if (index === -1)
    sendJson(res, 404, {
      success: false,
      message: "user not found",
    });

  users[index] = {
    ...users[index],
    ...body,
  };

  writeUsers(users);
  sendJson(res, 202, {
    success: true,
    message: `id ${id} user updated `,
    data: users[index],
  });
});

// delete

addRoutes("DELETE", "/api/users/:id", (req: any, res) => {
  const { id } = req.params;

  const users = readUsers();

  const index = users.findIndex((user: any) => user.id == id);

  if (index === -1) {
    return sendJson(res, 404, {
      success: false,
      message: "User not found",
    });
  }

  const deletedUser = users.splice(index, 1); // DELETE user

  writeUsers(users);

  return sendJson(res, 200, {
    success: true,
    message: `User ${id} deleted successfully`,
    deleted: deletedUser[0],
  });
});

// addRoutes("POST", "/api/products", async (req, res) => {
//   const body = await parseBody(req);
//   sendJson(res, 201, { success: true, data: body });
// });
