const request = require('supertest');
const app = require('./app'); // adjust the path if necessary

let token;
let createdTodoId;

describe('Todos API Tests', () => {
  // 1. Login with a valid account
  test('POST /users/login - should log in and return a token', async () => {
    const loginResponse = await request(app)
      .post('/users/login')
      .send({
        email: 'wolfie@example.com',     // Use valid credentials from your DB
        password: 'wolf'
      });
    
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.status).toBe('success');
    expect(loginResponse.body.data.result.token).toBeDefined();
    token = loginResponse.body.data.result.token;
  });

  // 2. Using token to get all the user's todos
  test('GET /todos - should get all todos for logged in user', async () => {
    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    // Expect the todos array (could be empty) to be present
    expect(Array.isArray(res.body.data.result)).toBe(true);
  });

  // 3. Using token to add a new Todo item
  test('POST /todos - should create a new Todo', async () => {
    // Adjust CategoryId and StatusId values to match your seeded data
    const newTodo = {
      name: 'Test Todo Item',
      description: 'This is a test todo item',
      CategoryId: 1,
      StatusId: 1
    };

    const res = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send(newTodo);

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.result.id).toBeDefined();
    createdTodoId = res.body.data.result.id;
  });

  // 4. Deleting the created Todo item (soft delete)
  test('DELETE /todos/:id - should soft delete the created Todo', async () => {
    const res = await request(app)
      .delete(`/todos/${createdTodoId}`)
      .set('Authorization', `Bearer ${token}`);
      
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    // For soft delete, your response should indicate it's been marked deleted.
    // Either the returned todo object or a message showing it is deleted.
    const result = res.body.data.result;
    // We assume the result is a string message or an object that indicates status.
    if (typeof result === 'string') {
      expect(result.toLowerCase()).toContain('deleted');
    } else {
      expect(result.StatusId).toBe(4); // Assuming status id 4 is "Deleted"
    }
  });

  // 5. Trying to get todos without sending JWT token
  test('GET /todos - should fail when no token is provided', async () => {
    const res = await request(app)
      .get('/todos');
      
    expect(res.status).toBe(401);
    // Given our middleware, the response should be a failure with appropriate JSend format
    expect(res.body.status).toBe('fail');
  });

  // 6. Trying to get todos with an invalid JWT token
  test('GET /todos - should fail when an invalid token is provided', async () => {
    const res = await request(app)
      .get('/todos')
      .set('Authorization', 'Bearer invalidtoken123');
      
    expect(res.status).toBe(401);
    expect(res.body.status).toBe('fail');
  });
});